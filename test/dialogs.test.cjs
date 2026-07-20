// 通用对话框单元测试：锁定 showSaveDialog / showConfirmDialog 行为。
// 这两个函数是纯 DOM + 回调，可在 jsdom 下构造对应元素后点击验证。
const test = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const { showSaveDialog, showConfirmDialog } = require('../src/modules/dialogs.js');

function buildDom() {
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
  const d = dom.window.document;
  function mk(id, tag) {
    const el = d.createElement(tag || 'div');
    el.id = id;
    d.body.appendChild(el);
    return el;
  }
  const sd = mk('save-dialog'); sd.classList.add('hidden');
  mk('save-dialog-title', 'span'); mk('save-dialog-message', 'span');
  mk('save-dialog-save', 'button'); mk('save-dialog-discard', 'button'); mk('save-dialog-cancel', 'button');
  const cd = mk('confirm-dialog'); cd.classList.add('hidden');
  mk('confirm-dialog-title', 'span'); mk('confirm-dialog-message', 'span');
  mk('confirm-dialog-confirm', 'button'); mk('confirm-dialog-cancel', 'button');
  return { dom, d };
}

const t = (k) => k; // 测试用占位 i18n

test('showSaveDialog 点击保存返回 save 并恢复文案', async () => {
  const { d } = buildDom();
  const p = showSaveDialog({ doc: d, t });
  d.getElementById('save-dialog-save').click();
  const r = await p;
  assert.strictEqual(r, 'save');
  assert.ok(d.getElementById('save-dialog').classList.contains('hidden'), '关闭后应隐藏');
});

test('showSaveDialog 三种按钮分别返回', async () => {
  const { d } = buildDom();
  const r1 = await (() => { const p = showSaveDialog({ doc: d, t }); d.getElementById('save-dialog-discard').click(); return p; })();
  assert.strictEqual(r1, 'discard');
  const r2 = await (() => { const p = showSaveDialog({ doc: d, t }); d.getElementById('save-dialog-cancel').click(); return p; })();
  assert.strictEqual(r2, 'cancel');
});

test('showSaveDialog 设置文案后 cleanup 还原原始文案', async () => {
  const { d } = buildDom();
  const titleEl = d.getElementById('save-dialog-title');
  const orig = titleEl.textContent;
  const p = showSaveDialog({ title: '自定义标题', doc: d, t });
  assert.strictEqual(titleEl.textContent, '自定义标题');
  d.getElementById('save-dialog-save').click();
  await p;
  assert.strictEqual(titleEl.textContent, orig, '应还原原始文案');
});

test('showConfirmDialog 取消返回 false', async () => {
  const { d } = buildDom();
  const p = showConfirmDialog({ title: '确认?', message: '<b>内容</b>', doc: d, t });
  assert.strictEqual(d.getElementById('confirm-dialog-message').innerHTML, '<b>内容</b>');
  d.getElementById('confirm-dialog-cancel').click();
  const r = await p;
  assert.strictEqual(r, false);
  assert.ok(d.getElementById('confirm-dialog').classList.contains('hidden'));
});

test('showConfirmDialog 确认无 action 返回 true', async () => {
  const { d } = buildDom();
  const p = showConfirmDialog({ title: '确认?', doc: d, t });
  d.getElementById('confirm-dialog-confirm').click();
  const r = await p;
  assert.strictEqual(r, true);
});

test('showConfirmDialog 带 action 时调用并在完成后 resolve', async () => {
  const { d } = buildDom();
  let called = false;
  const p = showConfirmDialog({
    title: '删除?', doc: d, t,
    action: async () => { called = true; },
  });
  d.getElementById('confirm-dialog-confirm').click();
  const r = await p;
  assert.strictEqual(called, true);
  assert.strictEqual(r, true);
});

test('showConfirmDialog action 抛错时调用 showToast 且不崩溃', async () => {
  const { d } = buildDom();
  const toasts = [];
  const p = showConfirmDialog({
    title: '删除?', doc: d, t,
    action: async () => { throw new Error('boom'); },
    showToast: (msg, type) => toasts.push({ msg, type }),
  });
  d.getElementById('confirm-dialog-confirm').click();
  const r = await p;
  assert.strictEqual(r, true, '异常仍应 resolve true');
  assert.strictEqual(toasts.length, 1, '应调用 showToast');
  assert.ok(toasts[0].msg.includes('boom'));
});
