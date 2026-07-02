const { unified } = require('unified');
const remarkParse = require('remark-parse').default || require('remark-parse');
const remarkGfm = require('remark-gfm').default || require('remark-gfm');
const remarkRehype = require('remark-rehype').default || require('remark-rehype');
const rehypeRaw = require('rehype-raw').default || require('rehype-raw');
const rehypeStringify = require('rehype-stringify').default || require('rehype-stringify');
const { visit } = require('unist-util-visit');

// ---- remark plugin: add data-source-line from AST position ----
function remarkSourceLine() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.position && node.position.start && node.data === undefined) {
        node.data = {};
      }
      if (node.position && node.position.start) {
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties['data-source-line'] = String(node.position.start.line);
      }
    });
  };
}

// ---- pre-processing ----

function countBacktickPrefix(s) {
  let count = 0;
  for (const c of s) {
    if (c === '`') count++;
    else break;
  }
  return count;
}

// Guard math blocks: $$...$$ → <!--MATHBLOCK_N--> and $...$ → <!--MATHBLOCK_N-->
function guardMathBlocks(content) {
  const placeholders = [];
  let result = '';
  let i = 0;
  const len = content.length;
  let inBacktick = false;
  let inDoubleBacktick = false;
  let inCodeBlock = false;
  let codeFenceCount = 0;
  let inCodeTag = false;

  while (i < len) {
    // Track fenced code blocks (3+ backticks)
    if (content[i] === '`') {
      let btCount = 1;
      while (i + btCount < len && content[i + btCount] === '`') btCount++;
      if (btCount >= 3) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeFenceCount = btCount;
          result += content.substring(i, i + btCount);
          i += btCount;
          continue;
        } else if (btCount >= codeFenceCount) {
          inCodeBlock = false;
          result += content.substring(i, i + btCount);
          i += btCount;
          continue;
        }
      }
    }

    // Inside fenced code block: skip all processing (including double-backtick)
    if (inCodeBlock) {
      result += content[i];
      i++;
      continue;
    }

    // Double backtick code span: ``...`` — toggle as a unit, not per-backtick
    if (content[i] === '`' && content[i + 1] === '`' && (i + 2 >= len || content[i + 2] !== '`')) {
      inDoubleBacktick = !inDoubleBacktick;
      result += '``';
      i += 2;
      continue;
    }

    // Track <code> and </code> tags
    const inAnyCode = inBacktick || inDoubleBacktick;
    if (!inAnyCode) {
      if (content.substring(i, i + 6) === '<code>') {
        inCodeTag = true;
        result += '<code>';
        i += 6;
        continue;
      }
      if (content.substring(i, i + 7) === '</code>') {
        inCodeTag = false;
        result += '</code>';
        i += 7;
        continue;
      }
    }

    if (inCodeTag) {
      result += content[i];
      i++;
      continue;
    }

    // Inside double-backtick span: single backticks are content, not toggles
    if (inDoubleBacktick) {
      result += content[i];
      i++;
      continue;
    }

    // Track inline backticks (single `)
    if (content[i] === '`') {
      inBacktick = !inBacktick;
      result += content[i];
      i++;
      continue;
    }

    if (content[i] === '$' && i + 1 < len && content[i + 1] === '$') {
      // Display math: $$...$$ — 用行首检测，不依赖脆弱的反引号状态机
      const atLineStart = i === 0 || content[i - 1] === '\n' || content[i - 1] === '\r';
      if (!atLineStart) {
        result += content[i];
        i++;
        continue;
      }
      const start = i;
      // 计算起始行号（\n 数量 + 1）
      const lineNum = content.substring(0, start).split('\n').length;
      i += 2;
      let foundEnd = false;
      while (i + 1 < len) {
        if (content[i] === '$' && content[i + 1] === '$') {
          i += 2;
          const mathBlock = content.substring(start, i);
          const idx = placeholders.length;
          placeholders.push({ text: mathBlock, line: lineNum, display: true });
          // 用块级 div 作为占位符，避免被 unified 包裹进 <p>
          // 保留原始行数：占位符后补上数学块内的换行符
          const mathContent = content.substring(start, i);
          const newlineCount = (mathContent.match(/\n/g) || []).length;
          result += '<div class="math-placeholder" data-math-idx="' + idx + '" data-source-line="' + lineNum + '"></div>';
          for (let n = 0; n < newlineCount; n++) { result += '\n'; }
          foundEnd = true;
          break;
        }
        i++;
      }
      if (!foundEnd) {
        result += content.substring(start, i);
      }
    } else if (!inBacktick && content[i] === '$' && i + 1 < len && content[i + 1] !== ' ' && content[i + 1] !== '\n' && content[i + 1] !== '$') {
      // Inline math: $...$
      const start = i;
      i += 1;
      let foundEnd = false;
      while (i < len) {
        if (content[i] === '$' && (i === start + 1 || content[i - 1] !== ' ')) {
          i += 1;
          const mathBlock = content.substring(start, i);
          const idx = placeholders.length;
          placeholders.push({ text: mathBlock, display: false });
          result += '<!--MATHBLOCK_' + idx + '-->';
          foundEnd = true;
          break;
        }
        i++;
      }
      if (!foundEnd) {
        result += content.substring(start, i);
      }
    } else {
      result += content[i];
      i++;
    }
  }
  return { content: result, placeholders };
}

