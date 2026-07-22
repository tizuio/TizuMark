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
      // Display math: $$...$$ — 仅在行首（块级上下文）触发；行内 $$ 一律当字面量，避免跨段配对
      const atLineStart = i === 0 || content[i - 1] === '\n' || content[i - 1] === '\r';
      if (!atLineStart) {
        result += '$$';
        i += 2;
        continue;
      }
      const start = i;
      const lineNum = content.substring(0, start).split('\n').length;
      i += 2;
      let foundEnd = false;
      while (i + 1 < len) {
        if (content[i] === '$' && content[i + 1] === '$') {
          i += 2;
          const mathBlock = content.substring(start, i);
          const idx = placeholders.length;
          placeholders.push({ text: mathBlock, line: lineNum, display: true });
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
        result += '$$';
        i = start + 2;
      }
    } else if (!inBacktick && content[i] === '$' && i + 1 < len && content[i + 1] !== ' ' && content[i + 1] !== '\n' && content[i + 1] !== '\r' && content[i + 1] !== '$') {
      // Inline math: $...$ — 必须成对且中间不得跨越换行/表格列/块引用，否则当字面量
      const start = i;
      i += 1;
      let foundEnd = false;
      while (i < len) {
        if (content[i] === '$' && (i === start + 1 || content[i - 1] !== ' ')) {
          const inner = content.substring(start + 1, i);
          // 不成对/跨边界（换行、表格列分隔、块引用）一律不当公式
          if (!/[\n\r|>\uFF5C]/.test(inner)) {
            i += 1;
            const mathBlock = content.substring(start, i);
            const idx = placeholders.length;
            placeholders.push({ text: mathBlock, display: false });
            result += '<!--MATHBLOCK_' + idx + '-->';
            foundEnd = true;
            break;
          }
        }
        i++;
      }
      if (!foundEnd) {
        result += '$';
        i = start + 1;
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

// Convert container-embedded GFM tables (lazy continuation)
// e.g., > text\n| a | b |\n| - | - |\n| 1 | 2 |
// Converts to HTML <table> before unified pipeline so remark doesn't miss them
function convertContainerTables(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  let inCodeBlock = false;

  while (i < lines.length) {
    const line = lines[i];

    if (/^ {0,3}(```|~~~)/.test(line)) {
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

    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const prevIdx = prevNonBlankLine(lines, i - 1);
      if (prevIdx !== -1 && prevIdx === i - 1 && isContainerLine(lines[prevIdx])) {
        const tableLines = [line, lines[i + 1]];
        let j = i + 2;
        while (j < lines.length && isTableRow(lines[j])) {
          tableLines.push(lines[j]);
          j++;
        }
        const tableHtml = gfmTableToHtml(tableLines);
        const prefix = lines[prevIdx].trimStart().startsWith('>') ? '> ' : '  ';
        const prefixedHtml = tableHtml.split('\n').map(l => l === '' ? l : prefix + l).join('\n');
        result.push(prefixedHtml);
        i = j;
        continue;
      }
    }

    result.push(line);
    i++;
  }

  return result.join('\n');
}

function isContainerLine(line) {
  const t = line.trimStart();
  return /^>/.test(t) || /^[-*+]\s/.test(t) || /^\d+[.)]\s/.test(t);
}

function isTableRow(line) {
  return /^\|.+\|$/.test(line.trim());
}

function isTableSep(line) {
  const t = line.trim();
  return /^\|[-:| ]+\|$/.test(t) && /---/.test(t);
}

function prevNonBlankLine(lines, startIdx) {
  for (let i = startIdx; i >= 0; i--) {
    if (lines[i].trim() !== '') return i;
  }
  return -1;
}

function gfmTableToHtml(tableLines) {
  const allLines = tableLines.map(l => l.trim());
  const headerLine = allLines[0];
  const sepLine = allLines[1];
  const dataLines = allLines.slice(2).filter(l => l !== '');

  const headerCells = headerLine.split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
  const colCount = headerCells.length;

  const sepCells = sepLine.split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
  const aligns = sepCells.map(cell => {
    const t = cell.trim();
    if (t.startsWith(':') && t.endsWith(':')) return 'center';
    if (t.endsWith(':')) return 'right';
    if (t.startsWith(':')) return 'left';
    return null;
  });

  let html = '<table>\n<thead>\n<tr>\n';
  for (let ci = 0; ci < colCount; ci++) {
    const align = aligns[ci] || null;
    html += '<th' + (align ? ' style="text-align:' + align + '"' : '') + '>' + renderCellContent(headerCells[ci].trim()) + '</th>\n';
  }
  html += '</tr>\n</thead>\n';

  if (dataLines.length > 0) {
    html += '<tbody>\n';
    for (const row of dataLines) {
      const cells = row.split('|').filter((c, i, a) => i > 0 && i < a.length - 1);
      html += '<tr>\n';
      for (let ci = 0; ci < colCount; ci++) {
        const cell = ci < cells.length ? cells[ci].trim() : '';
        html += '<td>' + renderCellContent(cell) + '</td>\n';
      }
      html += '</tr>\n';
    }
    html += '</tbody>\n';
  }

  html += '</table>';
  return html;
}

function renderCellContent(text) {
  let result = escapeHTML(text);

  const codeSpans = [];
  result = result.replace(/`(.+?)`/g, (m, code) => {
    const idx = codeSpans.length;
    codeSpans.push(code);
    return '%%CODE' + idx + '%%';
  });

  result = result
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  result = result.replace(/%%CODE(\d+)%%/g, (m, idx) => {
    return '<code>' + codeSpans[parseInt(idx)] + '</code>';
  });

  return result;
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
      if (attrName.startsWith('on') || /javascript:/i.test(raw) || attrName === 'style') {
        continue; // skip dangerous attribute (含 style：预览禁用内联样式，避免 CSS 破坏布局/隐藏内容)
      }
      cleaned += raw;
    } else {
      let raw = attrs.substring(nameStart, j);
      if (attrName.startsWith('on') || /javascript:/i.test(raw) || attrName === 'style') {
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
            result += '==';
            i += 2;
          } else {
            result += html[i];
            i++;
          }
        }
        return result;
      }

// ---- remark plugin: convert soft breaks & hard breaks to <br> ----
// When softBreaks is enabled, both single newlines (softbreak) and
// "two spaces + newline" (break) render as <br>, matching the user's
// writing habit (回车即换行).
// Note: remark keeps single newlines INSIDE text nodes rather than as
// separate softbreak nodes, so we split text nodes on "\n" and insert
// <br> between the fragments. Inline code / fenced code are untouched
// because their content lives in `.value`, not in `.children`.
function remarkSoftBreaks() {
  return (tree) => {
    const toBr = () => ({ type: 'html', value: '<br>' });

    const walk = (node) => {
      if (!node.children) return;
      const out = [];
      for (const child of node.children) {
        if (child.type === 'break' || child.type === 'softbreak') {
          out.push(toBr());
          continue;
        }
        if (child.type === 'text' && child.value.indexOf('\n') !== -1) {
          const parts = child.value.split('\n');
          for (let i = 0; i < parts.length; i++) {
            if (parts[i] !== '') out.push({ type: 'text', value: parts[i] });
            if (i < parts.length - 1) out.push(toBr());
          }
          continue;
        }
        walk(child);
        out.push(child);
      }
      node.children = out;
    };

    walk(tree);
  };
}

// ---- main pipeline ----

// --- Footnote extraction (pre-processing) ---
// Extracts [^id]: definition lines, supports multi-paragraph definitions
// (continuation lines indented by at least 2 spaces or a tab).
function extractFootnotes(content) {
  const lines = content.split('\n');
  const cleaned = [];
  const definitions = [];
  let inCodeBlock = false;
  let codeFence = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track fenced code blocks
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeFence = trimmed.substring(0, 3);
      } else if (trimmed.startsWith(codeFence)) {
        inCodeBlock = false;
      }
      cleaned.push(line);
      continue;
    }

    if (inCodeBlock) {
      cleaned.push(line);
      continue;
    }

    // Check for footnote definition: [^id]: text
    const defMatch = line.match(/^\[\^([^\]]+)\]\s*:\s*(.*)/);
    if (defMatch) {
      const id = defMatch[1];
      let defBody = defMatch[2];

      // Collect continuation lines (indented by 2+ spaces or tab)
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j];
        if (next === '' || next.startsWith('  ') || next.startsWith('\t')) {
          if (next === '') {
            defBody += '\n';
          } else {
            defBody += '\n' + next.replace(/^\s{2}|\t/, '');
          }
          j++;
        } else {
          break;
        }
      }

      definitions.push({ id, definition: defBody.trim(), line: i + 1 });
      // Replace definition lines with empty lines to preserve line numbering
      for (let k = i; k < j; k++) cleaned.push('');
      i = j - 1;
      continue;
    }

    cleaned.push(line);
  }

  return { content: cleaned.join('\n'), definitions };
}

// --- Footnote rendering (post-processing) ---
// Replaces [^id] references with superscript links and appends footnote section.
function renderFootnotes(html, definitions) {
  if (definitions.length === 0) return html;

  // Build ID map with collision avoidance
  const usedIds = new Map(); // id → count
  const fnIds = []; // [{ id, elementId }]

  for (const def of definitions) {
    let baseId = def.id.toLowerCase().replace(/[\s"'<>&#]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
    if (!baseId) baseId = 'fn';
    const count = usedIds.get(baseId) || 0;
    const elementId = count === 0 ? baseId : baseId + '-' + count;
    usedIds.set(baseId, count + 1);
    fnIds.push({ id: def.id, displayId: def.id, elementId, definition: def.definition });
  }

  // Replace [^id] references with linked superscripts
  // Guard: skip inside <code>, <pre>, <a>, <katex> tags
  let result = '';
  let i = 0;
  const skipTags = ['code', 'pre', 'a', 'katex'];
  const skipStack = [];

  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      if (end === -1) { result += html[i]; i++; continue; }
      const inner = html.substring(i + 1, end);
      const tagName = inner.split(/\s/)[0].toLowerCase();

      if (tagName.startsWith('/')) {
        const closing = tagName.substring(1);
        const idx = skipStack.lastIndexOf(closing);
        if (idx !== -1) skipStack.splice(idx, 1);
      } else if (skipTags.includes(tagName)) {
        skipStack.push(tagName);
      }

      result += html.substring(i, end + 1);
      i = end + 1;
    } else if (skipStack.length === 0) {
      // Look for [^id]
      const refMatch = html.substring(i).match(/\[\^([^\]]+)\]/);
      if (refMatch && refMatch.index === 0) {
        const refId = refMatch[1];
        const fn = fnIds.find(f => f.id === refId);
        if (fn) {
          result += '<sup class="footnote-ref" id="fnref-' + fn.elementId + '">';
          result += '<a href="#fn-' + fn.elementId + '">[' + fn.displayId + ']</a>';
          result += '</sup>';
        } else {
          // Undefined reference: keep as plain text
          result += '[^' + refId + ']';
        }
        i += refMatch[0].length;
      } else {
        result += html[i];
        i++;
      }
    } else {
      result += html[i];
      i++;
    }
  }

  // Build footnote section
  let section = '\n<hr class="footnotes-sep">\n<section class="footnotes">\n<ol>\n';
  for (const fn of fnIds) {
    section += '<li id="fn-' + fn.elementId + '" class="footnote-definition">\n';
    section += '<p>' + fn.definition;
    section += ' <a href="#fnref-' + fn.elementId + '" class="footnote-backref" title="返回文中">↩</a>';
    section += '</p>\n</li>\n';
  }
  section += '</ol>\n</section>';

  return result + section;
}

function renderMarkdown(content, options) {
  const opts = options || {};
  const softBreaks = opts.softBreaks === true;

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

  // 4.5. Convert container-embedded tables (lazy continuation)
  processed = convertContainerTables(processed);

  // 4.6. Extract footnotes (before unified pipeline to avoid parsing issues)
  const footnoteResult = extractFootnotes(processed);
  processed = footnoteResult.content;
  const footnoteDefs = footnoteResult.definitions;

  // 5. Unified pipeline
  let html;
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm, { singleTilde: false })
      .use(remarkSourceLine);
    if (softBreaks) {
      processor.use(remarkSoftBreaks);
    }
    processor
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify, { allowDangerousHtml: true });
    html = processor.processSync(processed).toString();
  } catch (e) {
    // Fallback: return raw content wrapped in <pre>
    console.error('Unified rendering error:', e);
    return '<pre>' + escapeHTML(content) + '</pre>';
  }

  // 7. Restore math blocks
  html = restoreMathBlocks(html, placeholders);

  // 8. Restore alert blocks
  html = restoreAlerts(html, alertBlocks);

  // 9. Sanitize
  html = sanitizeHTML(html);

  // 10. Convert ==highlight== to <mark>
  html = convertHighlights(html);

  // 11. Render footnotes (references + definition section)
  html = renderFootnotes(html, footnoteDefs);

  // 12. Embed abbreviation data
  html = embedAbbrData(html, abbreviations);

  return html;
}

// Export for Node.js bundling; also expose as global for browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderMarkdown };
}
return { renderMarkdown };
