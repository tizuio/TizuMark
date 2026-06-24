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

    this.settings = this.loadSettings();
    this.shortcuts = this.loadShortcuts();
    this.recordingAction = null;

    this.preview = document.getElementById('preview');
    this.statusText = document.getElementById('status-text');
    this.cursorPosition = document.getElementById('cursor-position');
    this.wordCountEl = document.getElementById('word-count');
    this.charCountEl = document.getElementById('char-count');
    this.lineCountEl = document.getElementById('line-count');

    this.initEditor();
    this.applyShortcuts();
    this.initEventListeners();
    this.initResizer();
    this.initFindReplace();
    this.initScrollTopBtn();
    this.initExternalLinks();
    this.initDragDrop();
    this.initSettings();
    this.initShortcutsDialog();
    this.initOutline();
    this.initContextMenu();
    this.initInsertMenu();
    this.loadTheme();
    this.updatePreview();
    this.applyViewMode();
    this.updateMaximizeIcon();
    this.updateWordCount();
    this.updateSideButtons();
  }

  loadSettings() {
    const defaults = {
      fontSize: 14,
      tabSize: 2,
      lineWrap: true,
      lineNumbers: true,
      previewFontSize: 16,
      lineHeight: 1.7,
      maxWidth: 0,
      themeMode: 'light',
      defaultView: 'preview',
      scrollSync: true,
      language: 'zh',
    };
    try {
      const saved = JSON.parse(localStorage.getItem('markflow-settings'));
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  }

  saveSettings() {
    localStorage.setItem('markflow-settings', JSON.stringify(this.settings));
  }

  initSettings() {
    document.getElementById('btn-settings').addEventListener('click', () => this.showSettings());
    document.getElementById('settings-close-btn').addEventListener('click', () => this.hideSettings());
    document.getElementById('settings-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'settings-dialog') this.hideSettings();
    });
    document.getElementById('settings-reset').addEventListener('click', () => this.resetSettings());

    const s = this.settings;
    document.getElementById('set-font-size').value = s.fontSize;
    document.getElementById('set-tab-size').value = s.tabSize;
    document.getElementById('set-line-wrap').checked = s.lineWrap;
    document.getElementById('set-line-numbers').checked = s.lineNumbers;
    document.getElementById('set-preview-font-size').value = s.previewFontSize;
    document.getElementById('set-line-height').value = s.lineHeight;
    document.getElementById('set-max-width').value = s.maxWidth;
    document.getElementById('set-theme-mode').value = s.themeMode;
    document.getElementById('set-default-view').value = s.defaultView;
    document.getElementById('set-scroll-sync').checked = s.scrollSync;
    document.getElementById('set-language').value = s.language || 'zh';

    document.getElementById('set-font-size').addEventListener('change', (e) => {
      this.settings.fontSize = Number(e.target.value);
      this.cm.getWrapperElement().style.fontSize = e.target.value + 'px';
      this.cm.refresh();
      this.saveSettings();
    });
    document.getElementById('set-tab-size').addEventListener('change', (e) => {
      this.settings.tabSize = Number(e.target.value);
      this.cm.setOption('tabSize', this.settings.tabSize);
      this.saveSettings();
    });
    document.getElementById('set-line-wrap').addEventListener('change', (e) => {
      this.settings.lineWrap = e.target.checked;
      this.cm.setOption('lineWrapping', this.settings.lineWrap);
      this.saveSettings();
    });
    document.getElementById('set-line-numbers').addEventListener('change', (e) => {
      this.settings.lineNumbers = e.target.checked;
      this.cm.setOption('lineNumbers', this.settings.lineNumbers);
      this.saveSettings();
    });
    document.getElementById('set-preview-font-size').addEventListener('change', (e) => {
      this.settings.previewFontSize = Number(e.target.value);
      this.preview.style.fontSize = e.target.value + 'px';
      this.saveSettings();
    });
    document.getElementById('set-line-height').addEventListener('change', (e) => {
      this.settings.lineHeight = Number(e.target.value);
      this.preview.style.lineHeight = String(e.target.value);
      this.saveSettings();
    });
    document.getElementById('set-max-width').addEventListener('change', (e) => {
      this.settings.maxWidth = Number(e.target.value);
      if (this.settings.maxWidth) {
        this.preview.style.maxWidth = this.settings.maxWidth + 'px';
        this.preview.style.margin = '0 auto';
        this.preview.classList.add('max-width-active');
      } else {
        this.preview.style.maxWidth = '';
        this.preview.style.margin = '';
        this.preview.classList.remove('max-width-active');
      }
      this.saveSettings();
    });
    document.getElementById('set-theme-mode').addEventListener('change', (e) => {
      this.settings.themeMode = e.target.value;
      this.applyThemeMode();
      this.saveSettings();
    });
    document.getElementById('set-default-view').addEventListener('change', (e) => {
      this.settings.defaultView = e.target.value;
      this.saveSettings();
    });
    document.getElementById('set-scroll-sync').addEventListener('change', (e) => {
      this.settings.scrollSync = e.target.checked;
      this.saveSettings();
    });
    document.getElementById('set-language').addEventListener('change', (e) => {
      this.settings.language = e.target.value;
      this.saveSettings();
    });

    this.applySettings();
  }

  initOutline() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const outlineClose = document.getElementById('outline-close');

    outlineClose.addEventListener('click', () => {
      outlineSidebar.classList.add('hidden');
      this.updateOutlineCheck();
      this.updateSideButtons();
    });
  }

  updateSideButtons() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const sideLeft = document.getElementById('btn-side-left');
    const sideRight = document.getElementById('btn-side-right');
    const outlineWidth = outlineSidebar.classList.contains('hidden') ? 0 : 240;
    sideLeft.style.left = outlineWidth + 'px';
    sideRight.style.left = '';
  }

  toggleOutline() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    outlineSidebar.classList.toggle('hidden');
    this.updateOutlineCheck();
    if (!outlineSidebar.classList.contains('hidden')) {
      this.updateOutline();
    }
    this.updateSideButtons();
  }

  updateOutlineCheck() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const checkItem = document.getElementById('btn-outline-toggle');
    if (outlineSidebar.classList.contains('hidden')) {
      checkItem.classList.remove('checked');
    } else {
      checkItem.classList.add('checked');
    }
  }

  updateOutline() {
    const content = this.activeTab.content;
    const outlineContent = document.getElementById('outline-content');
    const lines = content.split('\n');
    const headings = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trimStart().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[*`~\[\]]/g, '').trim();
        const id = this.headingToId(text);
        headings.push({ level, text, id, line: i });
      }
    }

    if (headings.length === 0) {
      outlineContent.innerHTML = '<div class="outline-empty">暂无标题</div>';
      return;
    }

    outlineContent.innerHTML = headings.map(h =>
      `<div class="outline-item level-${h.level}" data-id="${h.id}" data-line="${h.line}">${this.escapeHtml(h.text)}</div>`
    ).join('');

    outlineContent.querySelectorAll('.outline-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const target = this.preview.querySelector(`#${CSS.escape(id)}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        outlineContent.querySelectorAll('.outline-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  headingToId(text) {
    let id = '';
    for (const ch of text) {
      if (ch >= '\u4e00' && ch <= '\u9fa5') {
        id += ch;
      } else if (/[a-zA-Z0-9]/.test(ch)) {
        id += ch.toLowerCase();
      } else if (ch === ' ' || ch === '-' || ch === '_') {
        id += '-';
      }
    }
    return id.replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  applySettings() {
    const s = this.settings;
    this.cm.getWrapperElement().style.fontSize = s.fontSize + 'px';
    this.cm.setOption('tabSize', s.tabSize);
    this.cm.setOption('lineWrapping', s.lineWrap);
    this.cm.setOption('lineNumbers', s.lineNumbers);
    this.preview.style.fontSize = s.previewFontSize + 'px';
    this.preview.style.lineHeight = String(s.lineHeight);
    if (s.maxWidth) {
      this.preview.style.maxWidth = s.maxWidth + 'px';
      this.preview.style.margin = '0 auto';
      this.preview.classList.add('max-width-active');
    } else {
      this.preview.style.maxWidth = '';
      this.preview.style.margin = '';
      this.preview.classList.remove('max-width-active');
    }
    this.applyThemeMode();
  }

  applyThemeMode() {
    const mode = this.settings.themeMode;
    if (mode === 'light') {
      this.isDark = false;
    } else if (mode === 'dark') {
      this.isDark = true;
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();
    const highlightTheme = document.getElementById('highlight-theme');
    if (highlightTheme) {
      highlightTheme.href = this.isDark
        ? 'lib/highlight.js/github-dark.min.css'
        : 'lib/highlight.js/github.min.css';
    }
    this.rerenderMermaid();
  }

  rerenderMermaid() {
    if (typeof mermaid === 'undefined') return;
    const containers = this.preview.querySelectorAll('.mermaid-container');
    if (containers.length === 0) return;
    containers.forEach(container => {
      const code = container.getAttribute('data-code') || container.textContent;
      container.setAttribute('data-code', code);
      container.innerHTML = '';
      container.textContent = code;
    });
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: this.isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      });
      mermaid.run({ nodes: containers });
    } catch (e) {
      console.warn('Mermaid re-render error:', e);
    }
  }

  showSettings() {
    document.getElementById('settings-dialog').classList.remove('hidden');
  }

  hideSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
  }

  resetSettings() {
    const defaults = {
      fontSize: 14,
      tabSize: 2,
      lineWrap: true,
      lineNumbers: true,
      previewFontSize: 16,
      lineHeight: 1.7,
      maxWidth: 0,
      themeMode: 'light',
      defaultView: 'preview',
      scrollSync: true,
      language: 'zh',
    };
    this.settings = defaults;
    localStorage.removeItem('markflow-settings');

    document.getElementById('set-font-size').value = defaults.fontSize;
    document.getElementById('set-tab-size').value = defaults.tabSize;
    document.getElementById('set-line-wrap').checked = defaults.lineWrap;
    document.getElementById('set-line-numbers').checked = defaults.lineNumbers;
    document.getElementById('set-preview-font-size').value = defaults.previewFontSize;
    document.getElementById('set-line-height').value = defaults.lineHeight;
    document.getElementById('set-max-width').value = defaults.maxWidth;
    document.getElementById('set-theme-mode').value = defaults.themeMode;
    document.getElementById('set-default-view').value = defaults.defaultView;
    document.getElementById('set-scroll-sync').checked = defaults.scrollSync;
    document.getElementById('set-language').value = defaults.language;

    this.applySettings();
    this.setStatus('已恢复默认设置');
  }

  getDefaultShortcuts() {
    return {
      newFile: { key: 'Ctrl+N', label: '新建' },
      openFile: { key: 'Ctrl+O', label: '打开' },
      saveFile: { key: 'Ctrl+S', label: '保存' },
      closeTab: { key: 'Ctrl+W', label: '关闭标签页' },
      find: { key: 'Ctrl+F', label: '查找' },
      findReplace: { key: 'Ctrl+H', label: '查找和替换' },
      nextTab: { key: 'Ctrl+Tab', label: '下一个标签页' },
      prevTab: { key: 'Ctrl+Shift+Tab', label: '上一个标签页' },
    };
  }

  loadShortcuts() {
    const defaults = this.getDefaultShortcuts();
    try {
      const saved = JSON.parse(localStorage.getItem('markflow-shortcuts'));
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  }

  saveShortcuts() {
    localStorage.setItem('markflow-shortcuts', JSON.stringify(this.shortcuts));
  }

  resetShortcuts() {
    this.shortcuts = this.getDefaultShortcuts();
    localStorage.removeItem('markflow-shortcuts');
    this.renderShortcutsList();
    this.applyShortcuts();
    this.setStatus('已恢复默认快捷键');
  }

  formatShortcutDisplay(key) {
    if (!key) return '无';
    return key.split('+').map(k => `<kbd>${k}</kbd>`).join('<span class="key-separator">+</span>');
  }

  renderShortcutsList() {
    const container = document.getElementById('shortcuts-list');
    const actions = [
      { id: 'newFile', label: '新建文件' },
      { id: 'openFile', label: '打开文件' },
      { id: 'saveFile', label: '保存文件' },
      { id: 'closeTab', label: '关闭标签页' },
      { id: 'find', label: '查找' },
      { id: 'findReplace', label: '查找和替换' },
      { id: 'nextTab', label: '下一个标签页' },
      { id: 'prevTab', label: '上一个标签页' },
    ];

    container.innerHTML = actions.map(action => {
      const shortcut = this.shortcuts[action.id];
      const isRecording = this.recordingAction === action.id;
      return `
        <div class="shortcut-row" data-action="${action.id}">
          <span class="shortcut-label">${action.label}</span>
          <div class="shortcut-actions">
            <div class="shortcut-key">${this.formatShortcutDisplay(shortcut.key)}</div>
            <button class="shortcut-record-btn${isRecording ? ' recording' : ''}" data-action="${action.id}">${isRecording ? '按下快捷键...' : '修改'}</button>
            <button class="shortcut-clear-btn" data-action="${action.id}">清除</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.shortcut-record-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.startRecording(action);
      });
    });

    container.querySelectorAll('.shortcut-clear-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.shortcuts[action].key = '';
        this.saveShortcuts();
        this.renderShortcutsList();
        this.applyShortcuts();
      });
    });
  }

  startRecording(action) {
    this.recordingAction = action;
    this.renderShortcutsList();
  }

  handleShortcutRecording(e) {
    if (!this.recordingAction) return false;

    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'Escape') {
      this.recordingAction = null;
      this.renderShortcutsList();
      return true;
    }

    if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return true;

    const parts = [];
    if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
    if (e.shiftKey) parts.push('Shift');
    if (e.altKey) parts.push('Alt');
    parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);

    const keyStr = parts.join('+');
    this.shortcuts[this.recordingAction].key = keyStr;
    this.recordingAction = null;
    this.saveShortcuts();
    this.renderShortcutsList();
    this.applyShortcuts();
    return true;
  }

  initShortcutsDialog() {
    document.getElementById('btn-shortcuts').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.showShortcutsDialog();
    });
    document.getElementById('shortcuts-close').addEventListener('click', () => this.hideShortcutsDialog());
    document.getElementById('shortcuts-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'shortcuts-dialog') this.hideShortcutsDialog();
    });
    document.getElementById('shortcuts-reset').addEventListener('click', () => this.resetShortcuts());
    document.getElementById('shortcuts-save-btn').addEventListener('click', () => this.hideShortcutsDialog());
  }

  showShortcutsDialog() {
    this.recordingAction = null;
    this.renderShortcutsList();
    document.getElementById('shortcuts-dialog').classList.remove('hidden');
  }

  hideShortcutsDialog() {
    this.recordingAction = null;
    document.getElementById('shortcuts-dialog').classList.add('hidden');
  }

  applyShortcuts() {
    const s = this.shortcuts;
    this.cm.setOption('extraKeys', {
      'Enter': 'newlineAndIndentContinueMarkdownList',
      'Tab': (cm) => {
        if (cm.somethingSelected()) {
          cm.indentSelection('add');
        } else {
          cm.replaceSelection('  ', 'end');
        }
      },
      'Shift-Tab': (cm) => cm.indentSelection('subtract'),
    });

    const map = {
      saveFile: () => this.saveFile(),
      openFile: () => this.openFile(),
      newFile: () => this.newFile(),
      closeTab: () => this.closeTab(this.activeTabIndex),
      find: () => this.toggleFindPanel(),
      findReplace: () => this.toggleFindPanel(true),
    };

    const extraKeys = this.cm.getOption('extraKeys');
    for (const [action, fn] of Object.entries(map)) {
      const key = s[action]?.key;
      if (key) extraKeys[key] = fn;
    }

    if (s.nextTab?.key) {
      const k = s.nextTab.key;
      extraKeys[k] = () => {
        const next = (this.activeTabIndex + 1) % this.tabs.length;
        this.switchTab(next);
      };
    }
    if (s.prevTab?.key) {
      const k = s.prevTab.key;
      extraKeys[k] = () => {
        const prev = this.activeTabIndex > 0 ? this.activeTabIndex - 1 : this.tabs.length - 1;
        this.switchTab(prev);
      };
    }

    this.cm.setOption('extraKeys', extraKeys);
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
      }
    });

    this.cm.on('change', () => {
      this.activeTab.content = this.cm.getValue();
      this.updateTabDisplay();
      this.debounceUpdatePreview();
      this.updateWordCount();
      this.updateOutline();
    });

    this.cm.on('cursorActivity', () => {
      const cursor = this.cm.getCursor();
      this.activeTab.cursorPos = cursor;
      this.cursorPosition.textContent = `行 ${cursor.line + 1}, 列 ${cursor.ch + 1}`;
    });

    this.syncingScroll = false;

    this.cm.on('scroll', () => {
      const info = this.cm.getScrollInfo();
      this.activeTab.scrollPos = { top: info.top, left: info.left };

      if (!this.settings.scrollSync || this.syncingScroll) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;
      this.syncingScroll = true;

      const editorMax = info.height - info.clientHeight || 1;
      const scrollPercent = Math.min(info.top / editorMax, 1);
      const previewMax = this.preview.scrollHeight - this.preview.clientHeight;
      this.preview.scrollTop = scrollPercent * previewMax;

      requestAnimationFrame(() => { this.syncingScroll = false; });
    });

    this.preview.addEventListener('scroll', () => {
      if (!this.settings.scrollSync || this.syncingScroll) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;
      this.syncingScroll = true;

      const previewMax = this.preview.scrollHeight - this.preview.clientHeight || 1;
      const scrollPercent = Math.min(this.preview.scrollTop / previewMax, 1);
      const info = this.cm.getScrollInfo();
      const editorMax = info.height - info.clientHeight;
      this.cm.scrollTo(0, scrollPercent * editorMax);

      requestAnimationFrame(() => { this.syncingScroll = false; });
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
    this.updateWordCount();
    this.updateOutline();
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
    const addBtn = document.getElementById('btn-add-tab');

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
    if (addBtn) tabBar.appendChild(addBtn);
  }

  updateTabDisplay() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, i) => {
      if (i >= this.tabs.length) return;
      tab.className = `tab${i === this.activeTabIndex ? ' active' : ''}${this.tabs[i].isModified ? ' modified' : ''}`;
      tab.querySelector('.tab-name').textContent = this.tabs[i].name;
    });
  }

  initEventListeners() {
    const toolbarDropdowns = [
      { btn: 'btn-file', menu: 'file-menu' },
      { btn: 'btn-view', menu: 'view-menu' },
      { btn: 'btn-help', menu: 'help-menu' },
      { btn: 'btn-insert', menu: 'insert-menu' },
    ];

    let toolbarHideTimer = null;
    let anyToolbarOpen = false;

    toolbarDropdowns.forEach(({ btn, menu }) => {
      const btnEl = document.getElementById(btn);
      const menuEl = document.getElementById(menu);
      const dropdown = btnEl.closest('.dropdown');

      const closeMenu = () => {
        toolbarHideTimer = setTimeout(() => {
          if (!dropdown.matches(':hover') && !document.querySelector('.dropdown:hover')) {
            menuEl.classList.add('hidden');
            anyToolbarOpen = false;
          }
        }, 150);
      };

      const cancelClose = () => {
        clearTimeout(toolbarHideTimer);
      };

      btnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        cancelClose();
        toolbarDropdowns.forEach(d => {
          const m = document.getElementById(d.menu);
          if (d.menu !== menu) m.classList.add('hidden');
        });
        document.getElementById('insert-menu').classList.add('hidden');
        const isOpening = menuEl.classList.contains('hidden');
        menuEl.classList.toggle('hidden');
        anyToolbarOpen = isOpening;
      });

      dropdown.addEventListener('mouseenter', () => {
        cancelClose();
        if (anyToolbarOpen && menuEl.classList.contains('hidden')) {
          toolbarDropdowns.forEach(d => {
            document.getElementById(d.menu).classList.add('hidden');
          });
          document.getElementById('insert-menu').classList.add('hidden');
          menuEl.classList.remove('hidden');
        }
      });

      dropdown.addEventListener('mouseleave', closeMenu);
    });

    document.addEventListener('click', () => {
      toolbarDropdowns.forEach(d => document.getElementById(d.menu).classList.add('hidden'));
      document.querySelectorAll('#insert-menu ~ .dropdown-menu.submenu').forEach(m => m.classList.add('hidden'));
      this.hideAllContextMenus();
    });
    document.getElementById('btn-outline-toggle').addEventListener('click', () => {
      this.toggleOutline();
    });
    document.getElementById('btn-new').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.newFile();
    });
    document.getElementById('btn-open').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.openFile();
    });
    document.getElementById('btn-save').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.saveFile();
    });
    document.getElementById('btn-save-as').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.saveAsFile();
    });
    document.getElementById('btn-export-html').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.exportHTML();
    });
    document.getElementById('btn-export-img').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.exportImage();
    });
    document.getElementById('btn-settings').addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      this.showSettings();
    });
    document.getElementById('btn-theme').addEventListener('click', () => this.toggleTheme());
    document.getElementById('btn-user-guide').addEventListener('click', () => {
      document.getElementById('help-menu').classList.add('hidden');
      this.openUserGuide();
    });
    document.getElementById('btn-about').addEventListener('click', () => {
      document.getElementById('help-menu').classList.add('hidden');
      this.showAbout();
    });
    document.getElementById('btn-add-tab').addEventListener('click', () => this.newFile());
    document.querySelector('.tab-bar-wrapper').addEventListener('dblclick', (e) => {
      if (!e.target.closest('.tab') && !e.target.closest('.tab-add')) {
        this.newFile();
      }
    });
    document.getElementById('btn-view-preview').addEventListener('click', () => this.setViewMode('preview'));
    document.getElementById('btn-view-edit').addEventListener('click', () => this.setViewMode('edit'));
    document.getElementById('btn-side-left').addEventListener('click', () => this.toggleCollapse('editor'));
    document.getElementById('btn-side-right').addEventListener('click', () => this.toggleCollapse('preview'));
    document.getElementById('about-close').addEventListener('click', () => this.hideAbout());
    document.getElementById('about-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'about-dialog') this.hideAbout();
    });

    document.getElementById('btn-minimize').addEventListener('click', () => this.minimizeWindow());
    document.getElementById('btn-maximize').addEventListener('click', () => this.toggleMaximize());
    document.getElementById('btn-close').addEventListener('click', () => this.closeWindow());

    window.addEventListener('resize', () => {
      this.updateMaximizeIcon();
      this.updateSideButtons();
    });

    document.addEventListener('keydown', async (e) => {
      if (this.handleShortcutRecording(e)) return;

      if (e.key === 'Escape') {
        const aboutDialog = document.getElementById('about-dialog');
        if (!aboutDialog.classList.contains('hidden')) {
          this.hideAbout();
          return;
        }
        const shortcutsDialog = document.getElementById('shortcuts-dialog');
        if (!shortcutsDialog.classList.contains('hidden')) {
          this.hideShortcutsDialog();
          return;
        }
      }
      
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl) {
        const key = e.key.toLowerCase();
        if (key === 'w') {
          e.preventDefault();
          await this.closeTab(this.activeTabIndex);
        } else if (key === 'tab') {
          e.preventDefault();
          if (e.shiftKey) {
            const prev = this.activeTabIndex > 0 ? this.activeTabIndex - 1 : this.tabs.length - 1;
            this.switchTab(prev);
          } else {
            const next = (this.activeTabIndex + 1) % this.tabs.length;
            this.switchTab(next);
          }
        }
      }
    });
  }

  initResizer() {
    const resizer = document.getElementById('resizer');
    const container = document.querySelector('.editor-container');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    const outlineSidebar = document.getElementById('outline-sidebar');
    let isResizing = false;
    let startX = 0;
    let startEditorWidth = 0;

    const onMouseMove = (e) => {
      if (!isResizing) return;
      const delta = e.clientX - startX;
      const newEditorWidth = startEditorWidth + delta;
      const outlineWidth = outlineSidebar.classList.contains('hidden') ? 0 : outlineSidebar.offsetWidth;
      const resizerWidth = resizer.offsetWidth;
      const totalContentWidth = container.offsetWidth - outlineWidth - resizerWidth;
      const editorPercent = (newEditorWidth / totalContentWidth) * 100;
      if (editorPercent > 20 && editorPercent < 80) {
        const previewWidth = totalContentWidth - newEditorWidth;
        editorPane.style.width = newEditorWidth + 'px';
        previewPane.style.width = previewWidth + 'px';
        editorPane.style.flex = 'none';
        previewPane.style.flex = 'none';
        this.cm.refresh();
        this.updateSideButtons();
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
      startX = e.clientX;
      startEditorWidth = editorPane.getBoundingClientRect().width;
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

  initExternalLinks() {
    this.preview.addEventListener('click', async (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      e.preventDefault();
      e.stopPropagation();

      const href = link.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#')) {
        const target = this.preview.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        window.location.href = href;
        return;
      }

      try {
        if (window.__TAURI__ && window.__TAURI__.shell) {
          await window.__TAURI__.shell.open(href);
        } else {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      } catch (err) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }, true);
  }

  initDragDrop() {
    const app = document.getElementById('app');

    if (window.__TAURI__ && window.__TAURI__.event) {
      window.__TAURI__.event.listen('tauri://drag-enter', (e) => {
        if (e.payload && e.payload.paths && e.payload.paths.length > 0) {
          app.classList.add('drag-over');
        }
      });

      window.__TAURI__.event.listen('tauri://drag-over', (e) => {
        if (e.payload && e.payload.paths && e.payload.paths.length > 0) {
          app.classList.add('drag-over');
        }
      });

      window.__TAURI__.event.listen('tauri://drag-drop', async (event) => {
        app.classList.remove('drag-over');
        const paths = event.payload.paths || [];
        for (const filePath of paths) {
          try {
            const content = await invoke('read_file', { path: filePath });
            const name = filePath.split(/[/\\]/).pop();
            const existingIndex = this.tabs.findIndex(t => t.filePath === filePath);
            if (existingIndex !== -1) {
              this.switchTab(existingIndex);
              continue;
            }
            this.addTab(name, content, filePath);
            this.updateWordCount();
            this.updateOutline();
            this.setStatus(`已打开: ${name}`);
          } catch (err) {
            this.setStatus(`打开失败: ${err}`);
          }
        }
      });

      window.__TAURI__.event.listen('tauri://drag-leave', () => {
        app.classList.remove('drag-over');
      });
    } else {
      app.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes('Files')) {
          app.classList.add('drag-over');
        }
      });

      app.addEventListener('dragleave', (e) => {
        if (!app.contains(e.relatedTarget)) {
          app.classList.remove('drag-over');
        }
      });

      app.addEventListener('drop', async (e) => {
        e.preventDefault();
        app.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        for (const file of files) {
          try {
            const content = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = () => reject(reader.error);
              reader.readAsText(file);
            });
            this.addTab(file.name, content, null);
            this.setStatus(`已打开: ${file.name}`);
          } catch (err) {
            this.setStatus(`打开失败: ${err}`);
          }
        }
      });
    }
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
      this.updateWordCount();
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
      const escapedTitle = this.activeTab.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${escapedTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 860px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #2a2a2e; }
    h1,h2,h3,h4,h5,h6 { margin-top: 24px; margin-bottom: 16px; }
    h1 { font-size: 2em; border-bottom: 1px solid #dbdad9; padding-bottom: 10px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #dbdad9; padding-bottom: 8px; }
    code { padding: 2px 6px; background: #f0efee; border: 1px solid #dbdad9; border-radius: 3px; font-size: 0.9em; }
    pre { padding: 16px; background: #f0efee; border-radius: 6px; overflow-x: auto; }
    pre code { padding: 0; background: none; border: none; }
    blockquote { padding: 8px 16px; border-left: 4px solid #2563eb; background: #f6f5f4; margin: 0 0 16px 0; color: #5e5e62; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
    th, td { padding: 8px 12px; border: 1px solid #dbdad9; text-align: left; }
    th { background: #f0efee; }
    img { max-width: 100%; }
    hr { border: none; border-top: 1px solid #dbdad9; margin: 24px 0; }
    a { color: #2563eb; }
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

  async exportImage() {
    if (typeof html2canvas === 'undefined') {
      this.setStatus('导出失败: html2canvas 未加载');
      return;
    }

    let clone = null;
    try {
      this.setStatus('正在生成长图...');

      clone = this.preview.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '800px';
      clone.style.padding = '32px';
      clone.style.background = this.isDark ? '#1a1b1e' : '#ffffff';
      clone.style.color = this.isDark ? '#d4d4d8' : '#2a2a2e';
      clone.style.overflow = 'visible';
      clone.style.height = 'auto';
      document.body.appendChild(clone);

      const images = clone.querySelectorAll('img');
      const imagePromises = Array.from(images).map(async (img) => {
        const src = img.getAttribute('src');
        if (!src || src.startsWith('data:')) return;

        try {
          const base64 = await invoke('fetch_image_as_base64', { url: src });
          const ext = src.split('.').pop().split('?')[0].toLowerCase();
          let mime = 'image/png';
          if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
          else if (ext === 'gif') mime = 'image/gif';
          else if (ext === 'svg') mime = 'image/svg+xml';
          else if (ext === 'webp') mime = 'image/webp';
          img.src = `data:${mime};base64,${base64}`;
        } catch (e) {
          img.style.border = '1px solid red';
          img.alt = '[图片加载失败]';
        }
      });

      await Promise.all(imagePromises);
      await new Promise(r => setTimeout(r, 300));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: this.isDark ? '#1a1b1e' : '#ffffff',
        width: 800,
        windowWidth: 800
      });

      const imgData = canvas.toDataURL('image/png');

      const result = await dialogSave({
        defaultPath: `${this.activeTab.name.replace(/\.[^.]+$/, '')}.png`,
        filters: [{ name: 'PNG', extensions: ['png'] }]
      });

      if (!result) return;

      const base64 = imgData.split(',')[1];
      const binaryStr = atob(base64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const arr = Array.from(bytes);
      await invoke('write_binary_file', { path: result, contents: arr });

      this.setStatus(`已导出长图: ${result}`);
    } catch (error) {
      this.setStatus(`导出失败: ${error}`);
    } finally {
      if (clone && clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    }
  }

  debounceUpdatePreview() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updatePreview(), 150);
  }

  async updatePreview() {
    try {
      const content = this.activeTab.content;

      const hasToc = content.includes('[TOC]') || content.includes('[toc]');
      let tocHtml = '';
      if (hasToc) {
        tocHtml = await invoke('generate_toc', { content });
      }

      const html = await invoke('render_markdown', { content });

      let finalHtml = html;
      if (tocHtml) {
        finalHtml = finalHtml.replace(/<p>\[TOC\]<\/p>|<p>\[toc\]<\/p>/gi, tocHtml);
      }

      this.preview.innerHTML = finalHtml;

      this.processEmojiShortcodes();
      this.processMathFormulas();
      this.processHeadings();
      this.processMermaid();
      this.addCopyButtons();

      if (typeof hljs !== 'undefined') {
        this.preview.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    } catch (error) {
      const msg = String(error).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.preview.innerHTML = `<p style="color: red;">预览错误: ${msg}</p>`;
    }
  }

  processEmojiShortcodes() {
    const emojiMap = {
      ':smile:': '😄', ':joy:': '😂', ':heart:': '❤️', ':thumbsup:': '👍',
      ':thumbsdown:': '👎', ':clap:': '👏', ':wave:': '👋', ':fire:': '🔥',
      ':star:': '⭐', ':check:': '✅', ':x:': '❌', ':warning:': '⚠️',
      ':memo:': '📝', ':bulb:': '💡', ':info:': 'ℹ️', ':question:': '❓',
      ':exclamation:': '❗', ':ok:': '👌', ':cool:': '😎', ':sad:': '😢',
      ':angry:': '😠', ':love:': '😍', ':laughing:': '😆', ':wink:': '😉',
      ':thinking:': '🤔', ':rocket:': '🚀', ':100:': '💯', ':tada:': '🎉',
      ':trophy:': '🏆', ':eyes:': '👀', ':pray:': '🙏', ':muscle:': '💪',
      ':sparkles:': '✨', ':zap:': '⚡', ':sunny:': '☀️', ':cloud:': '☁️',
      ':rain:': '🌧️', ':snow:': '🌨️', ':coffee:': '☕', ':book:': '📖',
      ':pencil:': '✏️', ':computer:': '💻', ':phone:': '📱', ':email:': '📧',
      ':calendar:': '📅', ':clock:': '⏰', ':gift:': '🎁', ':balloon:': '🎈',
      ':party:': '🎉', ':crown:': '👑', ':gem:': '💎', ':key:': '🔑',
      ':lock:': '🔒', ':bell:': '🔔', ':mag:': '🔍', ':package:': '📦',
      ':earth:': '🌍', ':moon:': '🌙', ':rainbow:': '🌈', ':umbrella:': '☂️',
      ':cyclone:': '🌀', ':ocean:': '🌊', ':seedling:': '🌱', ':tree:': '🌳',
      ':flower:': '🌼', ':rose:': '🌹', ':dog:': '🐕', ':cat:': '🐈',
      ':bear:': '🐻', ':bird:': '🐦', ':fish:': '🐟', ':turtle:': '🐢',
      ':octopus:': '🐙', ':penguin:': '🐧', ':butterfly:': '🦋', ':bee:': '🐝',
      ':art:': '🎨', ':music:': '🎵', ':film:': '🎬', ':camera:': '📷',
      ':lock:': '🔓', ':link:': '🔗', ':scissors:': '✂️', ':pushpin:': '📌'
    };

    const walker = document.createTreeWalker(this.preview, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) textNodes.push(node);

    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      if (!text.includes(':')) return;
      let newText = text;
      for (const [code, emoji] of Object.entries(emojiMap)) {
        if (newText.includes(code)) newText = newText.split(code).join(emoji);
      }
      if (newText !== text) textNode.textContent = newText;
    });
  }

  processMathFormulas() {
    if (typeof renderMathInElement === 'undefined') return;

    try {
      this.renderDisplayMathBlocks();

      renderMathInElement(this.preview, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX rendering error:', e);
    }
  }

  renderDisplayMathBlocks() {
    const walker = document.createTreeWalker(this.preview, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) textNodes.push(node);

    for (const textNode of textNodes) {
      const text = textNode.textContent;
      if (!text.includes('$$')) continue;

      const parts = text.split(/(\$\$[\s\S]*?\$\$)/);
      if (parts.length <= 1) continue;

      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const latex = part.slice(2, -2).trim();
          if (latex) {
            const span = document.createElement('div');
            span.className = 'katex-display';
            try {
              katex.render(latex, span, { displayMode: true, throwOnError: false });
            } catch (e) {
              span.textContent = part;
            }
            fragment.appendChild(span);
          }
        } else if (part) {
          fragment.appendChild(document.createTextNode(part));
        }
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  }

  processHeadings() {
    const idCount = {};
    this.preview.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      if (heading.id) return;
      const text = heading.textContent;
      let id = '';
      for (const ch of text) {
        if (ch >= '\u4e00' && ch <= '\u9fa5') {
          id += ch;
        } else if (/[a-zA-Z0-9]/.test(ch)) {
          id += ch.toLowerCase();
        } else if (ch === ' ' || ch === '-' || ch === '_') {
          id += '-';
        }
      }
      id = id.replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (idCount[id]) {
        idCount[id]++;
        heading.id = id + '-' + idCount[id];
      } else {
        idCount[id] = 1;
        heading.id = id;
      }
    });
  }

  processMermaid() {
    if (typeof mermaid === 'undefined') return;

    this.preview.querySelectorAll('code.language-mermaid').forEach((block, index) => {
      const pre = block.parentElement;
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      const id = 'mermaid-' + Date.now() + '-' + index;
      container.id = id;
      container.setAttribute('data-code', block.textContent);
      container.textContent = block.textContent;
      pre.replaceWith(container);
    });

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: this.isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      });
      mermaid.run({ nodes: this.preview.querySelectorAll('.mermaid-container') });
    } catch (e) {
      console.warn('Mermaid rendering error:', e);
    }
  }

  addCopyButtons() {
    this.preview.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return;
      if (pre.querySelector('code.language-mermaid')) return;

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = '复制';
      btn.title = '复制代码';

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = '已复制';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = '复制';
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          btn.textContent = '已复制';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = '复制';
            btn.classList.remove('copied');
          }, 2000);
        }
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }

  setStatus(text) {
    this.statusText.textContent = text;
    setTimeout(() => {
      if (this.statusText.textContent === text) {
        this.statusText.textContent = '就绪';
      }
    }, 3000);
  }

  updateWordCount() {
    const content = this.activeTab.content;
    const text = content.replace(/[#*`~\[\]()>_|\\-]/g, '').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = content.length;
    const lines = content ? content.split('\n').length : 0;
    this.wordCountEl.textContent = `字数: ${words}`;
    this.charCountEl.textContent = `字符: ${chars}`;
    this.lineCountEl.textContent = `行数: ${lines}`;
  }

  toggleTheme() {
    if (this.settings.themeMode !== 'light' && this.settings.themeMode !== 'dark') {
      this.settings.themeMode = this.isDark ? 'light' : 'dark';
      document.getElementById('set-theme-mode').value = this.settings.themeMode;
    }
    this.isDark = !this.isDark;
    this.settings.themeMode = this.isDark ? 'dark' : 'light';
    document.getElementById('set-theme-mode').value = this.settings.themeMode;
    this.saveSettings();
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();
    
    const highlightTheme = document.getElementById('highlight-theme');
    if (highlightTheme) {
      highlightTheme.href = this.isDark 
        ? 'lib/highlight.js/github-dark.min.css' 
        : 'lib/highlight.js/github.min.css';
    }
    
    this.setStatus(`已切换到${this.isDark ? '深色' : '浅色'}主题`);
  }

  updateThemeIcon() {
    const svg = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (!svg) return;
    if (this.isDark) {
      svg.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
      if (text) text.textContent = '暗黑';
    } else {
      svg.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
      if (text) text.textContent = '明亮';
    }
  }

  loadTheme() {
    this.applyThemeMode();
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.settings.themeMode === 'system') {
        this.applyThemeMode();
      }
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

    setTimeout(() => {
      this.cm.refresh();
      this.updateSideButtons();
    }, 50);
  }

  toggleCollapse(pane) {
    const container = document.querySelector('.editor-container');
    if (this.viewMode === 'preview') return;

    this.syncingScroll = true;

    const sideLeft = document.getElementById('btn-side-left');
    const sideRight = document.getElementById('btn-side-right');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');
    const previewScrollTop = this.preview.scrollTop;

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
    } else {
      container.classList.toggle('preview-collapsed');
      const isCollapsed = container.classList.contains('preview-collapsed');
      sideRight.innerHTML = isCollapsed ? '&#9664;' : '&#9654;';
      sideRight.title = isCollapsed ? '恢复预览' : '折叠预览';
      sideRight.classList.toggle('side-active', isCollapsed);
    }

    this.preview.style.scrollBehavior = 'auto';
    let restored = false;
    const doRefresh = () => {
      if (restored) return;
      restored = true;
      this.cm.refresh();
      this.preview.scrollTop = previewScrollTop;
      this.updateSideButtons();
      requestAnimationFrame(() => {
        this.syncingScroll = false;
        this.preview.style.scrollBehavior = '';
      });
    };
    const targetPane = pane === 'editor' ? editorPane : previewPane;
    targetPane.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'width') doRefresh();
    });
    setTimeout(doRefresh, 400);
  }

  async openUserGuide() {
    const isEn = this.settings.language === 'en';
    const fileName = isEn ? 'guide.en.md' : 'guide.md';
    const tabName = isEn ? 'User Guide.md' : '使用说明.md';
    const existingIndex = this.tabs.findIndex(t => t.name === tabName);
    if (existingIndex !== -1) {
      this.switchTab(existingIndex);
      return;
    }
    try {
      const resp = await fetch(fileName);
      if (!resp.ok) throw new Error(resp.statusText);
      const content = await resp.text();
      const langLink = isEn
        ? '\n\n> [切换中文](#switch-lang)\n'
        : '\n\n> [Switch to English](#switch-lang)\n';
      const fullContent = content + langLink;
      this.addTab(tabName, fullContent, null);
      this.activeTab.savedContent = fullContent;
      this.activeTab.isGuide = true;
      this.updateTabDisplay();
      this.setupGuideLangLink();
      this.setStatus(isEn ? 'Opened User Guide' : '已打开使用说明');
    } catch (error) {
      this.setStatus(isEn ? 'Failed to open guide' : `打开使用说明失败: ${error}`);
    }
  }

  setupGuideLangLink() {
    setTimeout(() => {
      const link = this.preview.querySelector('a[href="#switch-lang"]');
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.switchGuideLang();
        });
      }
    }, 200);
  }

  async switchGuideLang() {
    const currentTab = this.activeTab;
    const isCurrentlyEn = currentTab.name === 'User Guide.md';
    const newFileName = isCurrentlyEn ? 'guide.md' : 'guide.en.md';
    const newTabName = isCurrentlyEn ? '使用说明.md' : 'User Guide.md';
    const newLang = isCurrentlyEn ? 'zh' : 'en';

    try {
      const resp = await fetch(newFileName);
      if (!resp.ok) throw new Error(resp.statusText);
      const content = await resp.text();
      const langLink = newLang === 'en'
        ? '\n\n> [切换中文](#switch-lang)\n'
        : '\n\n> [Switch to English](#switch-lang)\n';
      const fullContent = content + langLink;
      currentTab.name = newTabName;
      currentTab.content = fullContent;
      currentTab.savedContent = fullContent;
      currentTab.filePath = null;
      this.cm.setValue(fullContent);
      this.updateTabDisplay();
      this.updatePreview();
      this.setupGuideLangLink();
      this.setStatus(newLang === 'en' ? 'Switched to English' : '已切换到中文');
    } catch (error) {
      this.setStatus(`切换语言失败: ${error}`);
    }
  }

  showAbout() {
    const dialog = document.getElementById('about-dialog');
    dialog.classList.remove('hidden');
  }

  hideAbout() {
    document.getElementById('about-dialog').classList.add('hidden');
  }

  async minimizeWindow() {
    try {
      const { getCurrentWindow } = window.__TAURI__.window;
      const appWindow = getCurrentWindow();
      await appWindow.minimize();
    } catch (e) {
      console.warn('minimize failed:', e);
    }
  }

  async toggleMaximize() {
    try {
      const { getCurrentWindow } = window.__TAURI__.window;
      const appWindow = getCurrentWindow();
      const isMaximized = await appWindow.isMaximized();
      if (isMaximized) {
        await appWindow.unmaximize();
      } else {
        await appWindow.maximize();
      }
      this.updateMaximizeIcon();
    } catch (e) {
      console.warn('maximize failed:', e);
    }
  }

  async updateMaximizeIcon() {
    try {
      const { getCurrentWindow } = window.__TAURI__.window;
      const appWindow = getCurrentWindow();
      const isMaximized = await appWindow.isMaximized();
      const btn = document.getElementById('btn-maximize');
      if (isMaximized) {
        btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1.2"/><polyline points="2.5,2.5 2.5,0.5 9.5,0.5 9.5,7.5 7.5,7.5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>';
      } else {
        btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>';
      }
    } catch (e) {
      console.warn('updateMaximizeIcon failed:', e);
    }
  }

  async closeWindow() {
    try {
      const { getCurrentWindow } = window.__TAURI__.window;
      const appWindow = getCurrentWindow();
      await appWindow.close();
    } catch (e) {
      console.warn('close failed:', e);
    }
  }

  // ========== Markdown 格式化辅助方法 ==========

  wrapSelection(before, after) {
    const sel = this.cm.getSelection();
    if (sel) {
      this.cm.replaceSelection(before + sel + after);
    } else {
      const cursor = this.cm.getCursor();
      this.cm.replaceRange(before + after, cursor);
      this.cm.setCursor({ line: cursor.line, ch: cursor.ch + before.length });
    }
    this.cm.focus();
  }

  insertAtCursor(text, cursorOffset) {
    const cursor = this.cm.getCursor();
    const prevLine = cursor.line > 0 ? this.cm.getLine(cursor.line - 1) : '';
    const needNewline = cursor.line > 0 && prevLine.trim() !== '';
    const prefix = needNewline ? '\n' : '';
    const addedLines = needNewline ? 1 : 0;
    this.cm.replaceRange(prefix + text, cursor);
    if (cursorOffset !== undefined) {
      this.cm.setCursor({ line: cursor.line + addedLines, ch: cursor.ch + cursorOffset });
    } else {
      this.cm.setCursor({ line: cursor.line + addedLines, ch: cursor.ch + text.length });
    }
    this.cm.focus();
  }

  insertLinePrefix(prefix) {
    const cursor = this.cm.getCursor();
    const line = this.cm.getLine(cursor.line);
    const prevLine = cursor.line > 0 ? this.cm.getLine(cursor.line - 1) : '';
    const needNewline = cursor.line > 0 && prevLine.trim() !== '';
    const newLine = needNewline ? '\n' : '';
    this.cm.replaceRange(newLine + prefix + line, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
    this.cm.setCursor({ line: cursor.line + (needNewline ? 1 : 0), ch: prefix.length + cursor.ch });
    this.cm.focus();
  }

  insertBlock(text, cursorOffset) {
    const cursor = this.cm.getCursor();
    const line = this.cm.getLine(cursor.line);
    const needNewline = line.trim() !== '';
    const prefix = needNewline ? '\n\n' : '';
    const addedLines = needNewline ? 2 : 0;
    this.cm.replaceRange(prefix + text + '\n', cursor);
    if (cursorOffset !== undefined) {
      const before = text.substring(0, cursorOffset);
      const lastNewline = before.lastIndexOf('\n');
      const targetLine = cursor.line + addedLines + (before.split('\n').length - 1);
      const targetCh = lastNewline === -1 ? cursorOffset : (cursorOffset - lastNewline - 1);
      this.cm.setCursor({ line: targetLine, ch: targetCh });
    } else {
      const lines = text.split('\n');
      this.cm.setCursor({ line: cursor.line + addedLines + lines.length - 1, ch: lines[lines.length - 1].length });
    }
    this.cm.focus();
  }

  // ========== 右键菜单 ==========

  initContextMenu() {
    const editorWrapper = document.getElementById('editor-wrapper');
    const previewWrapper = document.getElementById('preview-wrapper');

    editorWrapper.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.copy-btn')) return;
      e.preventDefault();
      this.hideAllContextMenus();
      this.showContextMenu('context-menu-editor', e.clientX, e.clientY);
    });

    previewWrapper.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.copy-btn')) return;
      e.preventDefault();
      this.hideAllContextMenus();
      this.showContextMenu('context-menu-preview', e.clientX, e.clientY);
    });

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.hideAllContextMenus();
        this._contextTabIndex = parseInt(tab.dataset.index);
        this.showContextMenu('context-menu-tab', e.clientX, e.clientY);
      });
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll('.tab').forEach(tab => {
        if (!tab._ctxBound) {
          tab._ctxBound = true;
          tab.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideAllContextMenus();
            this._contextTabIndex = parseInt(tab.dataset.index);
            this.showContextMenu('context-menu-tab', e.clientX, e.clientY);
          });
        }
      });
    });
    observer.observe(document.getElementById('tab-bar'), { childList: true, subtree: true });

    document.addEventListener('click', () => this.hideAllContextMenus());
    document.addEventListener('contextmenu', (e) => {
      if (!e.target.closest('.context-menu') && !e.target.closest('.dropdown-menu') && !e.target.closest('#editor-wrapper') && !e.target.closest('#preview-wrapper') && !e.target.closest('.tab')) {
        this.hideAllContextMenus();
      }
    });

    document.querySelectorAll('.context-menu-item[data-action]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.dataset.action;
        this.hideAllContextMenus();
        this.executeMenuAction(action);
      });
    });

    document.querySelectorAll('.context-submenu-trigger').forEach(trigger => {
      const showSubmenu = () => {
        const parentMenu = trigger.closest('.context-menu');
        const submenuId = trigger.dataset.submenu;
        const submenu = document.getElementById(submenuId);
        if (!submenu) return;

        const ancestors = [];
        let el = parentMenu;
        while (el) {
          if (el.classList && el.classList.contains('context-menu')) {
            ancestors.push(el);
          }
          el = el.parentElement;
        }

        document.querySelectorAll('.context-menu.submenu').forEach(s => {
          if (!ancestors.includes(s) && s !== submenu) {
            s.classList.add('hidden');
          }
        });

        submenu.classList.remove('hidden');
        const parentRect = trigger.getBoundingClientRect();
        submenu.style.left = (parentRect.right - 1) + 'px';
        submenu.style.top = parentRect.top + 'px';

        requestAnimationFrame(() => {
          const subRect = submenu.getBoundingClientRect();
          if (subRect.right > window.innerWidth) {
            submenu.style.left = (parentRect.left - subRect.width + 1) + 'px';
          }
          if (subRect.bottom > window.innerHeight) {
            submenu.style.top = (window.innerHeight - subRect.height - 4) + 'px';
          }
        });
      };

      trigger.addEventListener('mouseenter', showSubmenu);
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const submenuId = trigger.dataset.submenu;
        const submenu = document.getElementById(submenuId);
        if (submenu && submenu.classList.contains('hidden')) {
          showSubmenu();
        }
      });
    });

    let ctxHideTimer = null;

    document.querySelectorAll('.context-menu').forEach(menu => {
      menu.addEventListener('mouseleave', () => {
        clearTimeout(ctxHideTimer);
        ctxHideTimer = setTimeout(() => {
          if (!document.querySelector('.context-menu.submenu:hover') && !document.querySelector('.context-submenu-trigger:hover')) {
            document.querySelectorAll('.context-menu.submenu').forEach(s => s.classList.add('hidden'));
          }
        }, 150);
      });
      menu.addEventListener('mouseenter', () => {
        if (menu.classList.contains('submenu')) {
          clearTimeout(ctxHideTimer);
        }
      });
    });

    document.querySelectorAll('.context-menu .context-menu-item:not(.context-submenu-trigger)').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const parentMenu = item.closest('.context-menu');
        parentMenu.querySelectorAll('.context-submenu-trigger').forEach(trigger => {
          const sub = document.getElementById(trigger.dataset.submenu);
          if (sub) sub.classList.add('hidden');
        });
      });
    });
  }

  showContextMenu(menuId, x, y) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    menu.classList.remove('hidden');
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        menu.style.left = (x - rect.width) + 'px';
      }
      if (rect.bottom > window.innerHeight) {
        menu.style.top = (y - rect.height) + 'px';
      }
    });
  }

  hideAllContextMenus() {
    document.querySelectorAll('.context-menu').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.dropdown-menu.submenu').forEach(m => m.classList.add('hidden'));
  }

  executeMenuAction(action) {
    switch (action) {
      case 'cut': document.execCommand('cut'); this.cm.focus(); break;
      case 'copy': document.execCommand('copy'); this.cm.focus(); break;
      case 'paste': document.execCommand('paste'); this.cm.focus(); break;
      case 'find-replace': this.toggleFindPanel(true); break;
      case 'select-all': this.cm.execCommand('selectAll'); break;

      case 'insert-bold': this.wrapSelection('**', '**'); break;
      case 'insert-italic': this.wrapSelection('*', '*'); break;
      case 'insert-strikethrough': this.wrapSelection('~~', '~~'); break;
      case 'insert-inline-code': this.wrapSelection('`', '`'); break;
      case 'insert-highlight': this.wrapSelection('==', '=='); break;
      case 'insert-superscript': this.wrapSelection('<sup>', '</sup>'); break;
      case 'insert-subscript': this.wrapSelection('<sub>', '</sub>'); break;

      case 'insert-h1': this.insertLinePrefix('# '); break;
      case 'insert-h2': this.insertLinePrefix('## '); break;
      case 'insert-h3': this.insertLinePrefix('### '); break;
      case 'insert-h4': this.insertLinePrefix('#### '); break;
      case 'insert-h5': this.insertLinePrefix('##### '); break;
      case 'insert-h6': this.insertLinePrefix('###### '); break;

      case 'insert-code-block': this.insertBlock('```javascript\n// code here\n```', 14); break;
      case 'insert-table': this.insertBlock('| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |', 2); break;
      case 'insert-quote': this.insertLinePrefix('> '); break;
      case 'insert-math-block': this.insertBlock('$$\nE = mc^2\n$$', 3); break;
      case 'insert-mermaid': this.insertBlock('```mermaid\ngraph TD\n    A[开始] --> B[结束]\n```', 11); break;
      case 'insert-hr': this.insertBlock('---'); break;
      case 'insert-toc': this.insertBlock('[TOC]'); break;

      case 'insert-callout-note': this.insertBlock('> [!NOTE]\n> 提示内容', 12); break;
      case 'insert-callout-tip': this.insertBlock('> [!TIP]\n> 建议内容', 11); break;
      case 'insert-callout-warning': this.insertBlock('> [!WARNING]\n> 警告内容', 15); break;
      case 'insert-callout-caution': this.insertBlock('> [!CAUTION]\n> 注意内容', 15); break;
      case 'insert-callout-important': this.insertBlock('> [!IMPORTANT]\n> 重要内容', 17); break;

      case 'insert-ul': this.insertLinePrefix('- '); break;
      case 'insert-ol': this.insertLinePrefix('1. '); break;
      case 'insert-task': this.insertLinePrefix('- [ ] '); break;

      case 'insert-link': this.insertAtCursor('[链接文本](https://example.com)', 1); break;
      case 'insert-image': this.insertAtCursor('![图片描述](image-url)', 2); break;

      case 'preview-copy': document.execCommand('copy'); break;
      case 'preview-select-all': { const range = document.createRange(); range.selectNodeContents(this.preview); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); break; }
      case 'preview-copy-html': { const sel = window.getSelection(); if (sel.rangeCount > 0) { const range = sel.getRangeAt(0); const frag = range.cloneContents(); const div = document.createElement('div'); div.appendChild(frag); navigator.clipboard.writeText(div.innerHTML); } break; }
      case 'preview-find': this.toggleFindPanel(); break;

      case 'tab-close': this.closeTab(this._contextTabIndex); break;
      case 'tab-close-others': this.closeOtherTabs(this._contextTabIndex); break;
      case 'tab-close-all': this.closeAllTabs(); break;
      case 'tab-copy-path': this.copyTabPath(this._contextTabIndex); break;
    }
  }

  closeOtherTabs(keepIndex) {
    if (keepIndex < 0 || keepIndex >= this.tabs.length) return;
    const tab = this.tabs[keepIndex];
    if (tab.isModified) return;
    this.tabs = [tab];
    this.activeTabIndex = 0;
    this.cm.setValue(tab.content);
    this.cm.setCursor(tab.cursorPos);
    this.updateTabBar();
    this.updatePreview();
  }

  closeAllTabs() {
    this.tabs = [new Tab()];
    this.activeTabIndex = 0;
    this.cm.setValue('');
    this.updateTabBar();
    this.updatePreview();
  }

  async copyTabPath(index) {
    if (index < 0 || index >= this.tabs.length) return;
    const tab = this.tabs[index];
    if (!tab.filePath) {
      this.setStatus('该文件尚未保存');
      return;
    }
    try {
      await navigator.clipboard.writeText(tab.filePath);
      this.setStatus('已复制文件路径');
    } catch {
      this.setStatus('复制失败');
    }
  }

  // ========== 顶部插入菜单 ==========

  initInsertMenu() {
    const insertMenu = document.getElementById('insert-menu');

    let hideAllTimer = null;

    const hideAllSubmenus = () => {
      document.querySelectorAll('#insert-menu ~ .dropdown-menu.submenu').forEach(m => m.classList.add('hidden'));
    };

    const scheduleHideAll = (delay = 300) => {
      clearTimeout(hideAllTimer);
      hideAllTimer = setTimeout(() => {
        if (!document.querySelector('#insert-menu:hover, #insert-menu ~ .dropdown-menu.submenu:hover')) {
          hideAllSubmenus();
        }
      }, delay);
    };

    const cancelHideAll = () => {
      clearTimeout(hideAllTimer);
    };

    insertMenu.addEventListener('mouseleave', () => scheduleHideAll());

    document.querySelectorAll('#insert-menu ~ .dropdown-menu.submenu').forEach(submenu => {
      submenu.addEventListener('mouseenter', cancelHideAll);
      submenu.addEventListener('mouseleave', () => scheduleHideAll());
    });

    document.querySelectorAll('.insert-submenu-trigger').forEach(trigger => {
      const showSubmenu = () => {
        cancelHideAll();
        const submenuId = trigger.dataset.submenu;
        const parentMenu = trigger.closest('.dropdown-menu');
        if (!parentMenu) return;

        const ancestors = [];
        let el = parentMenu;
        while (el) {
          if (el.classList && el.classList.contains('dropdown-menu')) {
            ancestors.push(el);
          }
          el = el.parentElement;
        }

        document.querySelectorAll('.dropdown-menu.submenu').forEach(s => {
          if (!ancestors.includes(s) && s.id !== submenuId) {
            s.classList.add('hidden');
          }
        });

        const submenu = document.getElementById(submenuId);
        if (!submenu) return;
        submenu.classList.remove('hidden');
        const parentRect = trigger.getBoundingClientRect();
        submenu.style.left = (parentRect.right - 1) + 'px';
        submenu.style.top = parentRect.top + 'px';
        requestAnimationFrame(() => {
          const subRect = submenu.getBoundingClientRect();
          if (subRect.right > window.innerWidth) {
            submenu.style.left = (parentRect.left - subRect.width + 1) + 'px';
          }
          if (subRect.bottom > window.innerHeight) {
            submenu.style.top = (window.innerHeight - subRect.height - 4) + 'px';
          }
        });
      };

      trigger.addEventListener('mouseenter', showSubmenu);
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const submenuId = trigger.dataset.submenu;
        const submenu = document.getElementById(submenuId);
        if (submenu && submenu.classList.contains('hidden')) {
          showSubmenu();
        }
      });
    });

    document.querySelectorAll('.dropdown-menu .dropdown-item:not(.insert-submenu-trigger)').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const parentMenu = item.closest('.dropdown-menu');
        parentMenu.querySelectorAll('.insert-submenu-trigger').forEach(trigger => {
          const sub = document.getElementById(trigger.dataset.submenu);
          if (sub) sub.classList.add('hidden');
        });
      });
    });

    document.querySelectorAll('#insert-menu .dropdown-item[data-action], .dropdown-menu.submenu .dropdown-item[data-action]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.dataset.action;
        insertMenu.classList.add('hidden');
        document.querySelectorAll('#insert-menu ~ .dropdown-menu.submenu').forEach(m => m.classList.add('hidden'));
        this.executeMenuAction(action);
      });
    });
  }
}