// Convert > [!TYPE] alerts to placeholders, let unified handle markdown inside
function getAlertType(line) {
  const lower = line.toLowerCase();
  if (lower.startsWith('> [!info]') || lower.startsWith('> [!note]')) return 'note';
  if (lower.startsWith('> [!tip]')) return 'tip';
  if (lower.startsWith('> [!important]')) return 'important';
  if (lower.startsWith('> [!warning]')) return 'warning';
  if (lower.startsWith('> [!caution]')) return 'caution';
  return null;
}

function getAlertTitleHTML(type) {
  const icons = {
    note: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="7" x2="8" y2="11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>',
    tip: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 1.8 1 3 2.2 3.8.3.2.3.5.3.8v1.4h4v-1.4c0-.3.1-.6.3-.8 1.2-.8 2.2-2 2.2-3.8 0-2.5-2-4.5-4.5-4.5z" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="6" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    important: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6.5" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>',
    warning: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>',
    caution: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10.5" r="0.8" fill="currentColor"/></svg>'
  };
  const titles = { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' };
  return '<div class="alert-title">' + (icons[type] || '') + (titles[type] || type) + '</div>';
}

function convertAlerts(content) {
  const lines = content.split('\n');
  const result = [];
  const alertBlocks = [];
  let i = 0;
  let inCodeBlock = false;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      i++;
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      i++;
      continue;
    }
    const alertType = getAlertType(line);
    if (alertType) {
      const contentLines = [];
      i++;
      while (i < lines.length && lines[i].startsWith('>')) {
        let stripped = lines[i];
        if (stripped.startsWith('> ')) stripped = stripped.substring(2);
        else if (stripped.startsWith('>')) stripped = stripped.substring(1);
        contentLines.push(stripped);
        i++;
      }
      const idx = alertBlocks.length;
      alertBlocks.push({ type: alertType, content: contentLines.join('\n') });
      // 将 END 标记附着到最后一行内容末尾，避免增加额外行
      if (contentLines.length > 0) {
        contentLines[contentLines.length - 1] += '<!--ALERTBLOCK_' + idx + '_END-->';
      }
      result.push('<!--ALERTBLOCK_' + idx + '-->');
      result.push(contentLines.join('\n'));
    } else {
      result.push(line);
      i++;
    }
  }
  return { content: result.join('\n'), alertBlocks };
}

function restoreAlerts(html, alertBlocks) {
  if (alertBlocks.length === 0) return html;
  let result = html;
  for (let idx = alertBlocks.length - 1; idx >= 0; idx--) {
    const block = alertBlocks[idx];
    const startMarker = '<!--ALERTBLOCK_' + idx + '-->';
    const endMarker = '<!--ALERTBLOCK_' + idx + '_END-->';
    const startPos = result.indexOf(startMarker);
    const endPos = result.indexOf(endMarker);
    if (startPos !== -1 && endPos !== -1) {
      const before = result.substring(0, startPos);
      const inner = result.substring(startPos + startMarker.length, endPos);
      const after = result.substring(endPos + endMarker.length);
      const titleHTML = getAlertTitleHTML(block.type);
      result = before + '<div class="alert alert-' + block.type + '">' + titleHTML + '<div class="alert-content">' + inner + '</div></div>' + after;
    }
  }
  return result;
}

