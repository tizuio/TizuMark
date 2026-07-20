// 回归测试：不成对定界符（$）吞内容 + 孤立 == 高亮丢字符。
// 覆盖 guardMathBlocks 行内/块级分支的 !foundEnd 回退，以及 convertHighlights 的 == 回退。
const test = require('node:test');
const assert = require('node:assert');
const { renderMarkdown } = require('../src/unified-renderer.js');

test('不成对 $ 在表格中不吞内容（用户复现）', () => {
  const md = [
    '## 测试',
    '',
    '| 项目 | 费用 |',
    '| ---- | ---- |',
    '| 配额 | $12/5h 窗口 |',
    '| 单价 | $0.00038/次 |',
    '',
    '正文里有金额 $12/5h 和 $0.00038/次',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  // 表格仍正常渲染
  assert.ok(html.includes('<table'), '应渲染为 <table>');
  assert.ok((html.match(/<td/g) || []).length === 4, '应有 4 个单元格，不错位');
  // 金额以普通文本原样出现，未被包进 MATHBLOCK 占位符
  assert.ok(html.includes('$12/5h 窗口'), '表格单元格金额应原样显示');
  assert.ok(html.includes('$0.00038/次'), '表格单元格金额应原样显示');
  assert.ok(html.includes('正文里有金额 $12/5h 和 $0.00038/次'), '正文金额应原样显示');
  assert.ok(!html.includes('MATHBLOCK'), '不应生成任何 MATHBLOCK（无成对公式）');
});

test('不成对 $ 不跨表格单元格配对（用户复现 v2）', () => {
  // 同一行两个不成对 $（不同单元格）不应被当一条公式吞掉中间内容
  const md = [
    '## 测试',
    '',
    '| 项目 | 费用 |',
    '| ---- | ---- |',
    '| 配额 | $12/5h 窗口 |',
    '| 单价 | $0.00038/次 |',
    '',
    '正文里有金额 $$12/5h 和 $$0.00038/次 也会被吞。',
    '',
    '$$ 234322 $$',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(html.includes('<table'), '应渲染为 <table>');
  assert.strictEqual((html.match(/<td/g) || []).length, 4, '应有 4 个单元格，不错位');
  assert.ok(html.includes('$12/5h 窗口'), '表格金额应原样显示');
  assert.ok(html.includes('$0.00038/次'), '表格金额应原样显示');
  assert.ok(html.includes('$$12/5h 和 $$0.00038/次'), '正文内联 $$ 应原样显示（不当公式）');
  assert.ok(html.includes('$$ 234322 $$'), '成对 $$...$$ 应保留供 KaTeX 渲染');
  assert.ok(!html.includes('MATHBLOCK'), '不应生成行内 MATHBLOCK');
  assert.ok((html.match(/math-display/g) || []).length === 1, '仅 $$ 234322 $$ 一个块级公式');
});

test('行内 $$ 当字面量，不跨段配对', () => {
  // 行内的 $$ 不应作为块级公式，也不应与后续 $$ 跨段配对
  const html = renderMarkdown('正文里有金额 $$12/5h 和 $$0.00038/次', { softBreaks: false });
  assert.ok(html.includes('$$12/5h 和 $$0.00038/次'), '行内 $$ 应原样显示');
  assert.ok(!html.includes('math-display'), '行内 $$ 不应生成块级公式占位');
  assert.ok(!html.includes('MATHBLOCK'), '行内 $$ 不应生成行内占占位');
});

test('成对 $...$ 跨单元格不被配对', () => {
  // 两个单元格各一个 $ 不应拼成一条公式
  const md = '| a | b |\n| - | - |\n| $x | y$ |';
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(html.includes('$x'), '第一格 $ 原样显示');
  assert.ok(html.includes('y$'), '第二格 $ 原样显示');
  assert.ok(!html.includes('MATHBLOCK'), '跨单元格不成对，不生成占位符');
});

test('成对 $...$ 还原为转义文本（KaTeX 在 DOM 阶段渲染）', () => {
  const html = renderMarkdown('行内 $a+b$ 公式', { softBreaks: false });
  // restoreMathBlocks 会把占位符替换回转义后的纯文本，KaTeX 在浏览器里渲染
  assert.ok(html.includes('$a+b$'), '成对 $...$ 应还原为字面量文本（供后续 KaTeX 渲染）');
  assert.ok(html.includes('公式'), '后续文字不应被吞');
});

test('成对 $$...$$ 还原为块级 math-display', () => {
  const html = renderMarkdown('$$c^2$$', { softBreaks: false });
  assert.ok(html.includes('math-display'), '成对 $$...$$ 应生成 math-display 占位');
});

test('孤立不成对 $ 原样显示不吞后续', () => {
  const html = renderMarkdown('价格 $100 起，详见下文', { softBreaks: false });
  assert.ok(html.includes('$100'), '孤立 $ 应原样显示');
  assert.ok(html.includes('详见下文'), '后续内容不应被吞掉');
  assert.ok(!html.includes('MATHBLOCK'), '不应生成 MATHBLOCK');
});

test('代码块/反引号内 $ 不处理', () => {
  const md = [
    '```',
    '$a+b$',
    '```',
    '',
    '行内 `$c+d$` 示例',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(html.includes('$a+b$'), '代码块内 $ 应原样保留');
  assert.ok(html.includes('$c+d$'), '反引号内 $ 应原样保留');
  assert.ok(!html.includes('MATHBLOCK'), '代码块/反引号内不应生成 MATHBLOCK');
});

test('$ 后接空格不触发公式', () => {
  const html = renderMarkdown('金额 $ 100 起', { softBreaks: false });
  assert.ok(html.includes('$ 100'), '$ 空格后 应原样显示');
});

test('孤立 == 原样显示不丢字符（方案 B）', () => {
  const html = renderMarkdown('x == y 表示相等', { softBreaks: false });
  assert.ok(html.includes('x == y 表示相等'), '孤立 == 应原样显示，不丢 =');
  assert.ok(!html.includes('<mark>'), '孤立 == 不应生成 <mark>');
});

test('成对 ==x== 仍高亮', () => {
  const html = renderMarkdown('这是 ==重点== 内容', { softBreaks: false });
  assert.ok(html.includes('<mark>重点</mark>'), '成对 == 应高亮');
});

test('代码块内 == 不被高亮', () => {
  const md = [
    '```js',
    'if (a == b) {}',
    '```',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(html.includes('a == b'), '代码块内 == 应原样保留');
  assert.ok(!html.includes('<mark>'), '代码块内 == 不应高亮');
});
