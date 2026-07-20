// 预览后处理聚合：emoji 短码、数学(KaTeX)、缩写(abbr)、标题锚点、Mermaid、复制按钮。
// 从 app.js 的 renderPreview 中抽取，独立后可单独测试、降低改动爆炸半径。
//
// 设计：每个函数接收 (preview, opts)，依赖通过 opts 注入，不隐式读取全局 this：
//   - preview: 预览容器元素
//   - opts.t: i18n 函数（复制按钮文案）
//   - opts.isDark: 是否深色主题（Mermaid 主题）
//   - opts.escapeHtml / escapeAttr / headingToId: 纯函数（由 app.js 传入，保持既有一致行为）
// 全局依赖：document / navigator / getComputedStyle / mermaid / renderMathInElement（浏览器环境提供）。

const EMOJI_MAP = {
  ':smile:': '😄', ':joy:': '😂', ':heart:': '❤️', ':thumbsup:': '👍',
  ':thumbsdown:': '👎', ':clap:': '👏', ':wave:': '👋', ':fire:': '🔥',
  ':star:': '⭐', ':check:': '✅', ':x:': '❌', ':warning:': '⚠️',
  ':memo:': '📝', ':bulb:': '💡', ':info:': 'ℹ️', ':question:': '❓',
  ':exclamation:': '❗', ':ok:': '👌', ':cool:': '😎', ':sad:': '😢',
  ':angry:': '😠', ':love:': '😍', ':laughing:': '😆', ':wink:': '😉',
  ':thinking:': '🤔', ':rocket:': '🚀', ':100:': '💯', ':tada:': '🎉',
  ':trophy:': '🏆', ':eyes:': '👀', ':pray:': '🙏', ':muscle:': '💪',
  ':sparkles:': '✨', ':zap:': '⚡', ':sunny:': '☀️', ':cloud:': '☁️',
  ':rain:': '🌧️', ':snow:': '🌨️', ':coffee:': '☕', ':book:': '📖',
  ':pencil:': '✏️', ':computer:': '💻', ':phone:': '📱', ':email:': '📧',
  ':calendar:': '📅', ':clock:': '⏰', ':gift:': '🎁', ':balloon:': '🎈',
  ':party:': '🎉', ':crown:': '👑', ':gem:': '💎', ':key:': '🔑',
  ':lock:': '🔒', ':bell:': '🔔', ':mag:': '🔍', ':package:': '📦',
  ':earth:': '🌍', ':moon:': '🌙', ':rainbow:': '🌈', ':umbrella:': '☂️',
  ':cyclone:': '🌀', ':ocean:': '🌊', ':seedling:': '🌱', ':tree:': '🌳',
  ':flower:': '🌼', ':rose:': '🌹', ':dog:': '🐕', ':cat:': '🐈',
  ':bear:': '🐻', ':bird:': '🐦', ':fish:': '🐟', ':turtle:': '🐢',
  ':octopus:': '🐙', ':penguin:': '🐧', ':butterfly:': '🦋', ':bee:': '🐝',
  ':art:': '🎨', ':music:': '🎵', ':film:': '🎬', ':camera:': '📷',
  ':unlock:': '🔓', ':link:': '🔗', ':scissors:': '✂️', ':pushpin:': '📌'
};