// Convert definition lists
// 为 <dl>/<dt>/<dd> 添加 data-source-line，确保滚动同步能映射到这些元素
function convertDefLists(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    // Check if next line starts with ": " (definition)
    if (i + 1 < lines.length) {
      const next = lines[i + 1];
      if ((next.startsWith(': ') || next === ':') &&
          trimmed !== '' &&
          !trimmed.startsWith('#') &&
          !trimmed.startsWith('-') &&
          !trimmed.startsWith('*') &&
          !trimmed.startsWith('>') &&
          !trimmed.startsWith('|') &&
          !trimmed.startsWith('`') &&
          !trimmed.startsWith('[') &&
          !trimmed.startsWith('<') &&
          !trimmed.startsWith('!')) {
        const dlLine = i + 1;
        const firstIdx = result.length; // 第一个 dt/dd 在 result 中的索引
        while (i < lines.length && !lines[i].trim().startsWith('#') && !lines[i].trim().startsWith('>') &&
               lines[i].trim() !== '' && !lines[i].trim().startsWith('|') &&
               !lines[i].trim().startsWith('`')) {
          const termLine = i + 1;
          const term = lines[i];
          result.push('<dt data-source-line="' + termLine + '">' + term + '</dt>');
          i++;
          while (i < lines.length && (lines[i].startsWith(': ') || lines[i] === ':')) {
            const defLine = i + 1;
            let def = lines[i];
            if (def.startsWith(': ')) def = def.substring(2);
            else if (def === ':') def = '';
            result.push('<dd data-source-line="' + defLine + '">' + def + '</dd>');
            i++;
          }
        }
        // 将 <dl> 前置到第一个 dt/dd，将 </dl> 后置到最后一行，避免增加额外行
        if (result.length > firstIdx) {
          result[firstIdx] = '<dl data-source-line="' + dlLine + '">' + result[firstIdx];
          result[result.length - 1] += '</dl>';
        }
        continue;
      }
    }
    result.push(line);
    i++;
  }
  return result.join('\n');
}

// Extract abbreviations and hide from output
function extractAbbreviations(content) {
  const abbrs = [];
  const lines = content.split('\n');
  const result = [];
  for (const line of lines) {
    if (line.startsWith('*[')) {
      const bracketEnd = line.indexOf(']: ');
      if (bracketEnd !== -1) {
        const term = line.substring(2, bracketEnd);
        const def = line.substring(bracketEnd + 3);
        if (term.trim() !== '') {
          abbrs.push([term, def]);
        }
        result.push(''); // hide abbreviation definition
        continue;
      }
    }
    result.push(line);
  }
  return { content: result.join('\n'), abbreviations: abbrs };
}

// ---- post-processing ----

function escapeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

function restoreMathBlocks(html, placeholders) {
  let result = html;
  for (let idx = 0; idx < placeholders.length; idx++) {
    const ph = placeholders[idx];
    const text = typeof ph === 'string' ? ph : ph.text;
    const escaped = escapeHTML(text);
    if (ph.display) {
      // 显示数学：占位符是 <div class="math-placeholder" data-math-idx="N" ...>，替换为带 data-source-line 的 span
      const marker = '<div class="math-placeholder" data-math-idx="' + idx + '" data-source-line="' + ph.line + '"></div>';
      const wrapped = '<span class="math-display" data-source-line="' + ph.line + '">' + escaped + '</span>';
      result = result.split(marker).join(wrapped);
    } else {
      // 行内数学：占位符是 <!--MATHBLOCK_N-->，直接恢复
      const marker = '<!--MATHBLOCK_' + idx + '-->';
      result = result.split(marker).join(escaped);
    }
  }
  return result;
}

function sanitizeHTML(html) {
  const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'textarea', 'select', 'button', 'link', 'meta', 'base'];
  let result = '';
  let i = 0;
  const len = html.length;

  while (i < len) {
    if (html[i] === '<' && i + 1 < len) {
      if (html[i + 1] === '/') {
        // Closing tag
        let end = html.indexOf('>', i);
        if (end === -1) { result += html[i]; i++; continue; }
        let inner = html.substring(i + 2, end);
        let tagName = inner.split(/\s/)[0].toLowerCase();
        if (dangerousTags.includes(tagName)) {
          i = end + 1;
          continue;
        }
        result += html.substring(i, end + 1);
        i = end + 1;
      } else if (html[i + 1] === '!') {
        // Comment or DOCTYPE
        if (html.substring(i, i + 4) === '<!--' && html.indexOf('-->', i) !== -1) {
          let end = html.indexOf('-->', i) + 3;
          result += html.substring(i, end);
          i = end;
        } else {
          let end = html.indexOf('>', i);
          if (end === -1) { result += html[i]; i++; continue; }
          result += html.substring(i, end + 1);
          i = end + 1;
        }
      } else {
        // Opening or self-closing tag
        let end = html.indexOf('>', i);
        if (end === -1) { result += html[i]; i++; continue; }
        let inner = html.substring(i + 1, end);
        let tagName = inner.split(/\s/)[0].toLowerCase();
        if (dangerousTags.includes(tagName)) {
          i = end + 1;
          continue;
        }
        // Sanitize attributes
        let sanitizedTag = sanitizeTagAttributes(tagName, inner);
        result += '<' + sanitizedTag + '>';
        i = end + 1;
      }
    } else {
      result += html[i];
      i++;
    }
  }
  return result;
}

