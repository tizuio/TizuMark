// 相对 Markdown 链接解析工具
// 同时支持浏览器（作为全局函数）与 Node（CommonJS require）环境，便于单元测试。
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.isMarkdownLink = api.isMarkdownLink;
    root.resolveDocPath = api.resolveDocPath;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // 判断链接是否指向一个 Markdown 文档（忽略 # 锚点与 ? 查询段）
  function isMarkdownLink(href) {
    if (!href) return false;
    const clean = href.split('#')[0].split('?')[0];
    return /\.(md|markdown|mdx)$/i.test(clean);
  }

  // 相对当前文档所在目录，把 href 解析为绝对路径。
  // 处理 ./ 与 ../，并在 Windows 上输出反斜杠、Unix 上保留前导 /。
  // 已为绝对路径（盘符 / 根路径 / http(s) / 锚点 / mailto）的链接直接原样返回。
  function resolveDocPath(baseFilePath, href) {
    if (!href) return href;
    if (
      /^[a-zA-Z]:[\\/]/.test(href) ||
      href.startsWith('/') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return href;
    }
    if (!baseFilePath) return href;

    const lastSep = Math.max(baseFilePath.lastIndexOf('/'), baseFilePath.lastIndexOf('\\'));
    const dir = lastSep > 0 ? baseFilePath.substring(0, lastSep) : '';
    const isUnixAbs = baseFilePath.startsWith('/');
    const sep = (baseFilePath.includes('\\') || dir.includes('\\')) ? '\\' : '/';

    const stack = [];
    if (dir) {
      for (const p of dir.split(/[/\\]/)) {
        if (p) stack.push(p);
      }
    }
    for (const part of href.split(/[/\\]/)) {
      if (part === '' || part === '.') continue;
      if (part === '..') {
        if (stack.length) stack.pop();
        continue;
      }
      stack.push(part);
    }

    let result = stack.join(sep);
    if (isUnixAbs && sep === '/' && !result.startsWith('/')) {
      result = '/' + result;
    }
    return result;
  }

  return { isMarkdownLink, resolveDocPath };
}));