function processEmojiShortcodes(preview) {
  const emojiMap = EMOJI_MAP;
  const skipTags = ['CODE', 'PRE', 'ABBR', 'SCRIPT', 'STYLE', 'TEXTAREA', 'A'];
  const walker = document.createTreeWalker(
    preview,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        let p = node.parentElement;
        while (p) {
          if (skipTags.includes(p.tagName)) return NodeFilter.FILTER_REJECT;
          if (p.classList && p.classList.contains('katex')) return NodeFilter.FILTER_REJECT;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) textNodes.push(node);

  textNodes.forEach(textNode => {
    const text = textNode.textContent;
    if (!text.includes(':')) return;
    let newText = text;
    for (const [code, emoji] of Object.entries(emojiMap)) {
      if (newText.includes(code)) newText = newText.split(code).join(emoji);
    }
    if (newText !== text) textNode.textContent = newText;
  });
}

// 将文本中"不成对"的 $ / $$ 包进 <span class="katex-ignore">，让 KaTeX 跳过后处理、
// 原样显示 $，同时避免 KaTeX 把孤 $ 跨段配对吞掉内容。
// 规则：成对 $...$ / $$...$$ 保持原样（交给 KaTeX 渲染）；不成对的 $ 包忽略 span。
function isLineBoundary(ch) {
  return ch === undefined || ch === '\n' || ch === '\r' || ch === ' ' || ch === '\t';
}

function protectUnpairedDollar(text) {
  let out = '';
  let i = 0;
  const n = text.length;
  while (i < n) {
    if (text[i] === '$' && i + 1 < n && text[i + 1] === '$') {
      // 仅当 $$ 处于"块级"边界（前后为行首/行尾/空白）时才视为显示公式 $$...$$
      const openOk = isLineBoundary(text[i - 1]);
      const close = text.indexOf('$$', i + 2);
      const closeOk = close !== -1 &&
        (close + 2 === n || isLineBoundary(text[close + 2])) &&
        (text[close - 1] !== '$') &&
        !/[\n\r|>\uFF5C]/.test(text.substring(i + 2, close));
      if (openOk && closeOk) {
        out += text.substring(i, close + 2);
        i = close + 2;
        continue;
      }
      // 不成对的 $$：包忽略 span（两个独立 $）
      out += '<span class="katex-ignore">$$</span>';
      i += 2;
    } else if (text[i] === '$') {
      if (i + 1 < n && text[i + 1] !== ' ' && text[i + 1] !== '\n' && text[i + 1] !== '\r') {
        const close = text.indexOf('$', i + 1);
        if (close !== -1 &&
            text[close - 1] !== ' ' && text[close - 1] !== '\n' && text[close - 1] !== '\r' &&
            !/[\n\r|>\uFF5C]/.test(text.substring(i + 1, close)) &&
            (close + 1 >= n || text[close + 1] !== '$')) {
          out += text.substring(i, close + 1);
          i = close + 1;
          continue;
        }
      }
      out += '<span class="katex-ignore">$</span>';
      i += 1;
    } else {
      out += text[i];
      i += 1;
    }
  }
  return out;
}
function processMath(preview) {
  if (typeof renderMathInElement === 'undefined') {
    if (typeof console !== 'undefined') console.warn('[math] renderMathInElement not loaded');
    return;
  }
  try {
    // 先把不成对的 $ / $$ 包进 <span class="katex-ignore">，让 KaTeX 跳过、原样显示 $，
    // 避免孤 $ 跨段配对吞掉正文/表格。
    const skipTags = ['CODE', 'PRE', 'SCRIPT', 'STYLE', 'TEXTAREA'];
    const walker = document.createTreeWalker(
      preview,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          let p = node.parentElement;
          while (p) {
            if (skipTags.includes(p.tagName)) return NodeFilter.FILTER_REJECT;
            if (p.classList && p.classList.contains('katex')) return NodeFilter.FILTER_REJECT;
            p = p.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    const toProtect = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes('$')) toProtect.push(node);
    }
    for (const t of toProtect) {
      const protectedHTML = protectUnpairedDollar(t.textContent);
      if (protectedHTML !== t.textContent) {
        // 用临时容器把含 span 的 HTML 解析为节点片段，替换原文本节点
        const tmp = document.createElement('div');
        tmp.innerHTML = protectedHTML;
        const frag = document.createDocumentFragment();
        while (tmp.firstChild) frag.appendChild(tmp.firstChild);
        t.parentNode.replaceChild(frag, t);
      }
    }

    renderMathInElement(preview, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      ignoredClasses: ['katex-ignore']
    });
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[math] auto-render error:', e);
  }
}

