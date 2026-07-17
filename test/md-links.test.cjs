// Markdown 链接解析单元测试（无需浏览器 / Tauri，可直接 node --test 运行）
const test = require('node:test');
const assert = require('node:assert/strict');
const { isMarkdownLink, resolveDocPath } = require('../src/lib/md-links.js');

test('isMarkdownLink 识别各类链接', () => {
  assert.equal(isMarkdownLink('other.md'), true);
  assert.equal(isMarkdownLink('./sub/doc.markdown'), true);
  assert.equal(isMarkdownLink('../docs/note.mdx'), true);
  assert.equal(isMarkdownLink('page.md#section'), true);   // 带锚点
  assert.equal(isMarkdownLink('page.md?x=1'), true);        // 带查询
  assert.equal(isMarkdownLink('image.png'), false);
  assert.equal(isMarkdownLink('https://x.com/a.md'), true); // 远程 md
  assert.equal(isMarkdownLink('#anchor'), false);
  assert.equal(isMarkdownLink('mailto:a@b.com'), false);
  assert.equal(isMarkdownLink(''), false);
  assert.equal(isMarkdownLink(null), false);
});

test('resolveDocPath 同级相对链接', () => {
  assert.equal(
    resolveDocPath('C:\\docs\\a.md', 'other.md'),
    'C:\\docs\\other.md'
  );
  assert.equal(
    resolveDocPath('/home/user/a.md', 'other.md'),
    '/home/user/other.md'
  );
});

test('resolveDocPath 处理 ./ 与子目录', () => {
  assert.equal(
    resolveDocPath('/home/user/a.md', './sub/doc.md'),
    '/home/user/sub/doc.md'
  );
  assert.equal(
    resolveDocPath('C:\\docs\\a.md', '.\\sub\\doc.md'),
    'C:\\docs\\sub\\doc.md'
  );
});

test('resolveDocPath 处理 ../ 向上级目录回溯', () => {
  assert.equal(
    resolveDocPath('/home/user/notes/a.md', '../refs/b.md'),
    '/home/user/refs/b.md'
  );
  assert.equal(
    resolveDocPath('C:\\docs\\notes\\a.md', '..\\refs\\b.md'),
    'C:\\docs\\refs\\b.md'
  );
});

test('resolveDocPath 多级回溯越过基准目录被忽略', () => {
  // 基准只有一级目录时，多余的 .. 不会越界
  assert.equal(
    resolveDocPath('/home/a.md', '../../escape.md'),
    '/escape.md'
  );
});

test('resolveDocPath 绝对路径原样返回', () => {
  assert.equal(resolveDocPath('/home/a.md', 'C:\\x\\y.md'), 'C:\\x\\y.md');
  assert.equal(resolveDocPath('/home/a.md', '/abs/path.md'), '/abs/path.md');
  assert.equal(resolveDocPath('/home/a.md', 'https://x.com/a.md'), 'https://x.com/a.md');
  assert.equal(resolveDocPath('/home/a.md', '#anchor'), '#anchor');
});

test('resolveDocPath 无基准文件时回退为原 href', () => {
  assert.equal(resolveDocPath(null, 'other.md'), 'other.md');
  assert.equal(resolveDocPath('', 'sub/other.md'), 'sub/other.md');
});
