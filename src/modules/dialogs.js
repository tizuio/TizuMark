// 通用对话框（保存 / 确认）抽取：从 app.js 的 showSaveDialog / showConfirmDialog 拆出。
// 设计：纯 DOM + 回调，不依赖渲染管线；i18n(t) 与提示(showToast)通过 opts 注入，
// 与 preview-post / outline 模块的注入风格一致，降低改动爆炸半径。
//   - showSaveDialog({ title, message, saveLabel, discardLabel, cancelLabel, t, doc }): Promise<'save'|'discard'|'cancel'>
//   - showConfirmDialog({ title, message, action, t, showToast, doc }): Promise<boolean>

function showSaveDialog(opts) {
  const doc = opts.doc || document;
  const t = opts.t || ((k) => k);
  return new Promise((resolve) => {
    const dialog = doc.getElementById('save-dialog');
    const titleEl = doc.getElementById('save-dialog-title');
    const msgEl = doc.getElementById('save-dialog-message');
    const saveBtn = doc.getElementById('save-dialog-save');
    const discardBtn = doc.getElementById('save-dialog-discard');
    const cancelBtn = doc.getElementById('save-dialog-cancel');

    const origTitle = titleEl.textContent;
    const origMsg = msgEl.textContent;
    const origSave = saveBtn.textContent;
    const origDiscard = discardBtn.textContent;
    const origCancel = cancelBtn.textContent;

    if (opts.title !== undefined) titleEl.textContent = opts.title;
    if (opts.message !== undefined) msgEl.textContent = opts.message;
    if (opts.saveLabel) saveBtn.textContent = opts.saveLabel;
    if (opts.discardLabel) discardBtn.textContent = opts.discardLabel;
    if (opts.cancelLabel) cancelBtn.textContent = opts.cancelLabel;
    dialog.classList.remove('hidden');

    const cleanup = () => {
      dialog.classList.add('hidden');
      titleEl.textContent = origTitle;
      msgEl.textContent = origMsg;
      saveBtn.textContent = origSave;
      discardBtn.textContent = origDiscard;
      cancelBtn.textContent = origCancel;
      saveBtn.removeEventListener('click', onSave);
      discardBtn.removeEventListener('click', onDiscard);
      cancelBtn.removeEventListener('click', onCancel);
    };
    const onSave = () => { cleanup(); resolve('save'); };
    const onDiscard = () => { cleanup(); resolve('discard'); };
    const onCancel = () => { cleanup(); resolve('cancel'); };

    saveBtn.addEventListener('click', onSave);
    discardBtn.addEventListener('click', onDiscard);
    cancelBtn.addEventListener('click', onCancel);
  });
}

function showConfirmDialog(opts) {
  const doc = opts.doc || document;
  const t = opts.t || ((k) => k);
  const showToast = opts.showToast || (() => {});
  return new Promise((resolve) => {
    const dialog = doc.getElementById('confirm-dialog');
    const confirmBtn = doc.getElementById('confirm-dialog-confirm');
    const cancelBtn = doc.getElementById('confirm-dialog-cancel');
    doc.getElementById('confirm-dialog-title').textContent = opts.title || t('confirm');
    doc.getElementById('confirm-dialog-message').innerHTML = opts.message || '';
    dialog.classList.remove('hidden');

    const cleanup = () => {
      dialog.classList.add('hidden');
      confirmBtn.removeEventListener('click', onConfirm);
      cancelBtn.removeEventListener('click', onCancel);
    };
    const onConfirm = async () => {
      if (opts.action) {
        confirmBtn.disabled = true;
        cancelBtn.disabled = true;
        const originalHTML = confirmBtn.innerHTML;
        confirmBtn.innerHTML = `<span class="btn-spinner"></span>` + t('processing');
        try {
          await opts.action();
        } catch (e) {
          showToast(t('deleteFont') + ' ' + t('failed') + ': ' + e, 'danger');
        } finally {
          confirmBtn.disabled = false;
          cancelBtn.disabled = false;
          confirmBtn.innerHTML = originalHTML;
        }
      }
      cleanup();
      resolve(true);
    };
    const onCancel = () => { cleanup(); resolve(false); };

    confirmBtn.addEventListener('click', onConfirm);
    cancelBtn.addEventListener('click', onCancel);
  });
}

const Dialogs = { showSaveDialog, showConfirmDialog };

// 浏览器：作为独立 <script> 加载，挂到全局 Dialogs
if (typeof window !== 'undefined' && typeof module === 'undefined') {
  window.Dialogs = Dialogs;
}
// Node（测试 / 构建）：CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dialogs;
}