function processAbbreviations(preview, opts) {
  const { escapeAttr, escapeHtml } = opts;
  const dataDiv = preview.querySelector('#abbr-data');
  if (!dataDiv) return;
  try {
    const abbrs = JSON.parse(dataDiv.getAttribute('data-abbrs'));
    if (!abbrs || !abbrs.length) { dataDiv.remove(); return; }

    abbrs.sort((a, b) => b[0].length - a[0].length);

    const skipTags = ['CODE', 'PRE'];
    const walker = document.createTreeWalker(
      preview,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          let p = node.parentElement;
          while (p) {
            if (skipTags.includes(p.tagName)) return NodeFilter.FILTER_REJECT;
            if (p.classList && p.classList.contains('katex')) return NodeFilter.FILTER_REJECT;
            p = p.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );

    const replacements = [];
    let node;
    while (node = walker.nextNode()) {
      let text = node.textContent;
      let modified = false;

      for (const [term, def] of abbrs) {
        if (!text.includes(term)) continue;
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'g');
        if (regex.test(text)) {
          modified = true;
          const safeDef = escapeAttr(def);
          const safeTerm = escapeHtml(term);
          text = text.replace(regex, `<abbr title="${safeDef}">${safeTerm}</abbr>`);
        }
      }

      if (modified) replacements.push({ node, html: text });
    }

    for (const { node, html } of replacements) {
      const span = document.createElement('span');
      span.innerHTML = html;
      node.replaceWith(...span.childNodes);
    }

    dataDiv.remove();
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[preview] Abbreviations error:', e);
    dataDiv.remove();
  }
}

function processHeadings(preview, opts) {
  const { headingToId } = opts;
  const idCount = {};
  preview.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    if (heading.id) return;
    const text = heading.textContent;
    let id = headingToId(text);
    if (idCount[id]) {
      idCount[id]++;
      heading.id = id + '-' + idCount[id];
    } else {
      idCount[id] = 1;
      heading.id = id;
    }
  });
}

async function processMermaid(preview, opts) {
  const { isDark } = opts;
  if (typeof mermaid === 'undefined') return;

  preview.querySelectorAll('code.language-mermaid').forEach((block, index) => {
    const pre = block.parentElement;
    const sourceLine = block.dataset.sourceLine;
    const container = document.createElement('div');
    container.className = 'mermaid-container';
    const id = 'mermaid-' + Date.now() + '-' + index;
    container.id = id;
    container.setAttribute('data-code', block.textContent);
    if (sourceLine) container.setAttribute('data-source-line', sourceLine);
    container.textContent = block.textContent;
    pre.replaceWith(container);
  });

  const containers = preview.querySelectorAll('.mermaid-container');
  if (containers.length === 0) return;

  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-preview').trim() || '-apple-system, sans-serif',
    });
    await mermaid.run({ nodes: Array.from(containers) });
  } catch (e) {
    if (typeof console !== 'undefined') console.error('Mermaid rendering error:', e);
  }
}

function addCopyButtons(preview, opts) {
  const { t } = opts;
  preview.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    if (pre.querySelector('code.language-mermaid')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = t('copy');
    btn.title = t('copyCode');

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const text = code ? code.textContent : pre.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = t('copied');
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = t('copy');
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = t('copied');
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = t('copy');
          btn.classList.remove('copied');
        }, 2000);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

// 浏览器：作为独立 <script> 加载，挂到全局 PreviewPost
if (typeof window !== 'undefined' && typeof module === 'undefined') {
  window.PreviewPost = {
    processEmojiShortcodes, processMath, processAbbreviations,
    processHeadings, processMermaid, addCopyButtons,
  };
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processEmojiShortcodes, processMath, processAbbreviations,
    processHeadings, processMermaid, addCopyButtons, EMOJI_MAP,
    protectUnpairedDollar,
  };
}
