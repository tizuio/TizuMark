// 回归测试：预览后处理聚合模块 src/modules/preview-post.js
// 覆盖 emoji 短码、数学(KaTeX 未加载时安全跳过)、缩写(abbr)、标题锚点、复制按钮、mermaid 跳过。
const test = require('node:test');
const assert = require('node:assert');
const { createPreviewDom, installGlobals } = require('./helpers/dom.js');
const { renderMarkdown } = require('../src/unified-renderer.js');
const PP = require('../src/modules/preview-post.js');
const { B } = require('./helpers/dom.js');

const { preview: _g } = createPreviewDom();
installGlobals(_g.ownerDocument.defaultView);

const noopT = (k) => k;
const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const headingToId = (text) => {
  let id = '';
  for (const ch of text) {
    if (/[\p{L}\p{N}]/u.test(ch)) id += ch.toLowerCase();
    else if (ch === ' ' || ch === '-' || ch === '_') id += '-';
  }
  return id.replace(/-+/g, '-').replace(/^-|-$/g, '');
};
const opts = { t: noopT, isDark: false, escapeHtml, escapeAttr, headingToId };

test('emoji 短码被替换（跳过 code/pre）', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<p>hello :fire: world</p><pre><code>:fire:</code></pre>';
  PP.processEmojiShortcodes(preview);
  assert.ok(preview.querySelector('p').textContent.includes('🔥'), '段落内应替换');
  assert.ok(preview.querySelector('pre code').textContent.includes(':fire:'), 'code 内不应替换');
});

test('数学未加载时安全跳过不抛错', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<p>公式 $a+b$</p>';
  // renderMathInElement 未定义（jsdom 全局无）
  assert.doesNotThrow(() => PP.processMath(preview));
});

test('缩写 abbr 被替换且跳过 code/pre', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<div id="abbr-data" data-abbrs=\'[[ "Tizu", "TizuMark 编辑器" ]]\'></div><p>用 Tizu 写文档，<code>Tizu</code> 不替换</p>';
  PP.processAbbreviations(preview, opts);
  const p = preview.querySelector('p');
  assert.ok(p.querySelector('abbr'), '段落内应生成 abbr');
  assert.strictEqual(p.querySelector('code').textContent, 'Tizu', 'code 内不替换');
  assert.strictEqual(preview.querySelector('#abbr-data'), null, 'abbr-data 应被移除');
});

test('标题锚点按 headingToId 生成且去重', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<h1>Hello World</h1><h1>Hello World</h1><h2>Hello World</h2>';
  PP.processHeadings(preview, opts);
  const ids = [...preview.querySelectorAll('h1, h2')].map(h => h.id);
  assert.deepStrictEqual(ids, ['hello-world', 'hello-world-2', 'hello-world-3']);
});

test('复制按钮注入且 mermaid 块不加复制按钮', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<pre><code>const a=1;</code></pre><pre><code class="language-mermaid">graph TD;A-->B;</code></pre>';
  PP.addCopyButtons(preview, opts);
  const pres = preview.querySelectorAll('pre');
  assert.strictEqual(pres[0].querySelector('.copy-btn') !== null, true, '普通代码块应有复制按钮');
  assert.strictEqual(pres[1].querySelector('.copy-btn'), null, 'mermaid 块不应有复制按钮');
});

test('mermaid 未加载时跳过不抛错', () => {
  const { preview } = createPreviewDom();
  preview.innerHTML = '<pre><code class="language-mermaid">graph TD;A-->B;</code></pre>';
  assert.doesNotThrow(async () => { await PP.processMermaid(preview, opts); });
});

test('集成：完整 markdown 经 unified 渲染 + 后处理后结构正常', () => {
  const { preview } = createPreviewDom();
  const md = '# 标题 Hello\n\n正文 :star: 测试\n\n' + B + B + B + 'js\nconst a = 1;\n' + B + B + B;
  preview.innerHTML = renderMarkdown(md, { softBreaks: false });
  PP.processEmojiShortcodes(preview);
  PP.processHeadings(preview, opts);
  PP.addCopyButtons(preview, opts);
  assert.strictEqual(preview.querySelector('h1').id, '标题-hello', '标题锚点应与 headingToId 一致');
  assert.ok(preview.querySelector('p').textContent.includes('⭐'), 'emoji 应替换');
  assert.strictEqual(preview.querySelector('pre .copy-btn') !== null, true, '代码块应有复制按钮');
});
