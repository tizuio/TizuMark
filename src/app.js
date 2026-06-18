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

    this.preview = document.getElementById('preview');
    this.statusText = document.getElementById('status-text');
    this.cursorPosition = document.getElementById('cursor-position');
    this.wordCountEl = document.getElementById('word-count');
    this.charCountEl = document.getElementById('char-count');
    this.lineCountEl = document.getElementById('line-count');

    this.initEditor();
    this.initEventListeners();
    this.initResizer();
    this.initFindReplace();
    this.initScrollTopBtn();
    this.initExternalLinks();
    this.initDragDrop();
    this.initSettings();
    this.initOutline();
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

    this.applySettings();
    this.setStatus('已恢复默认设置');
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
    document.getElementById('btn-file').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('file-menu').classList.toggle('hidden');
      document.getElementById('view-menu').classList.add('hidden');
      document.getElementById('help-menu').classList.add('hidden');
    });
    document.getElementById('btn-view').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('view-menu').classList.toggle('hidden');
      document.getElementById('file-menu').classList.add('hidden');
      document.getElementById('help-menu').classList.add('hidden');
    });
    document.getElementById('btn-help').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('help-menu').classList.toggle('hidden');
      document.getElementById('file-menu').classList.add('hidden');
      document.getElementById('view-menu').classList.add('hidden');
    });
    document.addEventListener('click', () => {
      document.getElementById('file-menu').classList.add('hidden');
      document.getElementById('view-menu').classList.add('hidden');
      document.getElementById('help-menu').classList.add('hidden');
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
      clone.style.background = this.isDark ? '#1e1e1e' : '#ffffff';
      clone.style.color = this.isDark ? '#cccccc' : '#333333';
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
        backgroundColor: this.isDark ? '#1e1e1e' : '#ffffff',
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
      renderMathInElement(this.preview, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\begin{equation}', right: '\\end{equation}', display: true },
          { left: '\\begin{align}', right: '\\end{align}', display: true },
          { left: '\\begin{aligned}', right: '\\end{aligned}', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX rendering error:', e);
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
      const wrapper = document.getElementById('editor-wrapper');
      wrapper.style.height = wrapper.offsetHeight + 'px';
      this.cm.refresh();
      this.preview.scrollTop = previewScrollTop;
      this.syncingScroll = false;
      this.updateSideButtons();
      this.preview.style.scrollBehavior = '';
      requestAnimationFrame(() => {
        wrapper.style.height = '';
        this.cm.refresh();
      });
    };
    const targetPane = pane === 'editor' ? editorPane : previewPane;
    targetPane.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'width') doRefresh();
    });
    setTimeout(doRefresh, 400);
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
}

window.addEventListener('DOMContentLoaded', async () => {
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
