const { invoke } = window.__TAURI__.core;

async function dialogOpen(options = {}) {
  return await invoke('plugin:dialog|open', { options });
}

async function dialogSave(options = {}) {
  return await invoke('plugin:dialog|save', { options });
}

class Tab {
  constructor(name = '未命名', content = '', filePath = null) {
    this.name = name;
    this.content = content;
    this.savedContent = content;
    this.filePath = filePath;
    this.cursorPos = { line: 0, ch: 0 };
    this.scrollPos = { top: 0, left: 0 };
  }

  get isModified() {
    return this.content !== this.savedContent;
  }
}

class MarkdownEditor {
  constructor() {
    this.tabs = [new Tab()];
    this.activeTabIndex = 0;
    this.cm = null;
    this.debounceTimer = null;
    this.isDark = false;
    this.viewMode = 'preview';

    this.preview = document.getElementById('preview');
    this.statusText = document.getElementById('status-text');
    this.cursorPosition = document.getElementById('cursor-position');

    this.initEditor();
    this.initEventListeners();
    this.initResizer();
    this.initFindReplace();
    this.initScrollTopBtn();
    this.loadTheme();
    this.updatePreview();
    this.applyViewMode();
  }

  get activeTab() {
    return this.tabs[this.activeTabIndex];
  }

