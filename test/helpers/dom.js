// 测试脚手架：用 jsdom 起一个最小预览容器，并加载项目内置的 highlight.js，
// 供各预览后处理模块（代码块高亮/行号、数学、mermaid 等）做无头回归测试。
const { JSDOM } = require('jsdom');
const path = require('path');

function createPreviewDom() {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div class="preview-content"></div></body></html>', {
    pretendToBeVisual: true,
  });
  const document = dom.window.document;
  const preview = document.querySelector('.preview-content');
  return { dom, window: dom.window, document, preview };
}

// 加载项目内置 highlight.js（UMD，挂载到 window.hljs）
function loadHljs(window) {
  const hljsPath = path.resolve(__dirname, '..', '..', 'src', 'lib', 'highlight.js', 'highlight.min.js');
  const code = require('fs').readFileSync(hljsPath, 'utf8');
  // highlight.min.js 是 UMD：用 window 作为 global 上下文执行，使其挂到 window.hljs
  const fn = new Function('window', 'self', 'module', 'exports', code);
  const mod = { exports: {} };
  fn(window, window, mod, mod.exports);
  return window.hljs || mod.exports;
}

// 反引号构造助手，避免 shell/字符串转义问题
const B = '`';

// 把 jsdom window 的全局（document / NodeFilter / navigator 等）挂到 Node 全局，
// 供直接引用全局 document/NodeFilter 的浏览器模块（如 preview-post.js）在测试中使用。
function installGlobals(window) {
  global.window = window;
  global.document = window.document;
  global.NodeFilter = window.NodeFilter;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle.bind(window);
  return window;
}

module.exports = { createPreviewDom, loadHljs, installGlobals, B };