function initEula() {
  const eulaAccepted = localStorage.getItem('markflow-eula-accepted');
  if (eulaAccepted === 'true') {
    document.getElementById('eula-dialog').classList.add('hidden');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const overlay = document.getElementById('eula-dialog');
    const acceptBtn = document.getElementById('eula-accept');
    const declineBtn = document.getElementById('eula-decline');

    overlay.classList.remove('hidden');

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('markflow-eula-accepted', 'true');
      overlay.classList.add('hidden');
      resolve();
    });

    declineBtn.addEventListener('click', async () => {
      try {
        const { getCurrentWindow } = window.__TAURI__.window;
        await getCurrentWindow().close();
      } catch (e) {
        window.close();
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await initEula();

  window.editor = new MarkdownEditor();

  try {
    const args = await invoke('get_cli_args');
    if (args.length > 0) {
      const filePath = args[0];
      const content = await invoke('read_file', { path: filePath });
      const name = filePath.split(/[/\\]/).pop();
      window.editor.activeTab.content = content;
      window.editor.activeTab.savedContent = content;
      window.editor.activeTab.filePath = filePath;
      window.editor.activeTab.name = name;
      window.editor.cm.setValue(content);
      window.editor.updateTabDisplay();
      window.editor.updatePreview();
      window.editor.updateWordCount();
      window.editor.updateOutline();
      window.editor.setStatus(`已打开: ${name}`);
    }
  } catch (e) {
    console.warn('Failed to open file from CLI args:', e);
  }
});