  initEditor() {
    this.cm = CodeMirror(document.getElementById('editor-wrapper'), {
      value: '',
      mode: 'gfm',
      theme: 'default',
      lineNumbers: true,
      lineWrapping: true,
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Tab': (cm) => {
          if (cm.somethingSelected()) {
            cm.indentSelection('add');
          } else {
            cm.replaceSelection('  ', 'end');
          }
        },
        'Shift-Tab': (cm) => cm.indentSelection('subtract'),
        'Ctrl-S': () => this.saveFile(),
        'Cmd-S': () => this.saveFile(),
        'Ctrl-O': () => this.openFile(),
        'Cmd-O': () => this.openFile(),
        'Ctrl-N': () => this.newFile(),
        'Cmd-N': () => this.newFile(),
        'Ctrl-F': () => this.toggleFindPanel(),
        'Cmd-F': () => this.toggleFindPanel(),
        'Ctrl-H': () => this.toggleFindPanel(true),
        'Cmd-H': () => this.toggleFindPanel(true),
        'Ctrl-Shift-F': () => this.toggleFindPanel(),
        'Cmd-Shift-F': () => this.toggleFindPanel(),
        'Esc': () => this.closeFindPanel(),
      }
    });

    this.cm.on('change', () => {
      this.activeTab.content = this.cm.getValue();
      this.updateTabDisplay();
      this.debounceUpdatePreview();
    });

    this.cm.on('cursorActivity', () => {
      const cursor = this.cm.getCursor();
      this.activeTab.cursorPos = cursor;
      this.cursorPosition.textContent = `行 ${cursor.line + 1}, 列 ${cursor.ch + 1}`;
    });

    this.cm.on('scroll', () => {
      const info = this.cm.getScrollInfo();
      this.activeTab.scrollPos = { top: info.top, left: info.left };
      
      if (this.viewMode === 'edit') {
        const scrollPercent = info.top / (info.height - info.clientHeight || 1);
        const previewScrollTop = scrollPercent * (this.preview.scrollHeight - this.preview.clientHeight);
        this.preview.scrollTop = previewScrollTop;
      }
    });

    this.preview.addEventListener('scroll', () => {
      if (this.viewMode === 'edit') {
        const scrollPercent = this.preview.scrollTop / (this.preview.scrollHeight - this.preview.clientHeight || 1);
        const info = this.cm.getScrollInfo();
        const editorScrollTop = scrollPercent * (info.height - info.clientHeight);
        this.cm.scrollTo(0, editorScrollTop);
      }
    });
  }

  switchTab(index) {
    if (index === this.activeTabIndex || index < 0 || index >= this.tabs.length) return;

    const oldTab = this.activeTab;
    oldTab.content = this.cm.getValue();
    oldTab.cursorPos = this.cm.getCursor();
    oldTab.scrollPos = { top: this.cm.getScrollInfo().top, left: this.cm.getScrollInfo().left };

    this.activeTabIndex = index;
    const newTab = this.activeTab;

    this.cm.setValue(newTab.content);
    this.cm.setCursor(newTab.cursorPos);
    this.cm.scrollTo(newTab.scrollPos.left, newTab.scrollPos.top);
    this.cm.clearHistory();

    this.updateTabDisplay();
    this.updatePreview();
  }

  addTab(name = '未命名', content = '', filePath = null) {
    const tab = new Tab(name, content, filePath);
    this.tabs.push(tab);
    this.switchTab(this.tabs.length - 1);
    this.updateTabBar();
  }

  async closeTab(index) {
    if (this.tabs.length === 1) {
      this.newFile();
      return;
    }

    if (index < 0 || index >= this.tabs.length) return;

    const tab = this.tabs[index];
    if (tab.isModified) {
      const result = await this.showSaveDialog('保存更改', `${tab.name} 已修改，是否保存？`);
      if (result === 'cancel') return;
      if (result === 'save') {
        const savedIndex = this.tabs.indexOf(tab);
        if (savedIndex === -1) return;
        this.activeTabIndex = savedIndex;
        this.cm.setValue(tab.content);
        this.activeTab.savedContent = this.activeTab.content;
        this.updateTabDisplay();
      }
    }

    const removeIndex = this.tabs.indexOf(tab);
    if (removeIndex === -1) return;

    this.tabs.splice(removeIndex, 1);
    if (removeIndex < this.activeTabIndex) {
      this.activeTabIndex--;
    } else if (removeIndex >= this.activeTabIndex) {
      if (this.activeTabIndex >= this.tabs.length) {
        this.activeTabIndex = this.tabs.length - 1;
      }
    }
    this.updateTabBar();
    if (this.tabs.length > 0) {
      this.cm.setValue(this.activeTab.content);
      this.cm.setCursor(this.activeTab.cursorPos);
      this.updatePreview();
    }
  }

  updateTabBar() {
    const tabBar = document.getElementById('tab-bar');
    const fragment = document.createDocumentFragment();

    this.tabs.forEach((tab, i) => {
      const tabEl = document.createElement('div');
      tabEl.className = `tab${i === this.activeTabIndex ? ' active' : ''}${tab.isModified ? ' modified' : ''}`;
      tabEl.dataset.index = i;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'tab-name';
      nameSpan.textContent = tab.name;
      tabEl.appendChild(nameSpan);

      if (this.tabs.length > 1) {
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tab-close';
        closeBtn.textContent = '\u00d7';
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeTab(i);
        });
        tabEl.appendChild(closeBtn);
      }

      tabEl.addEventListener('click', () => this.switchTab(i));
      fragment.appendChild(tabEl);
    });

    tabBar.replaceChildren(fragment);
  }

  updateTabDisplay() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, i) => {
      tab.className = `tab${i === this.activeTabIndex ? ' active' : ''}${this.tabs[i].isModified ? ' modified' : ''}`;
      tab.querySelector('.tab-name').textContent = this.tabs[i].name;
    });
  }

  initEventListeners() {
    document.getElementById('btn-new').addEventListener('click', () => this.newFile());
    document.getElementById('btn-open').addEventListener('click', () => this.openFile());
    document.getElementById('btn-save').addEventListener('click', () => this.saveFile());
    document.getElementById('btn-save-as').addEventListener('click', () => this.saveAsFile());
    document.getElementById('btn-export').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('export-menu').classList.toggle('hidden');
    });
    document.getElementById('btn-export-html').addEventListener('click', () => this.exportHTML());
    document.getElementById('btn-export-pdf').addEventListener('click', () => this.exportPDF());
    document.addEventListener('click', () => {
      document.getElementById('export-menu').classList.add('hidden');
    });
    document.getElementById('btn-theme').addEventListener('click', () => this.toggleTheme());
    document.getElementById('btn-find').addEventListener('click', () => this.toggleFindPanel());
    document.getElementById('btn-view-preview').addEventListener('click', () => this.setViewMode('preview'));
    document.getElementById('btn-view-edit').addEventListener('click', () => this.setViewMode('edit'));
    document.getElementById('btn-side-left').addEventListener('click', () => this.toggleCollapse('editor'));
    document.getElementById('btn-side-right').addEventListener('click', () => this.toggleCollapse('preview'));
    document.getElementById('btn-about').addEventListener('click', () => this.showAbout());
    document.getElementById('about-close').addEventListener('click', () => this.hideAbout());

    document.addEventListener('keydown', async (e) => {
      if (e.key === 'Escape') {
        // 如果关于对话框打开，关闭它
        const aboutDialog = document.getElementById('about-dialog');
        if (!aboutDialog.classList.contains('hidden')) {
          this.hideAbout();
          return;
        }
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            this.saveFile();
            break;
          case 'o':
            e.preventDefault();
            this.openFile();
            break;
          case 'n':
            e.preventDefault();
            this.newFile();
            break;
          case 'w':
            e.preventDefault();
            await this.closeTab(this.activeTabIndex);
            break;
          case 'f':
            e.preventDefault();
            this.toggleFindPanel();
            break;
          case 'h':
            e.preventDefault();
            this.toggleFindPanel(true);
            break;
          case 'tab':
            e.preventDefault();
            if (e.shiftKey) {
              const prev = this.activeTabIndex > 0 ? this.activeTabIndex - 1 : this.tabs.length - 1;
              this.switchTab(prev);
            } else {
              const next = (this.activeTabIndex + 1) % this.tabs.length;
              this.switchTab(next);
            }
            break;
        }
      }
    });
  }

  initResizer() {
    const resizer = document.getElementById('resizer');
    const container = document.querySelector('.editor-container');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    let isResizing = false;

    const onMouseMove = (e) => {
      if (!isResizing) return;
      const containerRect = container.getBoundingClientRect();
      const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (percentage > 20 && percentage < 80) {
        editorPane.style.width = percentage + '%';
        previewPane.style.width = (100 - percentage) + '%';
        editorPane.style.flex = 'none';
        previewPane.style.flex = 'none';
        this.cm.refresh();
      }
    };

    const onMouseUp = () => {
      if (!isResizing) return;
      isResizing = false;
      document.body.classList.remove('is-resizing');
    };

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;
      document.body.classList.add('is-resizing');
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  initFindReplace() {
    const findPanel = document.getElementById('find-panel');
    const findInput = document.getElementById('find-input');
    const replaceInput = document.getElementById('replace-input');
    const findCount = document.getElementById('find-count');
    let lastQuery = '';

    const getSearchCursor = () => {
      const query = findInput.value;
      if (!query) return null;
      const caseSensitive = document.getElementById('find-case').checked;
      const useRegex = document.getElementById('find-regex').checked;
      let RegExpCtor = RegExp;
      if (useRegex) {
        try { new RegExpCtor(query); } catch { return null; }
      }
      const cursor = this.cm.getSearchCursor(
        useRegex ? new RegExpCtor(query, caseSensitive ? 'g' : 'gi') : query,
        this.cm.getCursor(),
        { caseFold: !caseSensitive }
      );
      return cursor;
    };

    const updateCount = () => {
      const query = findInput.value;
      if (!query) { findCount.textContent = ''; return; }
      const caseSensitive = document.getElementById('find-case').checked;
      const useRegex = document.getElementById('find-regex').checked;
      const text = this.cm.getValue();
      let count = 0;
      if (useRegex) {
        try {
          const re = new RegExp(query, caseSensitive ? 'g' : 'gi');
          count = (text.match(re) || []).length;
        } catch { count = 0; }
      } else {
        const lower = caseSensitive ? text : text.toLowerCase();
        const q = caseSensitive ? query : query.toLowerCase();
        let pos = 0;
        while ((pos = lower.indexOf(q, pos)) !== -1) { count++; pos += q.length; }
      }
      findCount.textContent = count > 0 ? `${count} 个结果` : '无结果';
    };

    findInput.addEventListener('input', updateCount);
    document.getElementById('find-case').addEventListener('change', updateCount);
    document.getElementById('find-regex').addEventListener('change', updateCount);

    document.getElementById('find-next').addEventListener('click', () => {
      const cursor = getSearchCursor();
      if (cursor && cursor.findNext()) {
        this.cm.setSelection(cursor.from(), cursor.to());
        this.cm.scrollIntoView({ from: cursor.from(), to: cursor.to() }, 100);
      } else if (cursor) {
        const cursor2 = this.cm.getSearchCursor(
          document.getElementById('find-regex').checked
            ? new RegExp(findInput.value, document.getElementById('find-case').checked ? 'g' : 'gi')
            : findInput.value,
          { line: 0, ch: 0 },
          { caseFold: !document.getElementById('find-case').checked }
        );
        if (cursor2.findNext()) {
          this.cm.setSelection(cursor2.from(), cursor2.to());
          this.cm.scrollIntoView({ from: cursor2.from(), to: cursor2.to() }, 100);
        }
      }
    });

    document.getElementById('find-prev').addEventListener('click', () => {
      const query = findInput.value;
      if (!query) return;
      const caseSensitive = document.getElementById('find-case').checked;
      const useRegex = document.getElementById('find-regex').checked;
      const cursor = this.cm.getCursor();
      const text = this.cm.getValue();
      
      const posToOffset = (pos) => {
        const lines = text.split('\n');
        let offset = 0;
        for (let i = 0; i < pos.line; i++) offset += lines[i].length + 1;
        return offset + pos.ch;
      };
      
      const offsetToPos = (offset) => {
        const lines = text.split('\n');
        let remaining = offset;
        for (let i = 0; i < lines.length; i++) {
          if (remaining <= lines[i].length) {
            return { line: i, ch: remaining };
          }
          remaining -= lines[i].length + 1;
        }
        return { line: lines.length - 1, ch: 0 };
      };
      
      const currentOffset = posToOffset(cursor);
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = useRegex 
        ? new RegExp(query, flags)
        : new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      
      let lastMatch = null;
      let m;
      while ((m = regex.exec(text)) !== null) {
        if (m.index + m[0].length < currentOffset) {
          lastMatch = { from: offsetToPos(m.index), to: offsetToPos(m.index + m[0].length) };
        }
        if (regex.lastIndex === m.index) { regex.lastIndex++; }
      }
      
      if (lastMatch) {
        this.cm.setSelection(lastMatch.from, lastMatch.to);
        this.cm.scrollIntoView({ from: lastMatch.from, to: lastMatch.to }, 100);
      }
    });

    document.getElementById('replace-one').addEventListener('click', () => {
      if (this.cm.somethingSelected()) {
        this.cm.replaceSelection(replaceInput.value);
      }
      document.getElementById('find-next').click();
    });

    document.getElementById('replace-all').addEventListener('click', () => {
      const query = findInput.value;
      const replacement = replaceInput.value;
      if (!query) return;
      const caseSensitive = document.getElementById('find-case').checked;
      const useRegex = document.getElementById('find-regex').checked;

      if (useRegex) {
        const re = new RegExp(query, caseSensitive ? 'g' : 'gi');
        this.cm.setValue(this.cm.getValue().replace(re, replacement));
      } else {
        const text = this.cm.getValue();
        if (caseSensitive) {
          this.cm.setValue(text.split(query).join(replacement));
        } else {
          const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          this.cm.setValue(text.replace(re, replacement));
        }
      }
    });

    document.getElementById('find-close').addEventListener('click', () => this.closeFindPanel());

    findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('find-next').click();
      }
      if (e.key === 'Escape') this.closeFindPanel();
    });

    replaceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('replace-one').click();
      }
      if (e.key === 'Escape') this.closeFindPanel();
    });

    this.initPreviewFind();
  }

  initPreviewFind() {
    const previewFindInput = document.getElementById('preview-find-input');
    const previewFindCount = document.getElementById('preview-find-count');
    this.previewSelections = [];
    this.previewSelectionIndex = -1;

    const updatePreviewCount = () => {
      const query = previewFindInput.value;
      if (!query) { previewFindCount.textContent = ''; this.clearPreviewHighlight(); return; }
      const caseSensitive = document.getElementById('preview-find-case').checked;
      const useRegex = document.getElementById('preview-find-regex').checked;
      const text = this.preview.textContent;
      let count = 0;
      if (useRegex) {
        try {
          const re = new RegExp(query, caseSensitive ? 'g' : 'gi');
          count = (text.match(re) || []).length;
        } catch { count = 0; }
      } else {
        const lower = caseSensitive ? text : text.toLowerCase();
        const q = caseSensitive ? query : query.toLowerCase();
        let pos = 0;
        while ((pos = lower.indexOf(q, pos)) !== -1) { count++; pos += q.length; }
      }
      previewFindCount.textContent = count > 0 ? `${count} 个结果` : '无结果';
    };

    const doPreviewFind = (reverse = false) => {
      const query = previewFindInput.value;
      if (!query) return;
      const caseSensitive = document.getElementById('preview-find-case').checked;
      const useRegex = document.getElementById('preview-find-regex').checked;

      const text = this.preview.textContent;
      let matches = [];
      
      if (useRegex) {
        try {
          const regex = new RegExp(query, caseSensitive ? 'g' : 'gi');
          let m;
          while ((m = regex.exec(text)) !== null) {
            matches.push({ start: m.index, end: m.index + m[0].length });
            if (matches.length > 10000) break;
          }
        } catch { return; }
      } else {
        const flags = caseSensitive ? 'g' : 'gi';
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedQuery, flags);
        let m;
        while ((m = regex.exec(text)) !== null) {
          matches.push({ start: m.index, end: m.index + m[0].length });
          if (matches.length > 10000) break;
        }
      }

      if (matches.length === 0) return;

      let currentPos = 0;
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preRange = document.createRange();
        preRange.selectNodeContents(this.preview);
        preRange.setEnd(range.endContainer, range.endOffset);
        currentPos = preRange.toString().length;
      }

      let targetMatch;
      if (reverse) {
        let found = false;
        for (let i = matches.length - 1; i >= 0; i--) {
          if (matches[i].end < currentPos) { targetMatch = matches[i]; found = true; break; }
        }
        if (!found) targetMatch = matches[matches.length - 1];
      } else {
        let found = false;
        for (let i = 0; i < matches.length; i++) {
          if (matches[i].start >= currentPos) { targetMatch = matches[i]; found = true; break; }
        }
        if (!found) targetMatch = matches[0];
      }

      this.highlightPreviewMatch(targetMatch);
    };

    this.highlightPreviewMatch = (target) => {
      const walker = document.createTreeWalker(this.preview, NodeFilter.SHOW_TEXT, null, false);
      let node;
      let charCount = 0;
      while (node = walker.nextNode()) {
        const nodeLen = node.nodeValue.length;
        if (charCount + nodeLen > target.start) {
          const startOffset = target.start - charCount;
          const endOffset = target.end - charCount;
          const range = document.createRange();
          range.setStart(node, startOffset);
          range.setEnd(node, endOffset);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          range.startContainer.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        charCount += nodeLen;
      }
    };

    this.clearPreviewHighlight = () => {
      window.getSelection().removeAllRanges();
    };

    previewFindInput.addEventListener('input', updatePreviewCount);
    document.getElementById('preview-find-case').addEventListener('change', updatePreviewCount);
    document.getElementById('preview-find-regex').addEventListener('change', updatePreviewCount);

    document.getElementById('preview-find-next').addEventListener('click', () => doPreviewFind(false));
    document.getElementById('preview-find-prev').addEventListener('click', () => doPreviewFind(true));
    document.getElementById('preview-find-close').addEventListener('click', () => {
      document.getElementById('preview-find-panel').classList.add('hidden');
      this.clearPreviewHighlight();
    });

    previewFindInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doPreviewFind(e.shiftKey);
      }
      if (e.key === 'Escape') {
        document.getElementById('preview-find-panel').classList.add('hidden');
        this.clearPreviewHighlight();
      }
    });
  }

  toggleFindPanel(replaceMode = false) {
    if (this.viewMode === 'preview') {
      const panel = document.getElementById('preview-find-panel');
      const isHidden = panel.classList.contains('hidden');
      document.getElementById('find-panel').classList.add('hidden');
      panel.classList.toggle('hidden');
      if (isHidden) {
        const input = document.getElementById('preview-find-input');
        const selection = window.getSelection();
        if (selection.toString()) {
          input.value = selection.toString();
        }
        input.focus();
        input.select();
      }
    } else {
      const panel = document.getElementById('find-panel');
      const isHidden = panel.classList.contains('hidden');
      document.getElementById('preview-find-panel').classList.add('hidden');
      panel.classList.toggle('hidden');
      if (isHidden) {
        const input = document.getElementById('find-input');
        if (this.cm.somethingSelected()) {
          input.value = this.cm.getSelection();
        }
        input.focus();
        input.select();
      }
    }
  }

  closeFindPanel() {
    document.getElementById('find-panel').classList.add('hidden');
    document.getElementById('preview-find-panel').classList.add('hidden');
    this.clearPreviewHighlight();
    if (this.viewMode === 'edit') {
      this.cm.focus();
    }
  }

  initScrollTopBtn() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    this.preview.addEventListener('scroll', () => {
      if (this.preview.scrollTop > 200) {
        scrollTopBtn.classList.remove('hidden');
      } else {
        scrollTopBtn.classList.add('hidden');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      this.preview.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  showSaveDialog(title, message) {
    return new Promise((resolve) => {
      const dialog = document.getElementById('save-dialog');
      document.getElementById('save-dialog-title').textContent = title;
      document.getElementById('save-dialog-message').textContent = message;
      dialog.classList.remove('hidden');

      const onSave = async () => {
        cleanup();
        await this.saveFile();
        resolve('save');
      };
      const onDiscard = () => {
        cleanup();
        resolve('discard');
      };
      const onCancel = () => {
        cleanup();
        resolve('cancel');
      };
      const cleanup = () => {
        dialog.classList.add('hidden');
        document.getElementById('save-dialog-save').removeEventListener('click', onSave);
        document.getElementById('save-dialog-discard').removeEventListener('click', onDiscard);
        document.getElementById('save-dialog-cancel').removeEventListener('click', onCancel);
      };

      document.getElementById('save-dialog-save').addEventListener('click', onSave);
      document.getElementById('save-dialog-discard').addEventListener('click', onDiscard);
      document.getElementById('save-dialog-cancel').addEventListener('click', onCancel);
    });
  }

  async newFile() {
    if (this.activeTab.isModified) {
      const result = await this.showSaveDialog('保存更改', `${this.activeTab.name} 已修改，是否保存？`);
      if (result === 'cancel') return;
    }
    this.setViewMode('edit');
    this.addTab('未命名', '', null);
    this.setStatus('新文件已创建');
  }

  async openFile() {
    try {
      const selected = await dialogOpen({
        multiple: true,
        filters: [
          { name: 'Markdown', extensions: ['md', 'markdown', 'txt'] },
          { name: '所有文件', extensions: ['*'] }
        ]
      });

      if (!selected) return;
      const files = Array.isArray(selected) ? selected : [selected];
      let openedCount = 0;

      for (const filePath of files) {
        const existingIndex = this.tabs.findIndex(t => t.filePath === filePath);
        if (existingIndex !== -1) {
          this.switchTab(existingIndex);
          continue;
        }
        const content = await invoke('read_file', { path: filePath });
        const name = filePath.split(/[/\\]/).pop();
        this.addTab(name, content, filePath);
        openedCount++;
      }
      this.viewMode = 'preview';
      this.applyViewMode();
      this.setStatus(openedCount > 0 ? `已打开 ${openedCount} 个文件` : '文件已在打开中');
    } catch (error) {
      this.setStatus(`打开失败: ${error}`);
    }
  }

  async saveFile() {
    try {
      if (!this.activeTab.filePath) {
        const path = await dialogSave({
          filters: [
            { name: 'Markdown', extensions: ['md'] },
            { name: '所有文件', extensions: ['*'] }
          ]
        });
        if (!path) return;
        this.activeTab.filePath = path;
        this.activeTab.name = path.split(/[/\\]/).pop();
      }

      await invoke('write_file', { path: this.activeTab.filePath, content: this.activeTab.content });
      this.activeTab.savedContent = this.activeTab.content;
      this.updateTabDisplay();
      this.setStatus(`已保存: ${this.activeTab.filePath}`);
    } catch (error) {
      this.setStatus(`保存失败: ${error}`);
    }
  }

  async saveAsFile() {
    try {
      const path = await dialogSave({
        defaultPath: this.activeTab.filePath || `${this.activeTab.name}`,
        filters: [
          { name: 'Markdown', extensions: ['md'] },
          { name: '所有文件', extensions: ['*'] }
        ]
      });
      if (!path) return;

      await invoke('write_file', { path, content: this.activeTab.content });
      this.activeTab.filePath = path;
      this.activeTab.name = path.split(/[/\\]/).pop();
      this.activeTab.savedContent = this.activeTab.content;
      this.updateTabBar();
      this.setStatus(`已另存为: ${path}`);
    } catch (error) {
      this.setStatus(`保存失败: ${error}`);
    }
  }

  async exportHTML() {
    try {
      const path = await dialogSave({
        defaultPath: this.activeTab.filePath
          ? this.activeTab.filePath.replace(/\.md$/, '.html')
          : 'export.html',
        filters: [{ name: 'HTML', extensions: ['html'] }]
      });
      if (!path) return;

      const htmlContent = await invoke('render_markdown', { content: this.activeTab.content });
      const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${this.activeTab.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 860px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #333; }
    h1,h2,h3,h4,h5,h6 { margin-top: 24px; margin-bottom: 16px; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    code { padding: 2px 6px; background: #f4f4f4; border-radius: 3px; font-size: 0.9em; }
    pre { padding: 16px; background: #f6f8fa; border-radius: 6px; overflow-x: auto; }
    pre code { padding: 0; background: none; }
    blockquote { padding: 8px 16px; border-left: 4px solid #0078d4; background: #f9f9f9; margin: 0 0 16px 0; color: #555; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
    th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
    th { background: #f6f8fa; }
    img { max-width: 100%; }
    hr { border: none; border-top: 1px solid #eee; margin: 24px 0; }
    a { color: #0078d4; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

      await invoke('write_file', { path, content: fullHTML });
      this.setStatus(`已导出 HTML: ${path}`);
    } catch (error) {
      this.setStatus(`导出失败: ${error}`);
    }
  }

  async exportPDF() {
    try {
      const htmlContent = await invoke('render_markdown', { content: this.activeTab.content });
      const printHTML = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>${this.activeTab.name}</title>
<style>
  body { font-family: "Microsoft YaHei", sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.8; color: #333; font-size: 14px; }
  h1 { font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
  h2 { font-size: 20px; }
  h3 { font-size: 16px; }
  code { padding: 1px 4px; background: #f4f4f4; border-radius: 2px; font-size: 13px; }
  pre { padding: 12px; background: #f6f8fa; border-radius: 4px; overflow-x: auto; font-size: 13px; }
  pre code { background: none; padding: 0; }
  blockquote { padding: 6px 12px; border-left: 3px solid #0078d4; background: #f9f9f9; margin: 0 0 12px 0; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 6px 10px; border: 1px solid #ddd; }
  th { background: #f6f8fa; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid #eee; margin: 16px 0; }
  @media print { body { padding: 0; } }
</style>
</head><body>${htmlContent}</body></html>`;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(printHTML);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
      
      this.setStatus('PDF 导出: 请在打印对话框中选择"另存为 PDF"');
    } catch (error) {
      this.setStatus(`导出失败: ${error}`);
    }
  }

  debounceUpdatePreview() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updatePreview(), 150);
  }

  async updatePreview() {
    try {
      const html = await invoke('render_markdown', { content: this.activeTab.content });
      this.preview.innerHTML = html;
    } catch (error) {
      this.preview.innerHTML = `<p style="color: red;">预览错误: ${error}</p>`;
    }
  }

  setStatus(text) {
    this.statusText.textContent = text;
    setTimeout(() => {
      if (this.statusText.textContent === text) {
        this.statusText.textContent = '就绪';
      }
    }, 3000);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();
    this.setStatus(`已切换到${this.isDark ? '深色' : '浅色'}主题`);
  }

  updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (this.isDark) {
      icon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
    } else {
      icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
    }
  }

  loadTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDark = prefersDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDark = e.matches;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
      this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
      this.updateThemeIcon();
    });
  }

  setViewMode(mode) {
    if (this.viewMode === mode) return;
    
    if (mode === 'preview') {
      document.getElementById('find-panel').classList.add('hidden');
    } else {
      document.getElementById('preview-find-panel').classList.add('hidden');
      this.clearPreviewHighlight();
    }
    
    this.viewMode = mode;
    this.applyViewMode();
  }

  applyViewMode() {
    const container = document.querySelector('.editor-container');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    const btnPreview = document.getElementById('btn-view-preview');
    const btnEdit = document.getElementById('btn-view-edit');
    const sideLeft = document.getElementById('btn-side-left');
    const sideRight = document.getElementById('btn-side-right');

    editorPane.style.flex = '';
    editorPane.style.width = '';
    previewPane.style.flex = '';
    previewPane.style.width = '';

    container.classList.remove('preview-mode', 'editor-collapsed', 'preview-collapsed');

    btnPreview.classList.toggle('active', this.viewMode === 'preview');
    btnEdit.classList.toggle('active', this.viewMode === 'edit');

    if (this.viewMode === 'preview') {
      container.classList.add('preview-mode');
      sideLeft.classList.add('side-hidden');
      sideRight.classList.add('side-hidden');
    } else {
      sideLeft.classList.remove('side-hidden', 'side-active');
      sideLeft.innerHTML = '&#9664;';
      sideLeft.title = '折叠编辑器';
      sideRight.classList.remove('side-hidden', 'side-active');
      sideRight.innerHTML = '&#9654;';
      sideRight.title = '折叠预览';
    }

    setTimeout(() => this.cm.refresh(), 50);
  }

  toggleCollapse(pane) {
    const container = document.querySelector('.editor-container');
    if (this.viewMode === 'preview') return;

    const sideLeft = document.getElementById('btn-side-left');
    const sideRight = document.getElementById('btn-side-right');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');

    editorPane.style.flex = '';
    editorPane.style.width = '';
    previewPane.style.flex = '';
    previewPane.style.width = '';

    if (pane === 'editor') {
      container.classList.toggle('editor-collapsed');
      const isCollapsed = container.classList.contains('editor-collapsed');
      sideLeft.innerHTML = isCollapsed ? '&#9654;' : '&#9664;';
      sideLeft.title = isCollapsed ? '恢复编辑器' : '折叠编辑器';
      sideLeft.classList.toggle('side-active', isCollapsed);
      sideRight.classList.toggle('side-hidden', isCollapsed);
    } else {
      container.classList.toggle('preview-collapsed');
      const isCollapsed = container.classList.contains('preview-collapsed');
      sideRight.innerHTML = isCollapsed ? '&#9664;' : '&#9654;';
      sideRight.title = isCollapsed ? '恢复预览' : '折叠预览';
      sideRight.classList.toggle('side-active', isCollapsed);
      sideLeft.classList.toggle('side-hidden', isCollapsed);
    }

    const refresh = () => this.cm.refresh();
    requestAnimationFrame(() => {
      refresh();
      requestAnimationFrame(refresh);
    });
  }

  showAbout() {
    const dialog = document.getElementById('about-dialog');
    dialog.classList.remove('hidden');
    
    // 点击对话框外部关闭
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        this.hideAbout();
      }
    });
  }

  hideAbout() {
    document.getElementById('about-dialog').classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.editor = new MarkdownEditor();
});
