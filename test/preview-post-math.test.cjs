// 回归测试：KaTeX 后处理阶段保护不成对 $ / $$，用 katex-ignore span 包裹，
// 避免跨段配对吞内容，且原样显示 $（不出现 \$ 反斜杠）。
const test = require('node:test');
const assert = require('node:assert');
const { protectUnpairedDollar } = require('../src/modules/preview-post.js');

test('不成对 $$ 在正文被包 ignore span（用户复现，无反斜杠）', () => {
  const s = '正文里有金额 $$12/5h 和 $$0.00038/次 也会被吞。';
  const r = protectUnpairedDollar(s);
  assert.ok(r.includes('<span class="katex-ignore">$$</span>'), '不成对 $$ 应包 ignore span');
  assert.ok(!r.includes('\\$'), '不应出现反斜杠转义');
  assert.ok(r.includes('和') && r.includes('也会被吞'), '中间与后续文字保留');
});

test('成对 $...$ 保留不包裹（交给 KaTeX 渲染）', () => {
  const s = '行内 $a+b$ 公式';
  const r = protectUnpairedDollar(s);
  assert.strictEqual(r, s);
});

test('成对 $$...$$ 保留不包裹', () => {
  const s = '$$c^2$$';
  const r = protectUnpairedDollar(s);
  assert.strictEqual(r, s);
});

test('带空格的 $$ 234322 $$ 保留为合法块级公式', () => {
  const s = '$$ 234322 $$';
  const r = protectUnpairedDollar(s);
  assert.strictEqual(r, s);
});

test('表格单元格内的孤立 $ 被包 ignore span', () => {
  const s = '配额 | $12/5h 窗口';
  const r = protectUnpairedDollar(s);
  assert.ok(r.includes('<span class="katex-ignore">$</span>12/5h 窗口'), '孤立 $ 应包 ignore span');
  assert.ok(r.includes('配额 | '), '表格分隔保留');
});

test('$ 后接空格不当公式，包 span', () => {
  const s = '金额 $ 100 起';
  const r = protectUnpairedDollar(s);
  assert.ok(r.includes('<span class="katex-ignore">$</span> 100'), '$ 空格后 应包 span');
});

test('孤立 $ 在句中被包 span，后续保留', () => {
  const s = '价格 $100 起，详见下文';
  const r = protectUnpairedDollar(s);
  assert.ok(r.includes('<span class="katex-ignore">$</span>100'), '孤立 $ 应包 span');
  assert.ok(r.includes('详见下文'), '后续内容应保留');
});

test('跨单元格的 $ 各自包 span，不配对', () => {
  const s = '| $x | y$ |';
  const r = protectUnpairedDollar(s);
  // 两个 $ 都应被单独包裹，不应出现配对的 $x | y$ 数学
  const spans = (r.match(/katex-ignore/g) || []).length;
  assert.strictEqual(spans, 2, '两个孤立 $ 各包一个 ignore span');
});