function sanitizeTagAttributes(tagName, inner) {
  // Remove dangerous event handlers and javascript: URLs
  let attrs = inner.substring(tagName.length);
  let cleaned = '';
  let j = 0;
  while (j < attrs.length) {
    // Skip whitespace
    while (j < attrs.length && /\s/.test(attrs[j])) { cleaned += attrs[j]; j++; }
    if (j >= attrs.length) break;

    // Read attribute name
    let nameStart = j;
    while (j < attrs.length && attrs[j] !== '=' && !/\s/.test(attrs[j])) j++;
    let attrName = attrs.substring(nameStart, j).toLowerCase();

    if (j < attrs.length && attrs[j] === '=') {
      j++; // skip =
      let valueStart = j;
      if (j < attrs.length && (attrs[j] === '"' || attrs[j] === "'")) {
        let quote = attrs[j]; j++;
        while (j < attrs.length && attrs[j] !== quote) j++;
        j++; // skip closing quote
      } else {
        while (j < attrs.length && !/\s/.test(attrs[j])) j++;
      }
      let raw = attrs.substring(nameStart, j);
      if (attrName.startsWith('on') || /javascript:/i.test(raw)) {
        continue; // skip dangerous attribute
      }
      cleaned += raw;
    } else {
      let raw = attrs.substring(nameStart, j);
      if (attrName.startsWith('on') || /javascript:/i.test(raw)) {
        continue;
      }
      cleaned += raw;
    }
  }
  return tagName + cleaned;
}

function embedAbbrData(html, abbreviations) {
  if (abbreviations.length === 0) return html;
  const json = JSON.stringify(abbreviations).replace(/'/g, '&#x27;');
  return html + '<div id="abbr-data" style="display:none" data-abbrs=\'' + json + '\'></div>';
}

function convertHighlights(html) {
  let result = '';
  let i = 0;
  const len = html.length;
  const skipTags = ['code', 'pre', 'katex', 'mermaid', 'script', 'style', 'textarea'];
  const skipStack = [];

  while (i < len) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      if (end === -1) { result += html[i]; i++; continue; }
      const inner = html.substring(i + 1, end);
      const tagName = inner.split(/\s/)[0].toLowerCase();

      if (tagName[0] === '/') {
        const closingTag = tagName.substring(1);
        if (skipStack[skipStack.length - 1] === closingTag) skipStack.pop();
      } else if (skipTags.includes(tagName)) {
        skipStack.push(tagName);
      }

      result += html.substring(i, end + 1);
      i = end + 1;
    } else if (skipStack.length === 0 && html[i] === '=' && html[i + 1] === '=' && (i === 0 || html[i - 1] !== '=')) {
      const end = html.indexOf('==', i + 2);
      if (end !== -1 && html[end + 2] !== '=') {
        const text = html.substring(i + 2, end);
        if (text.length > 0 && !/[\n\r]/.test(text)) {
          result += '<mark>' + text + '</mark>';
          i = end + 2;
          continue;
        }
      }
      result += html[i];
      i++;
    } else {
      result += html[i];
      i++;
    }
  }
  return result;
}

// ---- main pipeline ----

function renderMarkdown(content) {
  // 0. 统一换行符为 LF，避免 CRLF 的 \r 污染后续行数统计
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 1. Extract abbreviations
  const abbrResult = extractAbbreviations(content);
  const abbreviations = abbrResult.abbreviations;

  // 2. Guard math blocks
  const mathResult = guardMathBlocks(abbrResult.content);
  const placeholders = mathResult.placeholders;

  // 3. Convert alerts to placeholders
  const alertResult = convertAlerts(mathResult.content);
  const alertBlocks = alertResult.alertBlocks;

  // 4. Convert definition lists
  let processed = convertDefLists(alertResult.content);

  // 5. Unified pipeline
  let html;
  try {
    html = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkSourceLine)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .processSync(processed)
      .toString();
  } catch (e) {
    // Fallback: return raw content wrapped in <pre>
    console.error('Unified rendering error:', e);
    return '<pre>' + escapeHTML(content) + '</pre>';
  }

  // 6. Restore math blocks
  html = restoreMathBlocks(html, placeholders);

  // 7. Restore alert blocks
  html = restoreAlerts(html, alertBlocks);

  // 8. Sanitize
  html = sanitizeHTML(html);

  // 8.5. Convert ==highlight== to <mark>
  html = convertHighlights(html);

  // 9. Embed abbreviation data
  html = embedAbbrData(html, abbreviations);

  return html;
}

// Export for Node.js bundling; also expose as global for browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderMarkdown };
}
return { renderMarkdown };
