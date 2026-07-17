// Markdown 链接点击的集成测试：复现 SPA 回退陷阱（fetch *.md 会返回 index.html），
// 验证修复后的逻辑使用 resolveDocPath + invoke('read_file')，而绝不使用 fetch。
// 运行：node --test test/md-link-click.integration.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { isMarkdownLink, resolveDocPath } = require('../src/lib/md-links.js');

// 模拟当前打开的文档与它的相对链接目标
const VFS = {
  'C:\\docs\\index.md': '# Index\n[页面二](./page2.md)\n[子页](./sub/page3.md)\n[共享](../shared/page4.md)',
  'C:\\docs\\page2.md': '# 页面二\nREAL_CONTENT_2',
  'C:\\docs\\sub\\page3.md': '# 子页\nREAL_CONTENT_3',
  'C:\\shared\\page4.md': '# 共享\nREAL_CONTENT_4',
};

// 复刻 app.js 预览点击处理中“本地 .md 链接”分支的核心逻辑
async function handleLocalMdLink(href, baseFilePath) {
  if (!isMarkdownLink(href)) return null;
  if (href.startsWith('http://') || href.startsWith('https://')) return null;
  if (typeof window !== 'undefined' && window.__TAURI__) {
    let target = href;
    if (baseFilePath) target = resolveDocPath(baseFilePath, href);
    const content = await window.__TAURI__.core.invoke('read_file', { path: target });
    return { target, content };
  }
  return null;
}

test('相对 .md 链接点击：使用 resolveDocPath + read_file，且不触发 fetch（SPA 回退陷阱）', async () => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
  const { window } = dom;
  global.window = window;

  let fetchCalls = 0;
  // 模拟 Tauri 服务器的 SPA 回退：任何对 .md 的请求都返回 index.html（即 bug 现象）
  window.fetch = async (url) => {
    fetchCalls++;
    return {
      ok: true,
      text: async () => '<!DOCTYPE html><html><head><title>TizuMark</title></head><body>INDEX_HTML</body></html>',
    };
  };

  window.__TAURI__ = {
    core: {
      invoke: async (cmd, args) => {
        if (cmd === 'read_file') {
          if (VFS[args.path] !== undefined) return VFS[args.path];
          throw new Error('File not found: ' + args.path);
        }
        throw new Error('Unknown command: ' + cmd);
      },
    },
  };

  const base = 'C:\\docs\\index.md';
  const cases = [
    ['./page2.md', 'C:\\docs\\page2.md', 'REAL_CONTENT_2'],
    ['./sub/page3.md', 'C:\\docs\\sub\\page3.md', 'REAL_CONTENT_3'],
    ['../shared/page4.md', 'C:\\shared\\page4.md', 'REAL_CONTENT_4'],
  ];

  for (const [href, expectedPath, expectedContent] of cases) {
    const result = await handleLocalMdLink(href, base);
    assert.ok(result, `链接 ${href} 应被处理`);
    assert.equal(result.target, expectedPath, `链接 ${href} 解析路径`);
    assert.ok(result.content.includes(expectedContent), `链接 ${href} 内容应来自真实文件`);
    assert.ok(!result.content.includes('INDEX_HTML'), `链接 ${href} 绝不能返回 index.html（SPA 回退陷阱）`);
  }

  assert.equal(fetchCalls, 0, '修复后不应再对本地 .md 发起 fetch 请求');
});
