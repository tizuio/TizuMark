// 回归测试：引用块懒续 + 文字段紧接表格 的渲染。
// 历史 bug：原 convertContainerTables 仅在「表格紧邻 > 行」或「表格行本身带 >」时转换；
// 当引用块首行带 >、后续多段普通文字（无 >）懒续、末尾接表格（无空行）时，
// 表格检测失败，整段被当纯文本，<table> 不生成。
// 修复后：追踪容器懒续状态，且「无空行紧接的表格」统一转 HTML。
const test = require('node:test');
const assert = require('node:assert');
const { renderMarkdown } = require('../src/unified-renderer.js');

test('引用块首行带> + 多段普通文字懒续 + 末尾表格(无空行) → 表格渲染进引用块内', () => {
  const md = [
    '> **本节结论**：平台以开发者代码场景为主。',
    '**分类体系**：12 类，多信号融合。',
    '**整体分布**：',
    '| 意图 | 总量 | 占比 |',
    '|------|------|------|',
    '| other | 5,482 | 27.0% |',
    '| code_review | 5,374 | 26.5% |',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(/<table/.test(html), '应生成 <table>');
  assert.ok(/<blockquote[^>]*>[\s\S]*<table/.test(html), '表格应在 <blockquote> 内');
});

test('顶层段落紧接表格(无空行) → 渲染为顶层表格', () => {
  const md = [
    '**整体分布**：',
    '| 意图 | 总量 |',
    '|------|------|',
    '| other | 5,482 |',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(/<table/.test(html), '应生成 <table>');
  assert.ok(!/<blockquote/.test(html), '顶层表格不应在 blockquote 内');
});

test('有空行分隔的顶层表格 → 仍正常(remark 处理)', () => {
  const md = [
    '以下是数据：',
    '',
    '| 意图 | 总量 |',
    '|------|------|',
    '| other | 5,482 |',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(/<table/.test(html), '有空行分隔的表格应正常渲染');
});

test('引用块内每行带>的表格 → 仍在引用块内', () => {
  const md = [
    '> **整体分布**：',
    '> | 意图 | 总量 |',
    '> |------|------|',
    '> | other | 5,482 |',
  ].join('\n');
  const html = renderMarkdown(md, { softBreaks: false });
  assert.ok(/<table/.test(html), '应生成 <table>');
  assert.ok(/<blockquote[^>]*>[\s\S]*<table/.test(html), '表格应在 <blockquote> 内');
});
