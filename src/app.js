const { invoke } = window.__TAURI__.core;

async function dialogOpen(options = {}) {
  return await invoke('plugin:dialog|open', { options });
}

async function dialogSave(options = {}) {
  return await invoke('plugin:dialog|save', { options });
}

class Tab {
  constructor(name = '', content = '', filePath = null) {
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

const I18N = {
  zh: {
    file: '文件',
    new: '新建',
    open: '打开',
    save: '保存',
    saveAs: '另存为',
    exportHTML: '导出 HTML',
    exportImg: '导出长图',
    shortcuts: '快捷键设置',
    settings: '设置',
    insert: '插入',
    structure: '结构插入',
    heading: '标题',
    codeBlock: '代码块',
    table: '表格',
    quoteBlock: '引用块',
    callout: '提示块',
    mathBlock: '数学公式',
    mermaidChart: 'Mermaid 图表',
    hr: '水平线',
    toc: '目录 [TOC]',
    textFormat: '文本格式',
    bold: '加粗',
    italic: '斜体',
    strikethrough: '删除线',
    inlineCode: '行内代码',
    highlight: '高亮',
    superscript: '上标',
    subscript: '下标',
    list: '列表',
    ul: '无序列表',
    ol: '有序列表',
    taskList: '任务列表',
    linkMedia: '链接与媒体',
    link: '链接',
    image: '图片',
    view: '视图',
    outline: '大纲',
    help: '帮助',
    userGuide: '使用说明',
    about: '关于',
    preview: '预览',
    edit: '编辑',
    themeLight: '明亮',
    themeDark: '暗黑',
    minimize: '最小化',
    maximize: '最大化',
    close: '关闭',
    ready: '就绪',
    words: '字数',
    chars: '字符',
    lines: '行数',
    untitled: 'Untitled',
    noHeadings: '暂无标题',
    copy: '复制',
    copied: '已复制',
    copyCode: '复制代码',
    cut: '剪切',
    paste: '粘贴',
    selectAll: '全选',
    findReplace: '查找替换',
    find: '查找',
    replace: '替换',
    replaceAll: '全部替换',
    findNext: '下一个',
    findPrev: '上一个',
    caseSensitive: '区分大小写',
    regex: '正则',
    matches: '个结果',
    noMatches: '无结果',
    findInPreview: '在预览中查找',
    copyAsHTML: '复制为 HTML',
    closeTab: '关闭',
    closeOther: '关闭其他',
    closeAll: '关闭所有',
    copyFilePath: '复制文件路径',
    newFileCreated: '新文件已创建',
    opened: '已打开',
    openedFiles: '已打开 {n} 个文件',
    alreadyOpen: '文件已在打开中',
    saved: '已保存',
    savedAs: '已另存为',
    saveFailed: '保存失败',
    openFailed: '打开失败',
    exportFailed: '导出失败',
    fileModified: '已修改，是否保存？',
    saveChanges: '保存更改',
    dontSave: '不保存',
    cancel: '取消',
    fontSize: '字体大小',
    tabSize: 'Tab 宽度',
    lineWrap: '自动换行',
    lineNumbers: '显示行号',
    previewFontSize: '正文字号',
    lineHeight: '行高',
    maxWidth: '最大宽度',
    unlimited: '无限制',
    language: '界面语言',
    behavior: '行为',
    themeMode: '主题模式',
    colorScheme: '配色方案',
    schemeDefault: '基准',
    schemeForest: '翠林风',
    schemeNord: '极夜风',
    schemeDusk: '暮紫风',
    schemeSunset: '暖橙风',
    defaultView: '默认视图',
    scrollSync: '滚动同步',
    followSystem: '跟随系统',
    resetDefault: '恢复默认',
    done: '完成',
    confirm: '确认',
    themeSwitched: '已切换到{theme}主题',
    basic: '基本',
    fontScheme: '字体方案',
    fontSchemeSystemSans: '简约风格',
    fontSchemeClassicSerif: '印刷风格',
    scrollTop: 'TOP',
    collapseEditor: '折叠编辑器',
    collapsePreview: '折叠预览',
    restoreEditor: '恢复编辑器',
    restorePreview: '恢复预览',
    collapseHint: '请先切换到编辑视图再使用折叠功能',
    noteHint: 'Note 提示',
    tipHint: 'Tip 建议',
    warningHint: 'Warning 警告',
    cautionHint: 'Caution 注意',
    importantHint: 'Important 重要',
    version: '版本信息',
    contact: '联系我们',
    contactDesc: '反馈建议 · 报告 Bug · 交流使用心得 · 获取更新',
    qqGroupName: 'QQ 交流群',
    joinGroup: '点击加群',
    license: '许可协议',
    thirdParty: '第三方组件',
    copyright: '版权声明',
    aboutTitle: '关于 TizuMark',
    versionInfo: 'TizuMark v1.0.0',
    versionDesc: '轻量级跨平台 Markdown 编辑器',
    buildInfo: '基于 Tauri v2.5 + Rust 构建',
    copyrightLine: 'Copyright (c) 2024-2026 TizuMark',
    proprietary: '本软件基于 GPL v3 开源协议发布。',
    noUnauthorized: '欢迎自由使用、修改和分发，衍生作品须延续 GPL v3 协议。',
    shortcutLabel: { newFile: '新建文件', openFile: '打开文件', saveFile: '保存文件', closeTab: '关闭标签页', find: '查找（编辑器）', findReplace: '查找替换', nextTab: '下一个标签页', prevTab: '上一个标签页', bold: '加粗', italic: '斜体', insertLink: '插入链接' },
    modify: '修改',
    clear: '清除',
    none: '无',
    pressKeys: '按下快捷键...',
    generatingImg: '正在生成长图...',
    exportedImg: '已导出长图',
    exportedHTML: '已导出 HTML',
    editor: '编辑器',
    previewSection: '预览',
    paneEdit: '编辑',
    panePreview: '预览',
    column1: '列1',
    column2: '列2',
    column3: '列3',
    content: '内容',
    noteContent: '提示内容',
    tipContent: '建议内容',
    warningContent: '警告内容',
    cautionContent: '注意内容',
    importantContent: '重要内容',
    linkText: '链接文本',
    notSaved: '该文件尚未保存',
    pathCopied: '已复制文件路径',
    copyFailed: '复制失败',
    openedGuide: '已打开使用说明',
    openedGuideEn: 'Opened User Guide',
    failedGuide: '打开使用说明失败',
    giteeAction: '访问仓库',
    githubAction: '访问仓库',
    giteeTitle: '访问 Gitee 仓库',
    githubTitle: '访问 GitHub 仓库',
    qqTitle: '点击加群',
    donateTitle: '捐赠支持',
    donateDesc: '如果 TizuMark 帮到了你，欢迎支持一下。',
    donateWechat: '微信赞赏',
    donateAlipay: '支付宝赞赏',
    depCodeMirror: '代码编辑器组件',
    depHighlight: '语法高亮库',
    depCmark: 'Markdown 解析器（Rust）',
    depKatex: '数学公式渲染',
    depMermaid: '图表绘制库',
    depHtml2canvas: '截图导出',
    depTauri: '桌面应用框架',
    spaces: '空格',
    settingsReset: '已恢复默认设置',
    shortcutsReset: '已恢复默认快捷键',
    saveDialogMessage: '文件已修改，是否保存？',
    imageLoadFailed: '[图片加载失败]',
    dropFileHere: '拖放文件到此处打开',
    allFiles: '所有文件',
    confirmResetSettings: '确认恢复默认设置？',
    tablistLabel: '标签页',
    closeAria: '关闭',
    heading1: '# 标题 1',
    heading2: '## 标题 2',
    heading3: '### 标题 3',
    heading4: '#### 标题 4',
    heading5: '##### 标题 5',
    heading6: '###### 标题 6',
    previewMode: '预览模式',
    editMode: '编辑模式',
    newTab: '新建标签页',
    scrollLeft: '向左滚动',
    scrollRight: '向右滚动',
    backToTop: '回到顶部',
    loading: '加载中...',
    cursorPos: '行 {line}, 列 {col}',
    insertLinkTitle: '插入链接',
    linkText: '显示文本',
    linkUrl: '链接地址',
    insertImageTitle: '插入图片',
    imageSource: '图片来源',
    imageLocal: '本地图片',
    imageWeb: '网络图片',
    imageFile: '文件',
    imageBrowse: '浏览...',
    imageUrlLabel: '图片地址',
    imageAlt: '替代文本',
    imageAltHint: '当图片无法显示时展示此文本，屏幕阅读器也用它描述图片内容。',
    imageStoreModeHint: '图片存储支持复制到 assets/ 和 Base64 嵌入两种方式，可在设置中更改。',
    imageStoreMode: '存储方式',
    imageStoreAssets: '复制到 assets/（推荐）',
    imageStoreBase64: 'Base64 嵌入',
    imageStoreAssetsHint: '复制到 assets/：图片保存为独立文件，md 文件轻量，便于版本管理。',
    imageStoreBase64Hint: 'Base64 嵌入：图片编码到 md 文件内，单文件即可分享，但文件体积显著增大（约原图1.4倍），修改图片需重新编码。',
    imageSettingLabel: '图片存储方式',
    imageSettingAssets: '复制到 assets/（推荐）',
    imageSettingBase64: 'Base64 嵌入',
    imageSettingHint: '复制到 assets/：图片保存为独立文件，md 文件轻量，便于版本管理。Base64 嵌入：图片编码到 md 文件内，单文件即可分享，但文件体积显著增大（约原图1.4倍），修改图片需重新编码。',
    imageAssetPathLabel: '图片存储路径',
    imageAssetPathModeRelative: '相对路径',
    imageAssetPathModeAbsolute: '绝对路径',
    imageAssetPathRelativeHint: '相对于 markdown 文件所在目录的路径。例如 assets → 图片将保存在 docs/assets/。将整个文件夹移动到其他位置后，路径仍然有效，无需额外操作。',
    imageAssetPathAbsoluteHint: '完整的磁盘路径。例如 D:/images → 图片将直接保存到 D:/images/。如果将 markdown 文件夹移动到其他位置，图片路径会失效，需要手动更新引用。',
    imageAssetPathPlaceholder: 'assets',
    imageFileRequired: '请选择要插入的本地图片',
    imageUrlRequired: '请输入网络图片地址',
    needSaveFirst: '请先保存 markdown 文件后再插入图片',
    imageFallbackBase64: '文件未保存，已自动切换为 Base64 嵌入',
    imagePasted: '图片已粘贴',
    imagePasteFailed: '图片粘贴失败',
    linkAutoDetected: '（已从剪贴板检测到链接）',
    checkUpdate: '检查更新',
    updateChecking: '正在检查更新...',
    updateAvailable: '发现新版本',
    updateLatest: '已是最新版本',
    updateDownloadLabel: '下载更新',
    updateDownloading: '下载中...',
    updateInstallNow: '立即安装',
    updateLater: '稍后再说',
    updateReady: '更新已就绪，是否现在安装？',
    updateNoUpdate: '已是最新版本',
    updateFailed: '检查更新失败',
    updateProgress: '下载中 {pct}%',
    noUpdateNotes: '暂无更新说明',
  },
  en: {
    file: 'File',
    new: 'New',
    open: 'Open',
    save: 'Save',
    saveAs: 'Save As',
    exportHTML: 'Export HTML',
    exportImg: 'Export Image',
    shortcuts: 'Shortcuts',
    settings: 'Settings',
    insert: 'Insert',
    structure: 'Structure',
    heading: 'Heading',
    codeBlock: 'Code Block',
    table: 'Table',
    quoteBlock: 'Blockquote',
    callout: 'Callout',
    mathBlock: 'Math Block',
    mermaidChart: 'Mermaid Chart',
    hr: 'Horizontal Rule',
    toc: 'Table of Contents',
    textFormat: 'Text Format',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    inlineCode: 'Inline Code',
    highlight: 'Highlight',
    superscript: 'Superscript',
    subscript: 'Subscript',
    list: 'List',
    ul: 'Unordered List',
    ol: 'Ordered List',
    taskList: 'Task List',
    linkMedia: 'Links & Media',
    link: 'Link',
    image: 'Image',
    view: 'View',
    outline: 'Outline',
    help: 'Help',
    userGuide: 'User Guide',
    about: 'About',
    preview: 'Preview',
    edit: 'Edit',
    themeLight: 'Light',
    themeDark: 'Dark',
    minimize: 'Minimize',
    maximize: 'Maximize',
    close: 'Close',
    ready: 'Ready',
    words: 'Words',
    chars: 'Chars',
    lines: 'Lines',
    untitled: 'Untitled',
    noHeadings: 'No headings',
    copy: 'Copy',
    copied: 'Copied',
    copyCode: 'Copy code',
    cut: 'Cut',
    paste: 'Paste',
    selectAll: 'Select All',
    findReplace: 'Find & Replace',
    find: 'Find',
    replace: 'Replace',
    replaceAll: 'Replace All',
    findNext: 'Next',
    findPrev: 'Previous',
    caseSensitive: 'Case Sensitive',
    regex: 'Regex',
    matches: ' matches',
    noMatches: 'No matches',
    findInPreview: 'Find in Preview',
    copyAsHTML: 'Copy as HTML',
    closeTab: 'Close',
    closeOther: 'Close Others',
    closeAll: 'Close All',
    copyFilePath: 'Copy File Path',
    newFileCreated: 'New file created',
    opened: 'Opened',
    openedFiles: 'Opened {n} files',
    alreadyOpen: 'File already open',
    saved: 'Saved',
    savedAs: 'Saved as',
    saveFailed: 'Save failed',
    openFailed: 'Open failed',
    exportFailed: 'Export failed',
    fileModified: ' has been modified. Save?',
    saveChanges: 'Save Changes',
    dontSave: 'Don\'t Save',
    cancel: 'Cancel',
    fontSize: 'Font Size',
    tabSize: 'Tab Size',
    lineWrap: 'Line Wrap',
    lineNumbers: 'Line Numbers',
    previewFontSize: 'Preview Font Size',
    lineHeight: 'Line Height',
    maxWidth: 'Max Width',
    unlimited: 'Unlimited',
    language: 'Language',
    behavior: 'Behavior',
    themeMode: 'Theme Mode',
    colorScheme: 'Color Scheme',
    schemeDefault: 'Default',
    schemeForest: 'Forest',
    schemeNord: 'Nord',
    schemeDusk: 'Dusk',
    schemeSunset: 'Sunset',
    defaultView: 'Default View',
    scrollSync: 'Scroll Sync',
    followSystem: 'Follow System',
    resetDefault: 'Reset Default',
    done: 'Done',
    confirm: 'Confirm',
    themeSwitched: 'Switched to {theme} theme',
    basic: 'Basic',
    fontScheme: 'Font Scheme',
    fontSchemeSystemSans: 'Minimalist',
    fontSchemeClassicSerif: 'Print Style',
    scrollTop: 'TOP',
    collapseEditor: 'Collapse Editor',
    collapsePreview: 'Collapse Preview',
    restoreEditor: 'Restore Editor',
    restorePreview: 'Restore Preview',
    collapseHint: 'Switch to edit view first to use panel collapse',
    noteHint: 'Note',
    tipHint: 'Tip',
    warningHint: 'Warning',
    cautionHint: 'Caution',
    importantHint: 'Important',
    version: 'Version',
    contact: 'Contact Us',
    contactDesc: 'Feedback · Bug Reports · Tips & Discussion · Updates',
    qqGroupName: 'QQ Community',
    joinGroup: 'Join Group',
    license: 'License',
    thirdParty: 'Third-Party Components',
    copyright: 'Copyright Notice',
    aboutTitle: 'About TizuMark',
    versionInfo: 'TizuMark v1.0.0',
    versionDesc: 'Lightweight cross-platform Markdown editor',
    buildInfo: 'Built with Tauri v2.5 + Rust',
    copyrightLine: 'Copyright (c) 2024-2026 TizuMark',
    proprietary: 'This software is released under the GPL v3 open-source license.',
    noUnauthorized: 'Free to use, modify, and distribute. Derivative works must remain under GPL v3.',
    shortcutLabel: { newFile: 'New File', openFile: 'Open File', saveFile: 'Save File', closeTab: 'Close Tab', find: 'Find (Editor)', findReplace: 'Find & Replace', nextTab: 'Next Tab', prevTab: 'Previous Tab', bold: 'Bold', italic: 'Italic', insertLink: 'Insert Link' },
    modify: 'Modify',
    clear: 'Clear',
    none: 'None',
    pressKeys: 'Press keys...',
    generatingImg: 'Generating image...',
    exportedImg: 'Exported image',
    exportedHTML: 'Exported HTML',
    editor: 'Editor',
    previewSection: 'Preview',
    paneEdit: 'Edit',
    panePreview: 'Preview',
    column1: 'Col 1',
    column2: 'Col 2',
    column3: 'Col 3',
    content: 'Content',
    noteContent: 'Note content',
    tipContent: 'Tip content',
    warningContent: 'Warning content',
    cautionContent: 'Caution content',
    importantContent: 'Important content',
    linkText: 'Link text',
    notSaved: 'File not saved yet',
    pathCopied: 'File path copied',
    copyFailed: 'Copy failed',
    openedGuide: 'User guide opened',
    openedGuideEn: 'Opened User Guide',
    failedGuide: 'Failed to open user guide',
    failedGuideEn: 'Failed to open guide',
    giteeAction: 'Visit Repository',
    githubAction: 'Visit Repository',
    giteeTitle: 'Visit Gitee Repository',
    githubTitle: 'Visit GitHub Repository',
    qqTitle: 'Join Group',
    donateTitle: 'Donate',
    donateDesc: 'If TizuMark has helped you, please consider supporting it.',
    donateWechat: 'WeChat Pay',
    donateAlipay: 'Alipay',
    depCodeMirror: 'Code editor component',
    depHighlight: 'Syntax highlighting library',
    depCmark: 'Markdown parser (Rust)',
    depKatex: 'Math formula rendering',
    depMermaid: 'Diagram drawing library',
    depHtml2canvas: 'Screenshot export',
    depTauri: 'Desktop application framework',
    spaces: 'spaces',
    settingsReset: 'Settings reset to defaults',
    shortcutsReset: 'Shortcuts reset to defaults',
    saveDialogMessage: 'File has been modified. Save?',
    imageLoadFailed: '[Image failed to load]',
    dropFileHere: 'Drop file here to open',
    allFiles: 'All Files',
    confirmResetSettings: 'Restore default settings?',
    tablistLabel: 'Tabs',
    closeAria: 'Close',
    heading1: '# Heading 1',
    heading2: '## Heading 2',
    heading3: '### Heading 3',
    heading4: '#### Heading 4',
    heading5: '##### Heading 5',
    heading6: '###### Heading 6',
    previewMode: 'Preview Mode',
    editMode: 'Edit Mode',
    newTab: 'New Tab',
    scrollLeft: 'Scroll Left',
    scrollRight: 'Scroll Right',
    backToTop: 'Back to Top',
    loading: 'Loading...',
    cursorPos: 'Line {line}, Col {col}',
    insertLinkTitle: 'Insert Link',
    linkText: 'Text',
    linkUrl: 'URL',
    insertImageTitle: 'Insert Image',
    imageSource: 'Source',
    imageLocal: 'Local Image',
    imageWeb: 'Web Image',
    imageFile: 'File',
    imageBrowse: 'Browse...',
    imageUrlLabel: 'Image URL',
    imageAlt: 'Alt Text',
    imageAltHint: 'Shown when the image cannot be displayed; also used by screen readers to describe the image.',
    imageStoreModeHint: 'Supports "Copy to assets/" and "Embed as Base64". Change in Settings.',
    imageStoreMode: 'Storage',
    imageStoreAssets: 'Copy to assets/ (Recommended)',
    imageStoreBase64: 'Embed as Base64',
    imageStoreAssetsHint: 'Copy to assets/: Images saved as separate files, keeps markdown lightweight, suitable for version control.',
    imageStoreBase64Hint: 'Embed as Base64: Encodes image into the markdown file for self-contained sharing, but significantly increases file size (~1.4x original). Requires re-encoding to modify.',
    imageSettingLabel: 'Image Storage',
    imageSettingAssets: 'Copy to assets/ (Recommended)',
    imageSettingBase64: 'Embed as Base64',
    imageSettingHint: 'Copy to assets/: Images are saved as separate files, keeping the markdown file lightweight and suitable for version control. Embed as Base64: Encodes images into the markdown file for self-contained sharing, but file size increases significantly (~1.4x original). Requires re-encoding to modify.',
    imageAssetPathLabel: 'Image Asset Path',
    imageAssetPathModeRelative: 'Relative Path',
    imageAssetPathModeAbsolute: 'Absolute Path',
    imageAssetPathRelativeHint: 'Relative to the markdown file\'s directory. Example: assets → images saved in docs/assets/. Path remains valid when moving the entire folder to another location.',
    imageAssetPathAbsoluteHint: 'Full disk path. Example: D:/images → images saved directly in D:/images/. Path will break if the markdown folder is moved to another location.',
    imageAssetPathPlaceholder: 'assets',
    imageFileRequired: 'Please select a local image file',
    imageUrlRequired: 'Please enter an image URL',
    needSaveFirst: 'Save the markdown file first before inserting images',
    imageFallbackBase64: 'File not saved, auto-switched to Base64 embed',
    imagePasted: 'Image pasted',
    imagePasteFailed: 'Image paste failed',
    linkAutoDetected: '(Link detected from clipboard)',
    checkUpdate: 'Check for Updates',
    updateChecking: 'Checking for updates...',
    updateAvailable: 'Update Available',
    updateLatest: 'Up to Date',
    updateDownloadLabel: 'Download Update',
    updateDownloading: 'Downloading...',
    updateInstallNow: 'Install Now',
    updateLater: 'Later',
    updateReady: 'Update ready. Install now?',
    updateNoUpdate: 'You\'re up to date',
    updateFailed: 'Check for updates failed',
    updateProgress: 'Downloading {pct}%',
    noUpdateNotes: 'No release notes',
  }
};

class MarkdownEditor {
  constructor() {
    this.untitledCounter = 1;
    this.tabs = [];
    this.activeTabIndex = 0;
    this.cm = null;
    this.debounceTimer = null;
    this._renderGeneration = 0;
    this._linePositions = [{ line: 0, fraction: 0 }];
    this._blocks = [];
    this._previewChildrenCount = 0;
    this._editorPercent = null;
    this.isDark = false;
    this.viewMode = 'preview';

    this.settings = this.loadSettings();
    this.shortcuts = this.loadShortcuts();
    this.recordingAction = null;
    this.tabs.push(new Tab(this.t('untitled') + this.untitledCounter++));

    this.preview = document.getElementById('preview');
    if (this.preview) this.preview.style.scrollBehavior = 'auto';
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
    this.initOutlineResizer();
    this.updateOutlineCheck();
    this.initContextMenu();
    this.initInsertMenu();
    this.initInsertDialogs();
    this.initImagePaste();
    this.initTabScroll();
    this.loadTheme();
    this.applyFontScheme();
    this.updatePreview();
    this.applyViewMode();
    this.updateMaximizeIcon();
    this.updateWordCount();
    setTimeout(() => this.checkUpdate(false), 5000);
    this.updateSideButtons();
    this.applyLanguage();
  }

  showLoading() {
    this._loadingStart = Date.now();
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');
    overlay.offsetHeight;
  }

  async hideLoading() {
    const elapsed = Date.now() - (this._loadingStart || 0);
    const minDuration = 200;
    if (elapsed < minDuration) {
      await new Promise(r => setTimeout(r, minDuration - elapsed));
    }
    document.getElementById('loading-overlay').classList.add('hidden');
  }

  t(key, params = {}) {
    const lang = this.settings.language === 'en' ? 'en' : 'zh';
    let text = I18N[lang][key];
    if (text === undefined) {
      text = I18N.zh[key] || key;
    }
    if (text && params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace('{' + k + '}', v);
      }
    }
    return text;
  }

  applyLanguage() {
    const t = (k, p) => this.t(k, p);
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    const setPlaceholder = (id, text) => { const el = document.getElementById(id); if (el) el.placeholder = text; };
    const setTitle = (id, text) => { const el = document.getElementById(id); if (el) el.title = text; };

    // Toolbar buttons — skip the dropdown-arrow span, target the label span
    const updateToolbarBtn = (btnId, text) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const span = btn.querySelector('span:not(.dropdown-arrow)');
      if (span) span.textContent = text;
    };
    updateToolbarBtn('btn-file', t('file'));
    updateToolbarBtn('btn-insert', t('insert'));
    updateToolbarBtn('btn-view', t('view'));
    updateToolbarBtn('btn-help', t('help'));

    // File menu items
    // Use direct approach for menu items
    const updateMenuText = (id, text) => {
      const el = document.getElementById(id);
      if (!el) return;
      const span = el.querySelector('span:not(.shortcut):not(.icon)');
      if (span) span.textContent = text;
    };

    updateMenuText('btn-new', t('new'));
    updateMenuText('btn-open', t('open'));
    updateMenuText('btn-save', t('save'));
    updateMenuText('btn-save-as', t('saveAs'));
    updateMenuText('btn-export-html', t('exportHTML'));
    updateMenuText('btn-export-img', t('exportImg'));
    updateMenuText('btn-shortcuts', t('shortcuts'));
    updateMenuText('btn-settings', t('settings'));
    updateMenuText('btn-user-guide', t('userGuide'));
    updateMenuText('btn-about', t('about'));

    // View mode tabs
    updateMenuText('btn-view-preview', t('preview'));
    updateMenuText('btn-view-edit', t('edit'));

    // Theme button
    setText('theme-text', this.isDark ? t('themeDark') : t('themeLight'));

    // Window controls
    setTitle('btn-minimize', t('minimize'));
    setTitle('btn-maximize', t('maximize'));
    setTitle('btn-close', t('close'));

    // Status bar
    setText('status-text', t('ready'));
    document.getElementById('word-count').textContent = t('words') + ': 0';
    document.getElementById('char-count').textContent = t('chars') + ': 0';
    document.getElementById('line-count').textContent = t('lines') + ': 0';
    if (this.cm) {
      const cur = this.cm.getCursor();
      document.getElementById('cursor-position').textContent = this.t('cursorPos', { line: cur.line + 1, col: cur.ch + 1 });
    }

    // Drag overlay
    setText('drag-overlay', t('dropFileHere'));

    // ARIA labels
    const tabBar = document.getElementById('tab-bar');
    if (tabBar) tabBar.setAttribute('aria-label', t('tablistLabel'));
    document.querySelectorAll('.dialog-close').forEach(btn => {
      btn.setAttribute('aria-label', t('closeAria'));
    });

    // Pane headers & outline
    document.querySelector('#editor-pane .pane-header span').textContent = t('paneEdit');
    document.querySelector('#preview-pane .pane-header span').textContent = t('panePreview');
    setText('outline-header-title', t('outline'));

    // Settings dialog
    document.querySelector('#settings-dialog .dialog-header h2').textContent = t('settings');
    // 基本
    document.querySelector('#settings-dialog .settings-section:nth-child(1) h3').textContent = t('basic');
    document.querySelector('#settings-dialog .settings-section:nth-child(1) .settings-row:nth-child(2) label').textContent = t('language');
    document.querySelector('#settings-dialog .settings-section:nth-child(1) .settings-row:nth-child(3) label').textContent = t('themeMode');
    document.querySelector('#settings-dialog .settings-section:nth-child(1) .settings-row:nth-child(4) label').textContent = t('colorScheme');
    document.querySelector('#settings-dialog .settings-section:nth-child(1) .settings-row:nth-child(5) label').textContent = t('fontScheme');
    // 编辑器
    document.querySelector('#settings-dialog .settings-section:nth-child(2) h3').textContent = t('editor');
    document.querySelector('#settings-dialog .settings-section:nth-child(2) .settings-row:nth-child(2) label').textContent = t('fontSize');
    document.querySelector('#settings-dialog .settings-section:nth-child(2) .settings-row:nth-child(3) label').textContent = t('tabSize');
    document.querySelector('#settings-dialog .settings-section:nth-child(2) .settings-row:nth-child(4) label').textContent = t('lineWrap');
    document.querySelector('#settings-dialog .settings-section:nth-child(2) .settings-row:nth-child(5) label').textContent = t('lineNumbers');
    // 预览
    document.querySelector('#settings-dialog .settings-section:nth-child(3) h3').textContent = t('previewSection');
    document.querySelector('#settings-dialog .settings-section:nth-child(3) .settings-row:nth-child(2) label').textContent = t('previewFontSize');
    document.querySelector('#settings-dialog .settings-section:nth-child(3) .settings-row:nth-child(3) label').textContent = t('lineHeight');
    document.querySelector('#settings-dialog .settings-section:nth-child(3) .settings-row:nth-child(4) label').textContent = t('maxWidth');
    // 行为
    document.querySelector('#settings-dialog .settings-section:nth-child(4) h3').textContent = t('behavior');
    document.querySelector('#settings-dialog .settings-section:nth-child(4) .settings-row:nth-child(2) label').textContent = t('defaultView');
    document.querySelector('#settings-dialog .settings-section:nth-child(4) .settings-row:nth-child(3) label').textContent = t('scrollSync');
    setText('setting-image-store-assets', t('imageSettingAssets'));
    setText('setting-image-store-base64', t('imageSettingBase64'));
    document.querySelector('#setting-image-store-hint .hint-text').textContent = t('imageSettingHint');
    document.getElementById('settings-reset').textContent = t('resetDefault');
    document.getElementById('settings-cancel-btn').textContent = t('cancel');
    document.getElementById('settings-save-btn').textContent = t('save');
    document.getElementById('settings-close-x').setAttribute('aria-label', t('cancel'));
    document.getElementById('confirm-dialog-confirm').textContent = t('confirm');
    document.getElementById('confirm-dialog-cancel').textContent = t('cancel');
    // Update color scheme options text
    const csSelect = document.getElementById('set-color-scheme');
    if (csSelect) {
      csSelect.options[0].text = t('schemeDefault');
      csSelect.options[1].text = t('schemeSunset');
      csSelect.options[2].text = t('schemeForest');
      csSelect.options[3].text = t('schemeNord');
      csSelect.options[4].text = t('schemeDusk');
    }
    // Update font scheme options text
    const fsSelect = document.getElementById('set-font-scheme');
    if (fsSelect) {
      fsSelect.options[0].text = t('fontSchemeSystemSans');
      fsSelect.options[1].text = t('fontSchemeClassicSerif');
    }

    // Update tab bar
    this.updateTabBar();
    this.updateWordCount();

    // Side buttons
    this.applyViewMode();

    // About dialog
    document.querySelector('#about-dialog .dialog-header h2').textContent = t('aboutTitle');
    const aboutSections = document.querySelectorAll('#about-dialog .about-section');
    if (aboutSections.length >= 1) {
      aboutSections[0].querySelector('h3').textContent = t('version');
      aboutSections[0].querySelector('p:nth-child(2)').textContent = t('versionInfo');
      aboutSections[0].querySelector('p:nth-child(3)').textContent = t('versionDesc');
      aboutSections[0].querySelector('p:nth-child(4)').textContent = t('buildInfo');
    }
    if (aboutSections.length >= 2) {
      aboutSections[1].querySelector('h3').textContent = t('contact');
      const contactDesc = aboutSections[1].querySelector('.contact-desc');
      const qqLabel = aboutSections[1].querySelector('.qq-label');
      const qqJoinText = aboutSections[1].querySelector('.qq-join-text');
      const qqBadge = document.getElementById('qq-group-badge');
      if (contactDesc) contactDesc.textContent = t('contactDesc');
      if (qqLabel) qqLabel.textContent = t('qqGroupName');
      if (qqJoinText) qqJoinText.textContent = t('joinGroup');
      if (qqBadge) qqBadge.title = t('qqTitle');
      const giteeAction = aboutSections[1].querySelector('.gitee-action');
      const giteeBadge = document.getElementById('gitee-badge');
      if (giteeAction) giteeAction.textContent = t('giteeAction');
      if (giteeBadge) giteeBadge.title = t('giteeTitle');
      const githubAction = aboutSections[1].querySelector('.github-action');
      const githubBadge = document.getElementById('github-badge');
      if (githubAction) githubAction.textContent = t('githubAction');
      if (githubBadge) githubBadge.title = t('githubTitle');
    }
    if (aboutSections.length >= 3) {
      aboutSections[2].querySelector('h3').textContent = t('license');
      aboutSections[2].querySelector('p:nth-child(2)').textContent = t('copyrightLine');
      aboutSections[2].querySelector('p:nth-child(3)').textContent = t('proprietary');
      aboutSections[2].querySelector('p:nth-child(4)').textContent = t('noUnauthorized');
    }
    if (aboutSections.length >= 4) {
      const summary = aboutSections[3].querySelector('summary');
      if (summary) summary.textContent = t('thirdParty');
      const depDescs = aboutSections[3].querySelectorAll('.dependency-item p');
      const depKeys = ['depCodeMirror', 'depHighlight', 'depCmark', 'depKatex', 'depMermaid', 'depHtml2canvas', 'depTauri'];
      depDescs.forEach((p, i) => {
        if (i < depKeys.length) p.textContent = t(depKeys[i]);
      });
    }

    // Save dialog
    document.getElementById('save-dialog-title').textContent = t('saveChanges');
    document.getElementById('save-dialog-save').textContent = t('save');
    document.getElementById('save-dialog-discard').textContent = t('dontSave');
    document.getElementById('save-dialog-cancel').textContent = t('cancel');

    // Find panels
    setPlaceholder('find-input', t('find') + '...');
    setPlaceholder('replace-input', t('replace') + '...');
    document.querySelector('#find-panel .find-option:nth-child(2)') && (document.querySelector('#find-panel .find-option:nth-child(2)').childNodes[1] && (document.querySelector('#find-panel .find-option:nth-child(2)').childNodes[1].textContent = ' ' + t('caseSensitive')));
    document.querySelector('#find-panel .find-option:nth-child(3)') && (document.querySelector('#find-panel .find-option:nth-child(3)').childNodes[1] && (document.querySelector('#find-panel .find-option:nth-child(3)').childNodes[1].textContent = ' ' + t('regex')));
    document.getElementById('find-next').textContent = t('findNext');
    document.getElementById('find-prev').textContent = t('findPrev');
    document.getElementById('replace-one').textContent = t('replace');
    document.getElementById('replace-all').textContent = t('replaceAll');
    setPlaceholder('preview-find-input', t('findInPreview') + '...');
    document.querySelector('#preview-find-panel .find-option:nth-child(2)') && (document.querySelector('#preview-find-panel .find-option:nth-child(2)').childNodes[1] && (document.querySelector('#preview-find-panel .find-option:nth-child(2)').childNodes[1].textContent = ' ' + t('caseSensitive')));
    document.querySelector('#preview-find-panel .find-option:nth-child(3)') && (document.querySelector('#preview-find-panel .find-option:nth-child(3)').childNodes[1] && (document.querySelector('#preview-find-panel .find-option:nth-child(3)').childNodes[1].textContent = ' ' + t('regex')));
    document.getElementById('preview-find-next').textContent = t('findNext');
    document.getElementById('preview-find-prev').textContent = t('findPrev');

    // Save dialog message
    setText('save-dialog-message', t('saveDialogMessage'));

    // Confirm dialog title & message
    setText('confirm-dialog-title', t('confirm'));
    setText('confirm-dialog-message', t('confirmResetSettings'));

    // Shortcuts dialog
    setText('shortcuts-title', t('shortcuts'));
    document.getElementById('shortcuts-reset').textContent = t('resetDefault');
    document.getElementById('shortcuts-save-btn').textContent = t('done');

    // Loading overlay
    setText('loading-text', t('loading'));

    // Scroll-top button
    setText('scroll-top-label', t('scrollTop'));
    setTitle('scroll-top-btn', t('backToTop'));

    // Tab bar tooltips
    setTitle('btn-add-tab', t('newTab'));
    setTitle('tab-scroll-left', t('scrollLeft'));
    setTitle('tab-scroll-right', t('scrollRight'));

    // Toolbar button titles
    setTitle('btn-file', t('file'));
    setTitle('btn-insert', t('insert'));
    setTitle('btn-view', t('view'));
    setTitle('btn-help', t('help'));
    setTitle('btn-view-preview', t('previewMode'));
    setTitle('btn-view-edit', t('editMode'));

    // View menu outline toggle
    const outlineToggle = document.getElementById('btn-outline-toggle');
    if (outlineToggle) {
      const labelSpan = outlineToggle.querySelector('span:last-of-type');
      if (labelSpan) labelSpan.textContent = t('outline');
    }

    // ====== INSERT MENU ======
    // Submenu triggers (items with data-submenu)
    const subTriggerKeys = {
      'insert-structure': 'structure',
      'insert-text-format': 'textFormat',
      'insert-list': 'list',
      'insert-link-media': 'linkMedia',
      'insert-heading': 'heading',
      'insert-callout': 'callout',
    };
    document.querySelectorAll('.insert-submenu-trigger').forEach(el => {
      const key = subTriggerKeys[el.dataset.submenu];
      if (key) {
        const span = el.querySelector('span:first-of-type');
        if (span) span.textContent = t(key);
      }
    });

    // Items with data-action inside insert submenus
    const insActionKeys = {
      'insert-code-block': 'codeBlock',
      'insert-table': 'table',
      'insert-quote': 'quoteBlock',
      'insert-math-block': 'mathBlock',
      'insert-mermaid': 'mermaidChart',
      'insert-hr': 'hr',
      'insert-toc': 'toc',
      'insert-h1': 'heading1',
      'insert-h2': 'heading2',
      'insert-h3': 'heading3',
      'insert-h4': 'heading4',
      'insert-h5': 'heading5',
      'insert-h6': 'heading6',
      'insert-bold': 'bold',
      'insert-italic': 'italic',
      'insert-strikethrough': 'strikethrough',
      'insert-inline-code': 'inlineCode',
      'insert-highlight': 'highlight',
      'insert-superscript': 'superscript',
      'insert-subscript': 'subscript',
      'insert-ul': 'ul',
      'insert-ol': 'ol',
      'insert-task': 'taskList',
      'insert-link': 'link',
      'insert-image': 'image',
      'insert-callout-note': 'noteHint',
      'insert-callout-tip': 'tipHint',
      'insert-callout-warning': 'warningHint',
      'insert-callout-caution': 'cautionHint',
      'insert-callout-important': 'importantHint',
    };
    document.querySelectorAll(
      '#insert-structure .dropdown-item[data-action],' +
      '#insert-heading .dropdown-item[data-action],' +
      '#insert-callout .dropdown-item[data-action],' +
      '#insert-text-format .dropdown-item[data-action],' +
      '#insert-list .dropdown-item[data-action],' +
      '#insert-link-media .dropdown-item[data-action],' +
      // Also cover context menu submenus
      '#ctx-structure .context-menu-item[data-action],' +
      '#ctx-heading .context-menu-item[data-action],' +
      '#ctx-callout .context-menu-item[data-action],' +
      '#ctx-text-format .context-menu-item[data-action],' +
      '#ctx-list .context-menu-item[data-action],' +
      '#ctx-link-media .context-menu-item[data-action]'
    ).forEach(el => {
      const key = insActionKeys[el.dataset.action];
      if (key) {
        const span = el.querySelector('span:first-of-type');
        if (span) span.textContent = t(key);
      }
    });

    // ====== CONTEXT MENUS ======
    // Submenu triggers
    const ctxSubKeys = {
      'ctx-structure': 'structure',
      'ctx-text-format': 'textFormat',
      'ctx-list': 'list',
      'ctx-link-media': 'linkMedia',
      'ctx-heading': 'heading',
      'ctx-callout': 'callout',
    };
    document.querySelectorAll('.context-submenu-trigger').forEach(el => {
      const key = ctxSubKeys[el.dataset.submenu];
      if (key) {
        const span = el.querySelector('span:first-of-type');
        if (span) span.textContent = t(key);
      }
    });

    // Items with data-action
    const ctxActionKeys = {
      cut: 'cut',
      copy: 'copy',
      paste: 'paste',
      'find-replace': 'findReplace',
      'select-all': 'selectAll',
      'preview-copy': 'copy',
      'preview-select-all': 'selectAll',
      'preview-copy-html': 'copyAsHTML',
      'preview-find': 'findInPreview',
      'tab-close': 'closeTab',
      'tab-close-others': 'closeOther',
      'tab-close-all': 'closeAll',
      'tab-copy-path': 'copyFilePath',
    };
    document.querySelectorAll('.context-menu-item[data-action]').forEach(el => {
      const key = ctxActionKeys[el.dataset.action];
      if (key) {
        const span = el.querySelector('span:first-of-type');
        if (span) span.textContent = t(key);
      }
    });

    // ====== SETTINGS DROPDOWN OPTIONS ======
    // Theme mode
    const themeSel = document.getElementById('set-theme-mode');
    if (themeSel) {
      themeSel.options[0].text = t('themeLight');
      themeSel.options[1].text = t('themeDark');
      themeSel.options[2].text = t('followSystem');
    }
    // Default view
    const viewSel = document.getElementById('set-default-view');
    if (viewSel) {
      viewSel.options[0].text = t('preview');
      viewSel.options[1].text = t('edit');
    }
    // Tab size
    const tabSizeSel = document.getElementById('set-tab-size');
    if (tabSizeSel) {
      tabSizeSel.options[0].text = '2 ' + t('spaces');
      tabSizeSel.options[1].text = '4 ' + t('spaces');
      tabSizeSel.options[2].text = '8 ' + t('spaces');
    }
    // Max width (unlimited)
    const maxWSel = document.getElementById('set-max-width');
    if (maxWSel && maxWSel.options.length > 0) {
      maxWSel.options[0].text = t('unlimited');
    }
    // Language selector — keep option text fixed (中文 / English)
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
      colorScheme: 'default',
      fontScheme: 'classic-serif',
      defaultView: 'preview',
      scrollSync: true,
      language: 'zh',
      imageInsertMode: 'assets',
      imageAssetPath: 'assets',
      imageAssetPathMode: 'relative',
      outlineWidth: 240,
    };
    try {
      const saved = JSON.parse(localStorage.getItem('tizumark-settings'));
      // 向后兼容：旧版本没有 fontScheme 时，从配色方案推断
      if (saved && saved.fontScheme === undefined) {
        const colorSchemeFontMap = {
          default: 'system-sans',
          forest: 'system-sans',
          nord: 'system-sans',
          dusk: 'system-sans',
          sunset: 'classic-serif',
        };
        saved.fontScheme = colorSchemeFontMap[saved.colorScheme] || 'system-sans';
      }
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  }

  saveSettings() {
    localStorage.setItem('tizumark-settings', JSON.stringify(this.settings));
  }

  async initSettings() {
    document.getElementById('btn-settings').addEventListener('click', () => this.showSettings());
    document.getElementById('settings-close-x').addEventListener('click', () => this.hideSettings());
    document.getElementById('settings-save-btn').addEventListener('click', () => this.hideSettings());
    document.getElementById('settings-cancel-btn').addEventListener('click', () => this.hideSettings());
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
    document.getElementById('set-color-scheme').value = s.colorScheme || 'default';
    document.getElementById('set-font-scheme').value = s.fontScheme || 'system-sans';
    document.getElementById('set-default-view').value = s.defaultView;
    document.getElementById('set-scroll-sync').checked = s.scrollSync;
    document.getElementById('set-language').value = s.language || 'zh';
    const modeRadio = document.querySelector(`#settings-image-store-mode input[value="${s.imageInsertMode || 'assets'}"]`);
    if (modeRadio) modeRadio.checked = true;

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
    document.getElementById('set-theme-mode').addEventListener('change', async (e) => {
      this.settings.themeMode = e.target.value;
      await this.applyThemeMode();
      this.saveSettings();
    });
    document.getElementById('set-color-scheme').addEventListener('change', async (e) => {
      this.settings.colorScheme = e.target.value;
      await this.applyThemeMode();
      this.saveSettings();
    });
    document.getElementById('set-font-scheme').addEventListener('change', (e) => {
      this.settings.fontScheme = e.target.value;
      this.applyFontScheme();
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
      this.applyLanguage();
    });
    document.querySelectorAll('#settings-image-store-mode input[name="settings-image-store"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.settings.imageInsertMode = e.target.value;
        this.saveSettings();
      });
    });

    document.getElementById('settings-image-asset-path').value = s.imageAssetPath || 'assets';
    document.getElementById('settings-image-asset-path').addEventListener('change', (e) => {
      this.settings.imageAssetPath = e.target.value.trim() || 'assets';
      this.saveSettings();
    });

    const pathModeRadio = document.querySelector(`#settings-image-asset-path-mode input[value="${s.imageAssetPathMode || 'relative'}"]`);
    if (pathModeRadio) pathModeRadio.checked = true;
    document.querySelectorAll('#settings-image-asset-path-mode input[name="settings-image-asset-path"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.settings.imageAssetPathMode = e.target.value;
        this.settings.imageAssetPath = e.target.value === 'absolute' ? 'D:/images' : 'assets';
        document.getElementById('settings-image-asset-path').value = this.settings.imageAssetPath;
        this.saveSettings();
        this.updateImageAssetPathHint();
      });
    });
    this.updateImageAssetPathHint();

    this.applySettings();
  }

  initOutline() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const outlineClose = document.getElementById('outline-close');

    outlineClose.addEventListener('click', () => {
      this.settings.outlineWidth = outlineSidebar.offsetWidth;
      this.saveSettings();
      outlineSidebar.style.width = '';
      outlineSidebar.classList.add('hidden');
      this.updateOutlineCheck();
      this.updateSideButtons();
    });
  }

  updateSideButtons() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const sideLeft = document.getElementById('btn-side-left');
    const sideRight = document.getElementById('btn-side-right');
    const outlineWidth = outlineSidebar.classList.contains('hidden') ? 0 : outlineSidebar.offsetWidth;
    sideLeft.style.left = outlineWidth + 'px';
    sideRight.style.left = '';
  }

  toggleOutline() {
    const outlineSidebar = document.getElementById('outline-sidebar');
    const wasHidden = outlineSidebar.classList.contains('hidden');
    if (wasHidden) {
      outlineSidebar.style.width = (this.settings.outlineWidth ?? 240) + 'px';
      outlineSidebar.classList.remove('hidden');
    } else {
      this.settings.outlineWidth = outlineSidebar.offsetWidth;
      this.saveSettings();
      outlineSidebar.style.width = '';
      outlineSidebar.classList.add('hidden');
    }
    this.updateOutlineCheck();
    if (!outlineSidebar.classList.contains('hidden')) {
      this.updateOutline();
    }
    this.updateSideButtons();
  }

  initOutlineResizer() {
    const resizer = document.getElementById('outline-resizer');
    const sidebar = document.getElementById('outline-sidebar');
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startWidth = sidebar.offsetWidth;
      document.body.classList.add('is-resizing');
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const delta = e.clientX - startX;
      let newWidth = startWidth + delta;
      newWidth = Math.max(80, Math.min(500, newWidth));
      sidebar.style.width = newWidth + 'px';
      this.cm.refresh();
      this.updateSideButtons();
    });

    document.addEventListener('mouseup', () => {
      if (!isResizing) return;
      isResizing = false;
      document.body.classList.remove('is-resizing');
      this.settings.outlineWidth = sidebar.offsetWidth;
      this.saveSettings();
    });
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
    const content = this.cm.getValue();
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
      outlineContent.innerHTML = `<div class="outline-empty">${this.t('noHeadings')}</div>`;
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
          const previewHeight = this.preview.clientHeight;
          const targetRect = target.getBoundingClientRect();
          const previewRect = this.preview.getBoundingClientRect();
          const top = targetRect.top - previewRect.top + this.preview.scrollTop
                    - (previewHeight / 2) + (targetRect.height / 2);
          this.preview.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
        }
        outlineContent.querySelectorAll('.outline-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  headingToId(text) {
    let id = '';
    for (const ch of text) {
      if (/[\p{L}\p{N}]/u.test(ch)) {
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

  applyFontScheme() {
    document.documentElement.setAttribute('data-font-scheme', this.settings.fontScheme || 'system-sans');
    // 更新 mermaid 字体
    if (typeof mermaid !== 'undefined') {
      this.rerenderMermaid();
    }
  }

  async applySettings() {
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
    await this.applyThemeMode();
    this.applyFontScheme();
  }

  async applyThemeMode() {
    const mode = this.settings.themeMode;
    if (mode === 'light') {
      this.isDark = false;
    } else if (mode === 'dark') {
      this.isDark = true;
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-color-scheme', this.settings.colorScheme || 'default');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();
    const highlightTheme = document.getElementById('highlight-theme');
    if (highlightTheme) {
      highlightTheme.href = this.isDark
        ? 'lib/highlight.js/github-dark.min.css'
        : 'lib/highlight.js/github.min.css';
    }
    await this.rerenderMermaid();
  }

  async rerenderMermaid() {
    if (typeof mermaid === 'undefined') return;
    const containers = this.preview.querySelectorAll('.mermaid-container');
    if (containers.length === 0) return;

    // 保存代码并创建全新容器（避免复用旧容器的渲染状态）
    const codes = [];
    const containerData = [];
    containers.forEach(container => {
      const code = container.getAttribute('data-code') || container.textContent;
      const sourceLine = container.getAttribute('data-source-line');
      codes.push(code);
      containerData.push({
        code,
        sourceLine,
        nextSibling: container.nextSibling,
        parent: container.parentNode,
      });
    });

    // 重建容器
    containerData.forEach((data, i) => {
      const newContainer = document.createElement('div');
      newContainer.className = 'mermaid-container';
      newContainer.id = 'mermaid-' + Date.now() + '-' + i;
      newContainer.setAttribute('data-code', data.code);
      if (data.sourceLine) newContainer.setAttribute('data-source-line', data.sourceLine);
      newContainer.textContent = data.code;
      if (data.nextSibling) {
        data.parent.insertBefore(newContainer, data.nextSibling);
      } else {
        data.parent.appendChild(newContainer);
      }
    });

    // 移除旧容器
    containers.forEach(c => c.remove());

    try {
      const newContainers = this.preview.querySelectorAll('.mermaid-container');
      if (newContainers.length === 0) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: this.isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-preview').trim() || '-apple-system, sans-serif',
      });
      await mermaid.run({ nodes: Array.from(newContainers) });
    } catch (e) {
      console.error('Mermaid re-render error:', e);
    }
  }

  showSettings() {
    document.getElementById('settings-dialog').classList.remove('hidden');
  }

  hideSettings() {
    document.getElementById('settings-dialog').classList.add('hidden');
  }

  async resetSettings() {
    const confirmed = await this.showConfirmDialog(
      this.t('settings'),
      this.t('confirmResetSettings')
    );
    if (!confirmed) return;

    const defaults = {
      fontSize: 14,
      tabSize: 2,
      lineWrap: true,
      lineNumbers: true,
      previewFontSize: 16,
      lineHeight: 1.7,
      maxWidth: 0,
      themeMode: 'light',
      colorScheme: 'default',
      fontScheme: 'classic-serif',
      defaultView: 'preview',
      scrollSync: true,
      language: 'zh',
      imageInsertMode: 'assets',
      imageAssetPath: 'assets',
      imageAssetPathMode: 'relative',
      outlineWidth: 240,
    };
    this.settings = defaults;
    localStorage.removeItem('tizumark-settings');

    document.getElementById('set-font-size').value = defaults.fontSize;
    document.getElementById('set-tab-size').value = defaults.tabSize;
    document.getElementById('set-line-wrap').checked = defaults.lineWrap;
    document.getElementById('set-line-numbers').checked = defaults.lineNumbers;
    document.getElementById('set-preview-font-size').value = defaults.previewFontSize;
    document.getElementById('set-line-height').value = defaults.lineHeight;
    document.getElementById('set-max-width').value = defaults.maxWidth;
    document.getElementById('set-theme-mode').value = defaults.themeMode;
    document.getElementById('set-color-scheme').value = defaults.colorScheme;
    document.getElementById('set-font-scheme').value = defaults.fontScheme;
    document.getElementById('set-default-view').value = defaults.defaultView;
    document.getElementById('set-scroll-sync').checked = defaults.scrollSync;
    document.getElementById('set-language').value = defaults.language;
    const defaultRadio = document.querySelector(`#settings-image-store-mode input[value="${defaults.imageInsertMode}"]`);
    if (defaultRadio) defaultRadio.checked = true;
    document.getElementById('settings-image-asset-path').value = defaults.imageAssetPath;
    const defaultPathRadio = document.querySelector(`#settings-image-asset-path-mode input[value="${defaults.imageAssetPathMode}"]`);
    if (defaultPathRadio) defaultPathRadio.checked = true;
    this.updateImageAssetPathHint();

    await this.applySettings();
    this.setStatus(this.t('settingsReset'));
  }

  updateImageAssetPathHint() {
    const mode = this.settings.imageAssetPathMode || 'relative';
    const hintEl = document.getElementById('setting-image-asset-path-hint-text');
    if (hintEl) {
      hintEl.textContent = mode === 'relative'
        ? this.t('imageAssetPathRelativeHint')
        : this.t('imageAssetPathAbsoluteHint');
    }
  }

  getImageAssetPath() {
    const mode = this.settings.imageAssetPathMode || 'relative';
    const path = this.settings.imageAssetPath || 'assets';
    if (mode === 'absolute') {
      return { assetsDir: path, refPrefix: path };
    }
    const tab = this.activeTab;
    const sep = tab && tab.filePath ? (tab.filePath.includes('/') ? '/' : '\\') : '/';
    const dir = tab && tab.filePath ? tab.filePath.substring(0, tab.filePath.lastIndexOf(sep)) : '';
    const assetsDir = dir ? dir + sep + path : path;
    return { assetsDir, refPrefix: path };
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
      bold: { key: 'Ctrl+B', label: '加粗' },
      italic: { key: 'Ctrl+I', label: '斜体' },
      insertLink: { key: 'Ctrl+K', label: '插入链接' },
    };
  }

  loadShortcuts() {
    const defaults = this.getDefaultShortcuts();
    try {
      const saved = JSON.parse(localStorage.getItem('tizumark-shortcuts'));
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  }

  saveShortcuts() {
    localStorage.setItem('tizumark-shortcuts', JSON.stringify(this.shortcuts));
  }

  resetShortcuts() {
    this.shortcuts = this.getDefaultShortcuts();
    localStorage.removeItem('tizumark-shortcuts');
    this.renderShortcutsList();
    this.applyShortcuts();
    this.setStatus(this.t('shortcutsReset'));
  }

  formatShortcutDisplay(key) {
    if (!key) return this.t('none');
    return key.split('+').map(k => `<kbd>${k}</kbd>`).join('<span class="key-separator">+</span>');
  }

  renderShortcutsList() {
    const container = document.getElementById('shortcuts-list');
    const labels = this.t('shortcutLabel');
    const actions = [
      { id: 'newFile', label: labels.newFile },
      { id: 'openFile', label: labels.openFile },
      { id: 'saveFile', label: labels.saveFile },
      { id: 'closeTab', label: labels.closeTab },
      { id: 'find', label: labels.find },
      { id: 'findReplace', label: labels.findReplace },
      { id: 'nextTab', label: labels.nextTab },
      { id: 'prevTab', label: labels.prevTab },
      { id: 'bold', label: labels.bold || 'Bold' },
      { id: 'italic', label: labels.italic || 'Italic' },
      { id: 'insertLink', label: labels.insertLink || 'Insert Link' },
    ];

    container.innerHTML = actions.map(action => {
      const shortcut = this.shortcuts[action.id];
      const isRecording = this.recordingAction === action.id;
      return `
        <div class="shortcut-row" data-action="${action.id}">
          <span class="shortcut-label">${action.label}</span>
          <div class="shortcut-actions">
            <div class="shortcut-key">${this.formatShortcutDisplay(shortcut.key)}</div>
            <button class="shortcut-record-btn${isRecording ? ' recording' : ''}" data-action="${action.id}">${isRecording ? this.t('pressKeys') : this.t('modify')}</button>
            <button class="shortcut-clear-btn" data-action="${action.id}">${this.t('clear')}</button>
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
      bold: () => this.wrapSelection('**', '**'),
      italic: () => this.wrapSelection('*', '*'),
      insertLink: () => this.showInsertLinkDialog(),
    };

    const toCmKey = (k) => k.replace(/\+/g, '-');

    const extraKeys = this.cm.getOption('extraKeys');
    for (const [action, fn] of Object.entries(map)) {
      const key = s[action]?.key;
      if (key) extraKeys[toCmKey(key)] = fn;
    }

    if (s.nextTab?.key) {
      const k = toCmKey(s.nextTab.key);
      extraKeys[k] = () => {
        const next = (this.activeTabIndex + 1) % this.tabs.length;
        this.switchTab(next);
      };
    }
    if (s.prevTab?.key) {
      const k = toCmKey(s.prevTab.key);
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

    this.cm.on('renderLine', (cm, line, el) => {
      if (line.text.length > 500 && line.text.includes('data:image/')) {
        el.classList.add('cm-base64-line');
      } else {
        el.classList.remove('cm-base64-line');
      }
    });

    this.cm.on('cursorActivity', () => {
      const cursor = this.cm.getCursor();
      this.activeTab.cursorPos = cursor;
      this.cursorPosition.textContent = this.t('cursorPos', { line: cursor.line + 1, col: cursor.ch + 1 });
    });

    // 双标志锁机制（demo 风格：canScroll.editor / canScroll.showDom）
    this._canScroll = { editor: true, preview: true };
    this._scrollThrottlePending = null;
    this._scrollThrottleTimer = null;
    this._scrollDebounceTimer = null;

    // 编辑器滚动 → 同步预览（demo 的 onScroll 思路）
    this.cm.on('scroll', () => {
      const info = this.cm.getScrollInfo();
      this.activeTab.scrollPos = { top: info.top, left: info.left };

      if (!this.settings.scrollSync || !this._canScroll.editor) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;

      this._canScroll.preview = false;
      this._throttleScroll(() => this._syncEditorToPreview(), 50);
      this._debounceScroll(() => this._resumeScroll(), 100);
    });

    // 预览滚动 → 同步编辑器（demo 的 onScroll 思路，方向相反）
    this.preview.addEventListener('scroll', () => {
      if (!this.settings.scrollSync || !this._canScroll.preview) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;

      this._canScroll.editor = false;
      this._throttleScroll(() => this._syncPreviewToEditor(), 50);
      this._debounceScroll(() => this._resumeScroll(), 100);
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

  addTab(name = '', content = '', filePath = null) {
    const defaultName = this.t('untitled');
    if (!name || name === defaultName) {
      name = `${defaultName}${this.untitledCounter++}`;
    }
    content = content.replace(/\r\n/g, '\n');
    const tab = new Tab(name, content, filePath);
    this.tabs.push(tab);
    this.switchTab(this.tabs.length - 1);
    this.updateTabBar();
  }

  async closeTab(index) {
    if (index < 0 || index >= this.tabs.length) return;

    const tab = this.tabs[index];
    if (tab.isModified) {
      const result = await this.showSaveDialog(this.t('saveChanges'), `${tab.name} ${this.t('fileModified')}`);
      if (result === 'cancel') return;
      if (result === 'save') {
        const savedIndex = this.tabs.indexOf(tab);
        if (savedIndex === -1) return;
        try {
          if (!tab.filePath) {
            const path = await dialogSave({
              filters: [
                { name: 'Markdown', extensions: ['md'] },
                { name: this.t('allFiles'), extensions: ['*'] }
              ]
            });
            if (!path) return;
            tab.filePath = path;
            tab.name = path.split(/[/\\]/).pop();
          }
          await invoke('write_file', { path: tab.filePath, content: tab.content });
          tab.savedContent = tab.content;
          this.setStatus(`${this.t('saved')}: ${tab.filePath}`);
        } catch (error) {
          this.setStatus(`${this.t('saveFailed')}: ${error}`);
          return;
        }
      }
    }

    const removeIndex = this.tabs.indexOf(tab);
    if (removeIndex === -1) return;

    this.tabs.splice(removeIndex, 1);
    if (this.tabs.length === 0) {
      this.tabs.push(new Tab(`${this.t('untitled')}${this.untitledCounter++}`));
      this.activeTabIndex = 0;
      this.cm.setValue('');
    } else {
      if (removeIndex < this.activeTabIndex) {
        this.activeTabIndex--;
      } else if (this.activeTabIndex >= this.tabs.length) {
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
      tabEl.setAttribute('role', 'tab');
      tabEl.setAttribute('aria-selected', i === this.activeTabIndex ? 'true' : 'false');

      const nameSpan = document.createElement('span');
      nameSpan.className = 'tab-name';
      nameSpan.textContent = tab.name;
      tabEl.appendChild(nameSpan);

      if (this.tabs.length > 1) {
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tab-close';
        closeBtn.textContent = '\u00d7';
        closeBtn.setAttribute('role', 'button');
        closeBtn.setAttribute('aria-label', this.t('closeAria'));
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
    // Refresh scroll arrows after tabs change
    if (this.updateTabScrollArrows) this.updateTabScrollArrows();
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
    document.getElementById('btn-check-update').addEventListener('click', () => {
      document.getElementById('help-menu').classList.add('hidden');
      this.checkUpdate(true);
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
    document.getElementById('update-close').addEventListener('click', () => this.hideUpdateDialog());
    document.getElementById('update-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'update-dialog') this.hideUpdateDialog();
    });
    document.getElementById('update-action').addEventListener('click', () => this.handleUpdateAction());
    document.getElementById('update-skip').addEventListener('click', () => this.hideUpdateDialog());
    document.getElementById('gitee-badge').addEventListener('click', () => {
      const url = document.getElementById('gitee-badge').dataset.url;
      if (url) this.openExternal(url);
    });
    document.getElementById('qq-group-badge').addEventListener('click', () => {
      const badge = document.getElementById('qq-group-badge');
      const url = badge.dataset.joinUrl;
      if (url && !url.includes('YOUR_JOIN_KEY')) {
        this.openExternal(url);
      }
    });
    document.getElementById('github-badge').addEventListener('click', () => {
      const url = document.getElementById('github-badge').dataset.url;
      if (url) this.openExternal(url);
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

      if (/^F(1[0-2]|[1-9])$/.test(e.key)) {
        e.preventDefault();
        return;
      }

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
      if (ctrl && ['r', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }

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
        const editorRatio = editorPercent / 100;
        const previewRatio = 1 - editorRatio;
        editorPane.style.flex = editorRatio.toFixed(4) + ' 0 0px';
        previewPane.style.flex = previewRatio.toFixed(4) + ' 0 0px';
        editorPane.style.width = '';
        previewPane.style.width = '';
        this._editorPercent = editorPercent;
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
      findCount.textContent = count > 0 ? count + this.t('matches') : this.t('noMatches');
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
      previewFindCount.textContent = count > 0 ? count + this.t('matches') : this.t('noMatches');
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
          range.startContainer.parentElement.scrollIntoView({ behavior: 'auto', block: 'center' });
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
      this.preview.scrollTo({ top: 0, behavior: 'auto' });
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
        const id = href.substring(1);
        const target = this.preview.querySelector(`#${CSS.escape(id)}`);
        if (target) {
          const previewHeight = this.preview.clientHeight;
          const targetRect = target.getBoundingClientRect();
          const previewRect = this.preview.getBoundingClientRect();
          const top = targetRect.top - previewRect.top + this.preview.scrollTop
                    - (previewHeight / 2) + (targetRect.height / 2);
          this.preview.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
          target.classList.add('footnote-flash');
          setTimeout(() => target.classList.remove('footnote-flash'), 1300);
        }
        return;
      }

      if (href.endsWith('.md')) {
        try {
          if (href.startsWith('http://') || href.startsWith('https://')) {
            const resp = await fetch(href);
            if (resp.ok) {
              const content = await resp.text();
              const name = href.split('/').pop();
              this.addTab(name, content, null);
              this.activeTab.savedContent = content;
              this.updateTabDisplay();
              return;
            }
          } else {
            try {
              const resp = await fetch(href);
              if (resp.ok) {
                const content = await resp.text();
                const name = href.split(/[/\\]/).pop();
                this.addTab(name, content, null);
                this.activeTab.savedContent = content;
                this.updateTabDisplay();
                return;
              }
            } catch (_) {}
            if (window.__TAURI__) {
              const content = await invoke('read_file', { path: href });
              const name = href.split(/[/\\]/).pop();
              this.addTab(name, content, href);
              this.activeTab.savedContent = content;
              this.updateTabDisplay();
              return;
            }
          }
        } catch (_) {}
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
    const dragOverlay = document.getElementById('drag-overlay');

    if (window.__TAURI__ && window.__TAURI__.event) {
      window.__TAURI__.event.listen('tauri://drag-enter', (e) => {
        if (e.payload && e.payload.paths && e.payload.paths.length > 0) {
          app.classList.add('drag-over');
          dragOverlay.classList.remove('hidden');
        }
      });

      window.__TAURI__.event.listen('tauri://drag-over', (e) => {
        if (e.payload && e.payload.paths && e.payload.paths.length > 0) {
          app.classList.add('drag-over');
          dragOverlay.classList.remove('hidden');
        }
      });

      window.__TAURI__.event.listen('tauri://drag-drop', async (event) => {
        app.classList.remove('drag-over');
        dragOverlay.classList.add('hidden');
        this.showLoading();
        try {
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
              this.setStatus(`${this.t('opened')}: ${name}`);
            } catch (err) {
              this.setStatus(`${this.t('openFailed')}: ${err}`);
            }
          }
        } finally {
          this.hideLoading();
        }
      });

      window.__TAURI__.event.listen('tauri://drag-leave', () => {
        app.classList.remove('drag-over');
        dragOverlay.classList.add('hidden');
      });
    } else {
      app.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes('Files')) {
          app.classList.add('drag-over');
          dragOverlay.classList.remove('hidden');
        }
      });

      app.addEventListener('dragleave', (e) => {
        if (!app.contains(e.relatedTarget)) {
          app.classList.remove('drag-over');
          dragOverlay.classList.add('hidden');
        }
      });

      app.addEventListener('drop', async (e) => {
        e.preventDefault();
        app.classList.remove('drag-over');
        dragOverlay.classList.add('hidden');
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
            this.setStatus(`${this.t('opened')}: ${file.name}`);
          } catch (err) {
            this.setStatus(`${this.t('openFailed')}: ${err}`);
          }
        }
      });
    }
  }

  showSaveDialog(title, message, saveLabel, discardLabel, cancelLabel) {
    return new Promise((resolve) => {
      const dialog = document.getElementById('save-dialog');
      const titleEl = document.getElementById('save-dialog-title');
      const msgEl = document.getElementById('save-dialog-message');
      const saveBtn = document.getElementById('save-dialog-save');
      const discardBtn = document.getElementById('save-dialog-discard');
      const cancelBtn = document.getElementById('save-dialog-cancel');

      const origTitle = titleEl.textContent;
      const origMsg = msgEl.textContent;
      const origSave = saveBtn.textContent;
      const origDiscard = discardBtn.textContent;
      const origCancel = cancelBtn.textContent;

      if (title !== undefined) titleEl.textContent = title;
      if (message !== undefined) msgEl.textContent = message;
      if (saveLabel) saveBtn.textContent = saveLabel;
      if (discardLabel) discardBtn.textContent = discardLabel;
      if (cancelLabel) cancelBtn.textContent = cancelLabel;
      dialog.classList.remove('hidden');

      const onSave = () => {
        cleanup();
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
        titleEl.textContent = origTitle;
        msgEl.textContent = origMsg;
        saveBtn.textContent = origSave;
        discardBtn.textContent = origDiscard;
        cancelBtn.textContent = origCancel;
        saveBtn.removeEventListener('click', onSave);
        discardBtn.removeEventListener('click', onDiscard);
        cancelBtn.removeEventListener('click', onCancel);
      };

      saveBtn.addEventListener('click', onSave);
      discardBtn.addEventListener('click', onDiscard);
      cancelBtn.addEventListener('click', onCancel);
    });
  }

  showConfirmDialog(title, message) {
    return new Promise((resolve) => {
      const dialog = document.getElementById('confirm-dialog');
      document.getElementById('confirm-dialog-title').textContent = title || this.t('confirm');
      document.getElementById('confirm-dialog-message').textContent = message || '';
      dialog.classList.remove('hidden');

      const onConfirm = () => {
        cleanup();
        resolve(true);
      };
      const onCancel = () => {
        cleanup();
        resolve(false);
      };
      const cleanup = () => {
        dialog.classList.add('hidden');
        document.getElementById('confirm-dialog-confirm').removeEventListener('click', onConfirm);
        document.getElementById('confirm-dialog-cancel').removeEventListener('click', onCancel);
      };

      document.getElementById('confirm-dialog-confirm').addEventListener('click', onConfirm);
      document.getElementById('confirm-dialog-cancel').addEventListener('click', onCancel);
    });
  }

  initInsertDialogs() {
    // Insert Link dialog
    document.getElementById('insert-link-ok').addEventListener('click', () => {
      const text = document.getElementById('insert-link-text').value.trim();
      const url = document.getElementById('insert-link-url').value.trim();
      if (!url) return;
      const linkText = text || url;
      const sel = this.cm.getSelection();
      if (sel) {
        this.cm.replaceSelection(`[${sel}](${url})`);
      } else {
        this.insertAtCursor(`[${linkText}](${url})`, linkText.length + 3);
      }
      this.hideInsertLinkDialog();
      this.cm.focus();
    });
    document.getElementById('insert-link-cancel').addEventListener('click', () => this.hideInsertLinkDialog());
    document.getElementById('insert-link-close').addEventListener('click', () => this.hideInsertLinkDialog());
    document.getElementById('insert-link-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'insert-link-dialog') this.hideInsertLinkDialog();
    });
    document.getElementById('insert-link-url').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('insert-link-ok').click();
    });
    document.getElementById('insert-link-text').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('insert-link-ok').click();
    });

    // Insert Image dialog
    const sourceSelect = document.getElementById('insert-image-source');
    sourceSelect.addEventListener('change', () => {
      const isLocal = sourceSelect.value === 'local';
      document.getElementById('insert-image-local-field').classList.toggle('hidden', !isLocal);
      document.getElementById('insert-image-alt-field').classList.toggle('hidden', !isLocal);
      document.getElementById('insert-image-web-field').classList.toggle('hidden', isLocal);
    });
    document.getElementById('insert-image-browse').addEventListener('click', async () => {
      try {
        const selected = await dialogOpen({
          multiple: false,
          filters: [
            { name: this.t('imageLocal'), extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'ico'] }
          ]
        });
        if (selected) {
          document.getElementById('insert-image-file').value = selected;
        }
      } catch (_) {}
    });
    document.querySelector('#insert-image-alt-hint .hint-text').textContent = this.t('imageAltHint');
    document.querySelector('#insert-image-store-hint .hint-text').textContent = this.t('imageStoreModeHint');
    document.getElementById('insert-image-ok').addEventListener('click', () => this.handleInsertImageOk());
    document.getElementById('insert-image-cancel').addEventListener('click', () => this.hideInsertImageDialog());
    document.getElementById('insert-image-close').addEventListener('click', () => this.hideInsertImageDialog());
    document.getElementById('insert-image-dialog').addEventListener('click', (e) => {
      if (e.target.id === 'insert-image-dialog') this.hideInsertImageDialog();
    });
  }

  initImagePaste() {
    const wrapper = document.getElementById('editor-wrapper');
    if (!wrapper) return;
    wrapper.addEventListener('paste', (e) => {
      const items = Array.from(e.clipboardData.items).filter(i => i.type.startsWith('image/'));
      if (items.length === 0) return;
      e.preventDefault();
      for (const item of items) {
        const file = item.getAsFile();
        if (file) {
          this.handlePasteImage(file).catch(err => {
            this.setStatus(this.t('imagePasteFailed') + ': ' + err);
          });
        } else {
          this.showToast('无法读取剪贴板图片');
        }
      }
    });
  }

  showInsertLinkDialog() {
    const sel = this.cm.getSelection();
    document.getElementById('insert-link-text').value = sel || '';
    document.getElementById('insert-link-url').value = '';
    // Clipboard URL detection
    try {
      navigator.clipboard.readText().then(text => {
        if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
          document.getElementById('insert-link-url').value = text;
          const textInput = document.getElementById('insert-link-text');
          if (!textInput.value) {
            textInput.placeholder = this.t('linkAutoDetected');
          }
        }
      }).catch(() => {});
    } catch (_) {}
    document.getElementById('insert-link-dialog').classList.remove('hidden');
    setTimeout(() => document.getElementById('insert-link-text').focus(), 100);
  }

  hideInsertLinkDialog() {
    document.getElementById('insert-link-dialog').classList.add('hidden');
  }

  showInsertImageDialog() {
    document.getElementById('insert-image-source').value = 'local';
    document.getElementById('insert-image-local-field').classList.remove('hidden');
    document.getElementById('insert-image-alt-field').classList.remove('hidden');
    document.getElementById('insert-image-web-field').classList.add('hidden');
    document.getElementById('insert-image-file').value = '';
    document.getElementById('insert-image-url').value = '';
    document.getElementById('insert-image-alt').value = '';
    document.querySelector('#insert-image-alt-hint .hint-text').textContent = this.t('imageAltHint');
    document.querySelector('#insert-image-store-hint .hint-text').textContent = this.t('imageStoreModeHint');
    document.getElementById('insert-image-dialog').classList.remove('hidden');
    setTimeout(() => {
      const browseBtn = document.getElementById('insert-image-browse');
      if (browseBtn) browseBtn.focus();
    }, 100);
  }

  hideInsertImageDialog() {
    document.getElementById('insert-image-dialog').classList.add('hidden');
  }

  async handleInsertImageOk() {
    const alt = document.getElementById('insert-image-alt').value.trim();
    const localField = document.getElementById('insert-image-local-field');
    const isLocal = !localField.classList.contains('hidden');

    if (isLocal) {
      const filePath = document.getElementById('insert-image-file').value.trim();
      if (!filePath) {
        this.showToast(this.t('imageFileRequired'));
        return;
      }
      const storeMode = this.settings.imageInsertMode || 'assets';

      if (storeMode === 'assets') {
        if (!this.activeTab || !this.activeTab.filePath) {
          this.showToast(this.t('needSaveFirst'));
          return;
        }
        await this.insertLocalImageAssets(filePath, alt);
      } else {
        await this.insertLocalImageBase64(filePath, alt);
      }
    } else {
      const url = document.getElementById('insert-image-url').value.trim();
      if (!url) {
        this.showToast(this.t('imageUrlRequired'));
        return;
      }
      this.insertImageBlock(`![${alt || 'image'}](${url})`);
    }
    this.hideInsertImageDialog();
    this.cm.focus();
  }

  async insertLocalImageAssets(filePath, alt) {
    const tab = this.activeTab;
    if (!tab.filePath) {
      this.setStatus(this.t('needSaveFirst'));
      return;
    }
    const { assetsDir, refPrefix } = this.getImageAssetPath();
    const extMatch = filePath.match(/\.([^.]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'png';
    try {
      const content = await invoke('fetch_image_as_base64', { url: filePath });
      const bytes = Uint8Array.from(atob(content), c => c.charCodeAt(0));
      const info = await invoke('save_image_to_assets', { bytes: Array.from(bytes), ext, assetsDir });
      const src = refPrefix + '/' + info.filename;
      const w = info.width || '';
      const h = info.height || '';
      const dimAttr = w ? ` width="${w}" height="${h}"` : '';
      const imgTag = `<img src="${src}"${dimAttr} alt="${alt || info.filename}">`;
      this.insertImageBlock(imgTag);
      this.setStatus(this.t('imagePasted'));
    } catch (err) {
      this.showToast(this.t('imagePasteFailed') + ': ' + err);
    }
  }

  async insertLocalImageBase64(filePath, alt) {
    try {
      const base64 = await invoke('fetch_image_as_base64', { url: filePath });
      const extMatch = filePath.match(/\.([^.]+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'png';
      let mime = 'image/png';
      if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
      else if (ext === 'gif') mime = 'image/gif';
      else if (ext === 'svg') mime = 'image/svg+xml';
      else if (ext === 'webp') mime = 'image/webp';
      else if (ext === 'bmp') mime = 'image/bmp';
      else if (ext === 'ico') mime = 'image/x-icon';
      const dataUrl = `data:${mime};base64,${base64}`;
      this.insertImageBlock(`![${alt || 'image'}](${dataUrl})`);
      this.setStatus(this.t('imagePasted'));
    } catch (err) {
      this.showToast(this.t('imagePasteFailed') + ': ' + err);
    }
  }

  async handlePasteImage(file) {
    const mode = this.settings.imageInsertMode || 'assets';
    if (mode === 'assets') {
      if (!this.activeTab || !this.activeTab.filePath) {
        this.showToast(this.t('needSaveFirst'));
        return;
      }
      const { assetsDir, refPrefix } = this.getImageAssetPath();
      const ext = file.type.split('/')[1] || 'png';
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const info = await invoke('save_image_to_assets', { bytes: Array.from(bytes), ext, assetsDir });
      const alt = 'image';
      const src = refPrefix + '/' + info.filename;
      const w = info.width || '';
      const h = info.height || '';
      const dimAttr = w ? ` width="${w}" height="${h}"` : '';
      this.insertImageBlock(`<img src="${src}"${dimAttr} alt="${alt}">`);
      this.setStatus(this.t('imagePasted'));
    } else {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const mime = file.type || 'image/png';
      const dataUrl = `data:${mime};base64,${base64}`;
      this.insertImageBlock(`![image](${dataUrl})`);
      this.setStatus(this.t('imagePasted'));
    }
  }

  newFile() {
    this.setViewMode('edit');
    this.addTab(this.t('untitled'), '', null);
    this.setStatus(this.t('newFileCreated'));
  }

  async openFile() {
    try {
      const selected = await dialogOpen({
        multiple: true,
        filters: [
          { name: 'Markdown', extensions: ['md', 'markdown', 'txt'] },
          { name: this.t('allFiles'), extensions: ['*'] }
        ]
      });

      if (!selected) return;
      this.showLoading();
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
      this.setStatus(openedCount > 0 ? this.t('openedFiles', { n: openedCount }) : this.t('alreadyOpen'));
    } catch (error) {
      this.setStatus(`${this.t('openFailed')}: ${error}`);
    } finally {
      this.hideLoading();
    }
  }

  async saveFile() {
    try {
      let path = this.activeTab.filePath;
      if (!path) {
        path = await dialogSave({
          filters: [
            { name: 'Markdown', extensions: ['md'] },
            { name: this.t('allFiles'), extensions: ['*'] }
          ]
        });
        if (!path) return;
      }

      await invoke('write_file', { path, content: this.activeTab.content });
      if (!this.activeTab.filePath) {
        this.activeTab.filePath = path;
        this.activeTab.name = path.split(/[/\\]/).pop();
      }
      this.activeTab.savedContent = this.activeTab.content;
      this.updateTabDisplay();
      this.setStatus(`${this.t('saved')}: ${this.activeTab.filePath}`);
    } catch (error) {
      this.setStatus(`${this.t('saveFailed')}: ${error}`);
    }
  }

  async saveAsFile() {
    try {
      const path = await dialogSave({
        defaultPath: this.activeTab.filePath || `${this.activeTab.name}`,
        filters: [
          { name: 'Markdown', extensions: ['md'] },
          { name: this.t('allFiles'), extensions: ['*'] }
        ]
      });
      if (!path) return;

      await invoke('write_file', { path, content: this.activeTab.content });
      this.activeTab.filePath = path;
      this.activeTab.name = path.split(/[/\\]/).pop();
      this.activeTab.savedContent = this.activeTab.content;
      this.updateTabBar();
      this.setStatus(`${this.t('savedAs')}: ${path}`);
    } catch (error) {
      this.setStatus(`${this.t('saveFailed')}: ${error}`);
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

      const clone = this.preview.cloneNode(true);
      clone.style.position = '';
      clone.style.left = '';
      clone.style.top = '';
      clone.style.width = '';
      clone.style.padding = '';
      clone.style.overflow = '';
      clone.style.height = '';

      clone.querySelectorAll('.copy-btn').forEach(el => el.remove());
      const abbrData = clone.querySelector('#abbr-data');
      if (abbrData) abbrData.remove();

      const filePath = this.activeTab.filePath;
      if (filePath) {
        const dir = filePath.replace(/[/\\][^/\\]*$/, '');
        const imgPromises = Array.from(clone.querySelectorAll('img')).map(async (img) => {
          let src = img.getAttribute('src');
          if (!src || src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('file://')) return;
          if (src.startsWith('/')) src = src.slice(1);
          try {
            const base64 = await invoke('fetch_image_as_base64', { url: dir + '/' + src });
            const ext = src.split('.').pop().toLowerCase();
            let mime = 'image/png';
            if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
            else if (ext === 'gif') mime = 'image/gif';
            else if (ext === 'svg') mime = 'image/svg+xml';
            else if (ext === 'webp') mime = 'image/webp';
            img.src = `data:${mime};base64,${base64}`;
          } catch (e) { /* skip unresolvable images */ }
        });
        await Promise.allSettled(imgPromises);
      }

      let katexCSS = '';
      try {
        const resp = await fetch('lib/katex/katex.min.css');
        if (resp.ok) katexCSS = await resp.text();
      } catch (e) { /* skip */ }

      let hljsCSS = '';
      try {
        const themeLink = document.getElementById('highlight-theme');
        if (themeLink) {
          const resp = await fetch(themeLink.getAttribute('href'));
          if (resp.ok) hljsCSS = await resp.text();
        }
      } catch (e) { /* skip */ }

      const escapedTitle = this.activeTab.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${escapedTitle}</title>
  <style>
    body { max-width: 860px; margin: 0 auto; padding: 40px 20px; line-height: 1.8; color: #2a2a2e; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 12px; font-weight: 600; line-height: 1.3; }
    h1 { font-size: 2em; border-bottom: 2px solid #d4d4d8; padding-bottom: 10px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #d4d4d8; padding-bottom: 8px; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1.1em; }
    h5 { font-size: 1em; color: #5e5e62; }
    h6 { font-size: 0.9em; color: #5e5e62; }
    p { margin-bottom: 14px; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { font-weight: 600; }
    em { font-style: italic; }
    del { text-decoration: line-through; color: #5e5e62; }
    code { padding: 2px 6px; background: #f0efee; border: 1px solid #d4d4d8; border-radius: 4px; font-family: "SF Mono", "Fira Code", monospace; font-size: 0.88em; }
    pre { padding: 16px; background: #f0efee; border-radius: 6px; overflow-x: auto; margin: 16px 0; max-width: 100%; border: 1px solid #d4d4d8; }
    pre code { padding: 0; background: none; border: none; font-size: 0.9em; line-height: 1.5; }
    blockquote { padding: 12px 20px; margin: 0 0 16px 0; border-left: 4px solid #2563eb; background: #f6f5f4; border-radius: 0 6px 6px 0; color: #5e5e62; }
    blockquote p:last-child { margin-bottom: 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
    th, td { padding: 8px 12px; border: 1px solid #d4d4d8; text-align: left; }
    th { background: #f0efee; font-weight: 600; }
    img { max-width: 100%; }
    hr { border: none; border-top: 1px solid #d4d4d8; margin: 24px 0; }
    ul, ol { padding-left: 24px; margin-bottom: 14px; }
    li { margin-bottom: 4px; }
    mark { display: inline-block; background: #fbbf24; color: #1a1a1a; padding: 1px 4px; border-radius: 3px; }
    kbd { display: inline-block; padding: 2px 7px; font-size: 0.82em; font-family: "SF Mono", "Fira Code", monospace; background: #f0efee; border: 1px solid #d4d4d8; border-bottom-width: 2px; border-radius: 4px; line-height: 1.5; }
    abbr { text-decoration: underline dotted; cursor: help; }
    .mermaid-container { text-align: center; margin: 16px 0; padding: 16px; max-width: 100%; background: #f0efee; border-radius: 8px; border: 1px solid #d4d4d8; overflow-x: auto; }
    .mermaid-container svg { max-width: 100%; height: auto; }
    .alert { border-radius: 10px; padding: 14px 18px; margin: 16px 0; max-width: 100%; border-left: 4px solid; overflow-wrap: break-word; }
    .alert-title { font-weight: 700; margin-bottom: 6px; font-size: 0.95em; display: flex; align-items: center; gap: 8px; }
    .alert-icon { width: 18px; height: 18px; flex-shrink: 0; }
    .alert-content p:last-child { margin-bottom: 0; }
    .alert-note { background: rgba(56,132,255,0.06); border-left-color: #3884ff; }
    .alert-tip { background: rgba(16,185,129,0.06); border-left-color: #10b981; }
    .alert-important { background: rgba(139,92,246,0.06); border-left-color: #8b5cf6; }
    .alert-warning { background: rgba(245,158,11,0.06); border-left-color: #f59e0b; }
    .alert-caution { background: rgba(239,68,68,0.06); border-left-color: #ef4444; }
    .math-display { display: block; text-align: center; margin: 16px 0; overflow-x: auto; }
    .toc-wrapper { padding: 12px 16px; margin: 16px 0; background: #f6f5f4; border-radius: 8px; border: 1px solid #d4d4d8; }
    .toc-list ul { list-style: none; padding-left: 16px; margin: 2px 0; }
    .toc-list li { margin-bottom: 3px; line-height: 1.6; }
    .toc a { color: #2563eb; text-decoration: underline; font-size: 0.92em; }
    input[type="checkbox"] { -webkit-appearance: none; appearance: none; margin-right: 8px; width: 16px; height: 16px; border: 1.5px solid #d4d4d8; border-radius: 3px; vertical-align: middle; position: relative; top: -1px; cursor: default; }
    input[type="checkbox"]:checked { background: #16a34a; border-color: #16a34a; }
    input[type="checkbox"]:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 5px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
    details { margin-bottom: 14px; padding: 8px 12px; background: #f6f5f4; border-radius: 6px; border: 1px solid #d4d4d8; }
    summary { font-weight: 600; cursor: pointer; }
${katexCSS ? katexCSS + '\n' : ''}${hljsCSS ? hljsCSS : ''}
  </style>
</head>
<body>
${clone.innerHTML}
</body>
</html>`;

      await invoke('write_file', { path, content: fullHTML });
      this.setStatus(`${this.t('exportedHTML')}: ${path}`);
    } catch (error) {
      this.setStatus(`${this.t('exportFailed')}: ${error}`);
    }
  }

  async exportImage() {
    if (typeof html2canvas === 'undefined') {
      this.setStatus(`${this.t('exportFailed')}: html2canvas not loaded`);
      return;
    }

    let clone = null;
    try {
      this.setStatus(this.t('generatingImg'));

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
          img.alt = this.t('imageLoadFailed');
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

      this.setStatus(`${this.t('exportedImg')}: ${result}`);
    } catch (error) {
      this.setStatus(`${this.t('exportFailed')}: ${error}`);
    } finally {
      if (clone && clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    }
  }

  debounceUpdatePreview() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updatePreview(), 30);
  }

  // 按空行切分为逻辑块，跟踪围栏代码块（内部不切分）
  parseBlocks(content) {
    const lines = content.split('\n');
    const blocks = [];
    let inFence = false;
    let fenceChar = '';
    let fenceCount = 0;
    let blockStart = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!inFence && (trimmed.startsWith('```') || trimmed.startsWith('~~~'))) {
        const fc = trimmed[0];
        const match = trimmed.match(new RegExp('^\\' + fc + '{3,}'));
        if (match) {
          inFence = true;
          fenceChar = fc;
          fenceCount = match[0].length;
          if (blockStart >= 0) {
            blocks.push({ startLine: blockStart, endLine: i - 1 });
            blockStart = -1;
          }
          blockStart = i;
          continue;
        }
      }

      if (inFence) {
        if (trimmed.startsWith(fenceChar)) {
          const match = trimmed.match(new RegExp('^\\' + fenceChar + '{' + fenceCount + ',}'));
          if (match && trimmed.replace(match[0], '').trim() === '') {
            blocks.push({ startLine: blockStart, endLine: i });
            blockStart = -1;
            inFence = false;
          }
        }
        continue;
      }

      if (trimmed === '') {
        if (blockStart >= 0) {
          blocks.push({ startLine: blockStart, endLine: i - 1 });
          blockStart = -1;
        }
      } else if (blockStart < 0) {
        blockStart = i;
      }
    }

    if (blockStart >= 0) {
      blocks.push({ startLine: blockStart, endLine: lines.length - 1 });
    }

    return blocks;
  }

  // 遍历预览 DOM，收集所有块级渲染元素（用于比例映射）
  collectBlockElements(root) {
    const blockTags = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE', 'TABLE', 'UL', 'OL', 'BLOCKQUOTE', 'HR', 'DETAILS', 'DIV']);
    const result = [];
    const walk = (el) => {
      if (!el || !el.children) return;
      for (const child of el.children) {
        if (blockTags.has(child.tagName)) {
          result.push(child);
        } else if (child.tagName === 'IMG') {
          result.push(child);
        } else {
          walk(child);
        }
      }
    };
    walk(root);
    return result;
  }

  // 去掉 markdown 语法，提取用于匹配的纯文本关键词
  cleanMarkdownForSearch(text) {
    return text
      .replace(/^#{1,6}\s*/, '')
      .replace(/^[-*+]\s+/, '')
      .replace(/^>\s*/, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/~~(.+?)~~/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/!\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/^\d+\.\s+/, '')
      .trim();
  }

  // 从预览元素获取对应的源文件行号（通过 unified 嵌入的 data-source-line）
  _getSourceLine(el) {
    if (el.dataset && el.dataset.sourceLine) {
      return parseInt(el.dataset.sourceLine, 10);
    }
    const inner = el.querySelector('[data-source-line]');
    if (inner) {
      return parseInt(inner.dataset.sourceLine, 10);
    }
    return null;
  }

  // 构建逐行密集位置映射（纯线性插值，无速度限制）
  // 每个编辑器行都有精确的 previewTop 插值
  _computedPosition() {
    const allElements = this.preview.querySelectorAll('[data-source-line]');
    const anchors = [];
    const seenLines = new Set();

    for (const el of allElements) {
      // 跳过脚注区域内的元素（source line 在文档中部但渲染在预览最底部）
      if (el.closest('.footnotes')) continue;

      const sourceLine = parseInt(el.dataset.sourceLine, 10);
      if (isNaN(sourceLine)) continue;
      if (seenLines.has(sourceLine)) continue;
      seenLines.add(sourceLine);

      const editorTop = this.cm.heightAtLine(Math.max(0, sourceLine - 1), 'local');
      const previewTop = this._getOffsetTop(el);
      if (typeof editorTop !== 'number' || typeof previewTop !== 'number') continue;

      anchors.push({ line: sourceLine, editorTop, previewTop });
    }

    if (anchors.length < 2) {
      this._editorElementList = null;
      this._previewElementList = null;
      return;
    }

    anchors.sort((a, b) => a.line - b.line);

    // 过滤非单调锚点（只检查 editorTop）
    const clean = [anchors[0]];
    for (let i = 1; i < anchors.length; i++) {
      if (anchors[i].editorTop > clean[clean.length - 1].editorTop) {
        clean.push(anchors[i]);
      }
    }

    if (clean.length < 2) {
      this._editorElementList = null;
      this._previewElementList = null;
      return;
    }

    // 逐行构建密集数组
    const totalLines = this.cm.lineCount();
    const editorList = new Array(totalLines);
    const rawPreviewList = new Array(totalLines);
    let anchorIdx = 0;

    for (let line = 0; line < totalLines; line++) {
      editorList[line] = this.cm.heightAtLine(line, 'local');
      const sourceLine = line + 1;

      while (anchorIdx + 1 < clean.length && clean[anchorIdx + 1].line <= sourceLine) {
        anchorIdx++;
      }

      if (anchorIdx >= clean.length - 1) {
        const last = clean[clean.length - 1];
        rawPreviewList[line] = last.previewTop + Math.max(0, sourceLine - last.line) * 20;
      } else {
        const a1 = clean[anchorIdx];
        const a2 = clean[anchorIdx + 1];
        const lineGap = a2.line - a1.line;
        if (lineGap <= 0) {
          rawPreviewList[line] = a1.previewTop;
        } else {
          rawPreviewList[line] = a1.previewTop + (sourceLine - a1.line) / lineGap * (a2.previewTop - a1.previewTop);
        }
      }
    }

    this._editorElementList = editorList;
    this._previewElementList = rawPreviewList;
  }

  // 根据 unified 渲染结果重建滚动同步数据（仅在内容变化时调用）
  rebuildScrollSync() {
    const content = this.cm.getValue();
    const totalLines = content.split('\n').length;

    // 构建平行位置数组（使用 data-source-line）
    this._computedPosition();

    // 生成 _linePositions（兼容 updatePreview 滚动恢复）
    const allElements = this.preview.querySelectorAll('[data-source-line]');
    const previewRect = this.preview.getBoundingClientRect();
    const st = this.preview.scrollTop;
    const sh = this.preview.scrollHeight || 1;
    const positions = [{ line: 0, fraction: 0 }];
    const seen = new Set();

    for (const child of allElements) {
      const sourceLine = parseInt(child.dataset.sourceLine, 10);
      if (isNaN(sourceLine)) continue;
      if (seen.has(sourceLine)) continue;
      seen.add(sourceLine);

      const rect = child.getBoundingClientRect();
      const elTop = rect.top - previewRect.top + st;
      const elBottom = elTop + child.offsetHeight;

      positions.push({ line: sourceLine, fraction: Math.min(Math.max(elTop / sh, 0), 1) });
      positions.push({ line: sourceLine + 1, fraction: Math.min(Math.max(elBottom / sh, 0), 1) });
    }

    positions.push({ line: totalLines - 1, fraction: 1 });
    positions.sort((a, b) => a.line - b.line);

    const deduped = [];
    let lastLine = -1;
    for (const p of positions) {
      if (p.line !== lastLine) {
        deduped.push(p);
        lastLine = p.line;
      }
    }
    if (deduped.length === 0 || deduped[0].line > 0) deduped.unshift({ line: 0, fraction: 0 });
    if (deduped[deduped.length - 1].line < totalLines - 1) deduped.push({ line: totalLines - 1, fraction: 1 });
    this._linePositions = deduped;
  }

  // demo 的 getHeightToTop：计算元素到容器顶部的距离（offsetTop 遍历 offsetParent）
  _getOffsetTop(el) {
    let top = el.offsetTop;
    let parent = el.offsetParent;
    while (parent && parent !== this.preview) {
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return top;
  }

  // demo 风格：节流函数（首次立即执行，后续在 delay 内只保存最后一次调用）
  _throttleScroll(fn, delay) {
    if (this._scrollThrottleTimer) {
      this._scrollThrottlePending = fn;
      return;
    }
    fn();
    this._scrollThrottleTimer = setTimeout(() => {
      this._scrollThrottleTimer = null;
      if (this._scrollThrottlePending) {
        const pending = this._scrollThrottlePending;
        this._scrollThrottlePending = null;
        this._throttleScroll(pending, delay);
      }
    }, delay);
  }

  // demo 风格：防抖函数（每次调用重置计时器）
  _debounceScroll(fn, delay) {
    clearTimeout(this._scrollDebounceTimer);
    this._scrollDebounceTimer = setTimeout(fn, delay);
  }

  // demo 风格：恢复滚动（重置双标志锁）
  _resumeScroll() {
    this._canScroll.editor = true;
    this._canScroll.preview = true;
  }

  // 编辑器 → 预览同步（逐行密集插值）
  _syncEditorToPreview() {
    this._computedPosition();

    const editorList = this._editorElementList;
    const previewList = this._previewElementList;
    if (!editorList || editorList.length < 2) return;

    const { scrollHeight, clientHeight } = this.preview;
    const cmInfo = this.cm.getScrollInfo();
    const top = cmInfo.top;

    if (top <= 0.5) { this.preview.scrollTop = 0; return; }
    if (top + clientHeight >= cmInfo.height - 0.5) {
      this.preview.scrollTop = Math.max(0, scrollHeight - clientHeight);
      return;
    }

    let lo = 0, hi = editorList.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (editorList[mid] <= top) lo = mid + 1;
      else hi = mid;
    }
    let idx = lo - 1;
    if (idx < 0) { this.preview.scrollTop = 0; return; }
    if (idx >= editorList.length - 1) {
      this.preview.scrollTop = Math.max(0, scrollHeight - clientHeight);
      return;
    }

    const editorStart = editorList[idx];
    const editorEnd = editorList[idx + 1];
    const previewStart = previewList[idx];
    const previewEnd = previewList[idx + 1];

    if (editorEnd <= editorStart || previewEnd < 0 || previewStart < 0) {
      this.preview.scrollTop = previewStart;
      return;
    }

    const targetScrollTop = previewStart + (top - editorStart) / (editorEnd - editorStart) * (previewEnd - previewStart);
    this.preview.scrollTop = Math.max(0, Math.min(targetScrollTop, scrollHeight - clientHeight));
  }

  // 预览 → 编辑器同步（逐行密集插值）
  _syncPreviewToEditor() {
    this._computedPosition();

    const previewList = this._previewElementList;
    const editorList = this._editorElementList;
    if (!previewList || previewList.length < 2) return;

    const { scrollTop: pvTop, scrollHeight, clientHeight } = this.preview;
    const cmInfo = this.cm.getScrollInfo();

    if (pvTop <= 0.5) { this.cm.scrollTo(0, 0); return; }
    if (pvTop + clientHeight >= scrollHeight - 0.5) {
      this.cm.scrollTo(0, Math.max(0, cmInfo.height - cmInfo.clientHeight));
      return;
    }

    let lo = 0, hi = previewList.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (previewList[mid] <= pvTop) lo = mid + 1;
      else hi = mid;
    }
    let idx = lo - 1;
    if (idx < 0) { this.cm.scrollTo(0, 0); return; }
    if (idx >= previewList.length - 1) {
      this.cm.scrollTo(0, Math.max(0, cmInfo.height - cmInfo.clientHeight));
      return;
    }

    const previewStart = previewList[idx];
    const previewEnd = previewList[idx + 1];
    const editorStart = editorList[idx];
    const editorEnd = editorList[idx + 1];

    if (previewEnd <= previewStart || editorEnd < 0 || editorStart < 0) {
      this.cm.scrollTo(0, editorStart);
      return;
    }

    const targetEditorTop = editorStart + (pvTop - previewStart) / (previewEnd - previewStart) * (editorEnd - editorStart);
    this.cm.scrollTo(0, targetEditorTop);
  }

  // 按 markdown 块级元素边界分割源码，与 pulldown-cmark 渲染输出对齐
  // 注意：此方法保留用于兼容旧的 _blocks 数组引用
  _splitMarkdownBlocks(lines) {
    const blocks = [];
    let i = 0;

    while (i < lines.length) {
      while (i < lines.length && lines[i].trim() === '') i++;
      if (i >= lines.length) break;

      const startLine = i;
      const line = lines[i].trim();

      // 代码围栏：作为一个整体 block
      if (line.startsWith('```') || line.startsWith('~~~')) {
        const fence = line.match(/^(`{3,}|~{3,})/)[0];
        i++;
        while (i < lines.length) {
          if (lines[i].trim().startsWith(fence)) break;
          i++;
        }
        if (i < lines.length) i++;
        blocks.push({ startLine, endLine: i - 1 });
        continue;
      }

      // 标题：始终是单行 block（demo 中每个 # 行 = 一个预览元素）
      if (/^#{1,6}\s/.test(line)) {
        blocks.push({ startLine, endLine: i });
        i++;
        continue;
      }

      // 水平分割线：单行 block
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
        blocks.push({ startLine, endLine: i });
        i++;
        continue;
      }

      // 表格：连续的 | 行
      if (line.startsWith('|')) {
        while (i < lines.length && lines[i].trim().startsWith('|')) i++;
        blocks.push({ startLine, endLine: i - 1 });
        continue;
      }

      // 段落/列表/引用：消费连续非空行，遇到标题/围栏/分割线/表格时停止
      i++;
      while (i < lines.length && lines[i].trim() !== '') {
        const t = lines[i].trim();
        if (/^#{1,6}\s/.test(t) ||
            t.startsWith('```') || t.startsWith('~~~') ||
            /^(-{3,}|\*{3,}|_{3,})\s*$/.test(t) ||
            t.startsWith('|')) {
          break;
        }
        i++;
      }
      blocks.push({ startLine, endLine: i - 1 });
    }

    return blocks;
  }

  // 获取预览 DOM 的直系 block 级子元素（与 blocks 顺序一一对应）
  _getPreviewBlockElements() {
    const tags = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE', 'TABLE', 'UL', 'OL', 'BLOCKQUOTE', 'HR', 'DETAILS', 'DIV', 'DL', 'FIGURE', 'IMG']);
    return Array.from(this.preview.children).filter(el => tags.has(el.tagName));
  }

  // 像素比例兜底：在文档中均匀取样 20 个点
  _fallbackPositionMap(totalLines) {
    const positions = [{ line: 0, fraction: 0 }];
    const step = Math.max(1, Math.floor(totalLines / 20));
    for (let l = step; l < totalLines - 1; l += step) {
      positions.push({ line: l, fraction: l / totalLines });
    }
    positions.push({ line: totalLines - 1, fraction: 1 });
    return positions;
  }

  async updatePreview() {
    const gen = ++this._renderGeneration;
    try {
      const content = this.cm.getValue();

      const hasToc = content.includes('[TOC]') || content.includes('[toc]');
      let tocHtml = '';
      if (hasToc) {
        tocHtml = await invoke('generate_toc', { content });
        if (gen !== this._renderGeneration) return;
      }

      const html = UnifiedRenderer.renderMarkdown(content);
      if (gen !== this._renderGeneration) return;

      let finalHtml = html;
      if (tocHtml) {
        finalHtml = finalHtml.replace(/<p[^>]*data-source-line="(\d+)"[^>]*>\[TOC\]<\/p>/gi, '<div class="toc-wrapper" data-source-line="$1">' + tocHtml + '</div>');
      }

      this._canScroll.editor = false;
      this._canScroll.preview = false;
      this.preview.innerHTML = finalHtml;

      this.preview.querySelectorAll('details:not([open])').forEach(el => el.open = true);

      try { await this.processImages(); } catch (e) { console.warn('[preview] Images error:', e); }
      if (gen !== this._renderGeneration) { this._resumeScroll(); return; }
      try { this.processEmojiShortcodes(); } catch (e) { console.warn('[preview] Emoji error:', e); }
      try { this.processMath(); } catch (e) { console.warn('[preview] Math error:', e); }
      try { this.processAbbreviations(); } catch (e) { console.warn('[preview] Abbr error:', e); }
      try { this.processHeadings(); } catch (e) { console.warn('[preview] Headings error:', e); }
      try { await this.processMermaid(); } catch (e) { console.warn('[preview] Mermaid error:', e); }
      if (gen !== this._renderGeneration) { this._resumeScroll(); return; }
      try { this.addCopyButtons(); } catch (e) { console.warn('[preview] Copy btn error:', e); }

      if (typeof hljs !== 'undefined') {
        try {
          this.preview.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
          });
        } catch (e) { console.warn('[preview] HLJS error:', e); }
      }

      // 等待浏览器完成布局后再测量元素位置
      await new Promise(r => requestAnimationFrame(r));
      if (gen !== this._renderGeneration) { this._resumeScroll(); return; }

      // 重建滚动同步数据（blocks + 预览子元素）
      this.rebuildScrollSync();

      // 恢复预览滚动位置（逐行密集插值）
      if (this.settings.scrollSync && this._editorElementList && this._editorElementList.length > 1) {
        const cmInfo = this.cm.getScrollInfo();
        const top = cmInfo.top;

        if (top <= 0.5) {
          this.preview.scrollTop = 0;
        } else if (top + cmInfo.clientHeight >= cmInfo.height - 0.5) {
          this.preview.scrollTop = Math.max(0, this.preview.scrollHeight - this.preview.clientHeight);
        } else {
          let idx = -1;
          for (let i = 0; i < this._editorElementList.length; i++) {
            if (top < this._editorElementList[i]) {
              idx = i - 1;
              break;
            }
          }
          if (idx < 0) idx = 0;
          if (idx < this._editorElementList.length - 1) {
            const editorStart = this._editorElementList[idx];
            const editorEnd = this._editorElementList[idx + 1];
            const previewStart = this._previewElementList[idx];
            const previewEnd = this._previewElementList[idx + 1];
            if (editorEnd > editorStart) {
              const ratio = (top - editorStart) / (editorEnd - editorStart);
              this.preview.scrollTop = previewStart + ratio * (previewEnd - previewStart);
            }
          }
        }
      } else {
        const maxScroll = Math.max(this.preview.scrollHeight - this.preview.clientHeight, 0);
        if (this.preview.scrollTop > maxScroll) this.preview.scrollTop = maxScroll;
      }
      requestAnimationFrame(() => {
        this._resumeScroll();
      });
    } catch (error) {
      if (gen !== this._renderGeneration) return;
      this._resumeScroll();
      const msg = String(error).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.preview.innerHTML = `<p style="color: red;">预览错误: ${msg}</p>`;
    }
  }

  async processImages() {
    const filePath = this.activeTab.filePath;
    if (!filePath) return;
    const dir = filePath.replace(/[/\\][^/\\]*$/, '');
    const images = this.preview.querySelectorAll('img');
    const promises = Array.from(images).map(async (img) => {
      let src = img.getAttribute('src');
      if (!src || src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('file://')) return;
      const gen = this._renderGeneration;
      // Absolute path (Unix /... or Windows D:/...) — load directly
      if (src.startsWith('/') || /^[a-zA-Z]:[/\\]/.test(src)) {
        try {
          const base64 = await invoke('fetch_image_as_base64', { url: src });
          if (gen !== this._renderGeneration) return;
          const ext = src.split('.').pop().toLowerCase();
          let mime = 'image/png';
          if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
          else if (ext === 'gif') mime = 'image/gif';
          else if (ext === 'svg') mime = 'image/svg+xml';
          else if (ext === 'webp') mime = 'image/webp';
          img.src = `data:${mime};base64,${base64}`;
        } catch (e) {
          console.warn('[preview] Failed to load image:', src, e);
          img.style.border = '1px solid #d00';
          img.style.opacity = '0.4';
          img.alt = (img.alt || '') + ' [加载失败]';
        }
        return;
      }
      // Relative path — prepend markdown file's directory
      const absPath = dir + '/' + src;
      try {
        const base64 = await invoke('fetch_image_as_base64', { url: absPath });
        if (gen !== this._renderGeneration) return;
        const ext = src.split('.').pop().toLowerCase();
        let mime = 'image/png';
        if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
        else if (ext === 'gif') mime = 'image/gif';
        else if (ext === 'svg') mime = 'image/svg+xml';
        else if (ext === 'webp') mime = 'image/webp';
        img.src = `data:${mime};base64,${base64}`;
      } catch (e) {
        console.warn('[preview] Failed to load image:', absPath, e);
        img.style.border = '1px solid #d00';
        img.style.opacity = '0.4';
        img.alt = (img.alt || '') + ' [加载失败]';
      }
    });
    await Promise.allSettled(promises);
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

  // Replace abbreviation terms with <abbr title="..."> tags.
  // Abbreviation definitions (*[TERM]: definition) are parsed by the Rust
  // backend and embedded as a hidden <div id="abbr-data" data-abbrs="[...]">.
  processAbbreviations() {
    const dataDiv = this.preview.querySelector('#abbr-data');
    if (!dataDiv) return;
    try {
      const abbrs = JSON.parse(dataDiv.getAttribute('data-abbrs'));
      if (!abbrs || !abbrs.length) { dataDiv.remove(); return; }

      // Sort by term length descending to avoid partial matches
      abbrs.sort((a, b) => b[0].length - a[0].length);

      const skipTags = ['CODE', 'PRE', 'ABBR', 'SCRIPT', 'STYLE', 'TEXTAREA', 'A'];
      const walker = document.createTreeWalker(
        this.preview,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            let p = node.parentElement;
            while (p) {
              if (skipTags.includes(p.tagName)) return NodeFilter.FILTER_REJECT;
              if (p.classList && p.classList.contains('katex')) return NodeFilter.FILTER_REJECT;
              p = p.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      const replacements = [];
      let node;
      while (node = walker.nextNode()) {
        let text = node.textContent;
        let modified = false;

        for (const [term, def] of abbrs) {
          if (!text.includes(term)) continue;
          const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'g');
          if (regex.test(text)) {
            modified = true;
            const safeDef = def.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            text = text.replace(regex, `<abbr title="${safeDef}">${term}</abbr>`);
          }
        }

        if (modified) replacements.push({ node, html: text });
      }

      // Replace text nodes with parsed HTML
      for (const { node, html } of replacements) {
        const span = document.createElement('span');
        span.innerHTML = html;
        node.replaceWith(...span.childNodes);
      }

      dataDiv.remove();
    } catch (e) {
      console.warn('[preview] Abbreviations error:', e);
      dataDiv.remove();
    }
  }

  // Render both display math ($$...$$) and inline math ($...$ / \(...\))
  // using KaTeX's built-in auto-render, which correctly handles all edge cases.
  processMath() {
    if (typeof renderMathInElement === 'undefined') {
      console.warn('[math] renderMathInElement not loaded');
      return;
    }

    try {
      renderMathInElement(this.preview, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false,
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      });
    } catch (e) {
      console.warn('[math] auto-render error:', e);
    }
  }
  processHeadings() {
    const idCount = {};
    this.preview.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      if (heading.id) return;
      const text = heading.textContent;
      let id = this.headingToId(text);
      if (idCount[id]) {
        idCount[id]++;
        heading.id = id + '-' + idCount[id];
      } else {
        idCount[id] = 1;
        heading.id = id;
      }
    });
  }

  async processMermaid() {
    if (typeof mermaid === 'undefined') return;

    this.preview.querySelectorAll('code.language-mermaid').forEach((block, index) => {
      const pre = block.parentElement;
      const sourceLine = block.dataset.sourceLine;
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      const id = 'mermaid-' + Date.now() + '-' + index;
      container.id = id;
      container.setAttribute('data-code', block.textContent);
      if (sourceLine) container.setAttribute('data-source-line', sourceLine);
      container.textContent = block.textContent;
      pre.replaceWith(container);
    });

    const containers = this.preview.querySelectorAll('.mermaid-container');
    if (containers.length === 0) return;

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: this.isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-preview').trim() || '-apple-system, sans-serif',
      });
      await mermaid.run({ nodes: Array.from(containers) });
    } catch (e) {
      console.error('Mermaid rendering error:', e);
    }
  }

  addCopyButtons() {
    this.preview.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return;
      if (pre.querySelector('code.language-mermaid')) return;

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = this.t('copy');
      btn.title = this.t('copyCode');

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = this.t('copied');
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = this.t('copy');
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          btn.textContent = this.t('copied');
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = this.t('copy');
            btn.classList.remove('copied');
          }, 2000);
        }
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }

  showToast(text, type = 'danger') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = '<span class="toast-icon">'
      + (type === 'danger'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>')
      + '</span><span class="toast-text">' + text + '</span>';
    container.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s, transform 0.3s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }

  setStatus(text) {
    this.statusText.textContent = text;
    setTimeout(() => {
      if (this.statusText.textContent === text) {
        this.statusText.textContent = this.t('ready');
      }
    }, 3000);
  }

  updateWordCount() {
    const content = this.cm.getValue();
    const text = content.replace(/[#*`~\[\]()>_|\\-]/g, '').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = content.length;
    const lines = content ? content.split('\n').length : 0;
    this.wordCountEl.textContent = `${this.t('words')}: ${words}`;
    this.charCountEl.textContent = `${this.t('chars')}: ${chars}`;
    this.lineCountEl.textContent = `${this.t('lines')}: ${lines}`;
  }

  async toggleTheme() {
    if (this.settings.themeMode !== 'light' && this.settings.themeMode !== 'dark') {
      this.settings.themeMode = this.isDark ? 'light' : 'dark';
      document.getElementById('set-theme-mode').value = this.settings.themeMode;
    }
    this.isDark = !this.isDark;
    this.settings.themeMode = this.isDark ? 'dark' : 'light';
    document.getElementById('set-theme-mode').value = this.settings.themeMode;
    this.saveSettings();
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-color-scheme', this.settings.colorScheme || 'default');
    this.cm.setOption('theme', this.isDark ? 'material-darker' : 'default');
    this.updateThemeIcon();

    const highlightTheme = document.getElementById('highlight-theme');
    if (highlightTheme) {
      highlightTheme.href = this.isDark
        ? 'lib/highlight.js/github-dark.min.css'
        : 'lib/highlight.js/github.min.css';
    }

    await this.rerenderMermaid();
    this.setStatus(this.t('themeSwitched', { theme: this.isDark ? this.t('themeDark') : this.t('themeLight') }));
  }

  updateThemeIcon() {
    const svg = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');
    if (!svg) return;
    if (this.isDark) {
      svg.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
      if (text) text.textContent = this.t('themeDark');
    } else {
      svg.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
      if (text) text.textContent = this.t('themeLight');
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
      sideLeft.title = this.t('collapseEditor');
      sideRight.classList.remove('side-hidden', 'side-active');
      sideRight.innerHTML = '&#9654;';
      sideRight.title = this.t('collapsePreview');
    }

    setTimeout(() => {
      this.cm.refresh();
      this.updateSideButtons();
    }, 50);
  }

  toggleCollapse(pane) {
    const container = document.querySelector('.editor-container');
    if (this.viewMode === 'preview') {
      this.setStatus(this.t('collapseHint'));
      return;
    }

    this._canScroll.editor = false;
    this._canScroll.preview = false;

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
      sideLeft.title = isCollapsed ? this.t('restoreEditor') : this.t('collapseEditor');
      sideLeft.classList.toggle('side-active', isCollapsed);
    } else {
      container.classList.toggle('preview-collapsed');
      const isCollapsed = container.classList.contains('preview-collapsed');
      sideRight.innerHTML = isCollapsed ? '&#9664;' : '&#9654;';
      sideRight.title = isCollapsed ? this.t('restorePreview') : this.t('collapsePreview');
      sideRight.classList.toggle('side-active', isCollapsed);
    }

    let restored = false;
    const doRefresh = () => {
      if (restored) return;
      restored = true;
      this.cm.refresh();
      this.preview.scrollTop = previewScrollTop;
      this.updateSideButtons();
      requestAnimationFrame(() => {
        this._resumeScroll();
      });
    };
    const targetPane = pane === 'editor' ? editorPane : previewPane;
    targetPane.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'flex') doRefresh();
    }, { once: true });
    setTimeout(doRefresh, 280);
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
      this.addTab(tabName, content, null);
      this.activeTab.savedContent = content;
      this.activeTab.isGuide = true;
      this.updateTabDisplay();
      this.setStatus(isEn ? this.t('openedGuideEn') : this.t('openedGuide'));
    } catch (error) {
      this.setStatus(isEn ? this.t('failedGuideEn') : `${this.t('failedGuide')}: ${error}`);
    }
  }

  async showAbout() {
    const dialog = document.getElementById('about-dialog');
    dialog.classList.remove('hidden');
    const details = document.querySelector('#about-dialog .dependency-details');
    if (details) details.open = false;
    try {
      const ver = await window.__TAURI__.app.getVersion();
      const el = document.querySelector('#about-dialog .about-section h3 + p');
      if (el) el.textContent = 'TizuMark v' + ver;
    } catch (_) {}
  }

  hideAbout() {
    document.getElementById('about-dialog').classList.add('hidden');
  }

  // ========== Update / Auto-updater ==========

  showUpdateDialog() {
    document.getElementById('update-dialog').classList.remove('hidden');
  }

  hideUpdateDialog() {
    this._updateDismissed = true;
    document.getElementById('update-dialog').classList.add('hidden');
  }

  showUpdateState(state) {
    ['checking', 'available', 'latest'].forEach(s => {
      document.getElementById('update-state-' + s).classList.toggle('hidden', s !== state);
    });
    const titles = { checking: '检查更新', available: '发现新版本', latest: '已是最新' };
    const titleEl = document.getElementById('update-title');
    if (titleEl) titleEl.textContent = titles[state] || '发现新版本';
    const btn = document.getElementById('update-action');
    if (state === 'checking') {
      btn.disabled = true;
      btn.textContent = this.t('updateChecking');
      document.getElementById('update-progress-wrap').classList.add('hidden');
    }
  }

  async checkUpdate(showUpToDate = false) {
    const checkId = (this._updateCheckId || 0) + 1;
    this._updateCheckId = checkId;
    this._updateDismissed = false;
    if (showUpToDate) {
      this.showUpdateDialog();
      this.showUpdateState('checking');
    }
    try {
      const { invoke } = window.__TAURI__.core;
      const result = await invoke('plugin:updater|check');
      if (this._updateCheckId !== checkId || this._updateDismissed) return;
      if (!result) {
        if (showUpToDate) {
          this.showUpdateState('latest');
          setTimeout(() => {
            this.hideUpdateDialog();
            this.showToast(this.t('updateNoUpdate'), 'success');
          }, 1200);
        }
        return;
      }
      const update = result;
      if (!showUpToDate) this.showUpdateDialog();
      document.getElementById('update-new-version').textContent = update.version;
      try {
        const ver = await window.__TAURI__.app.getVersion();
        if (this._updateCheckId !== checkId || this._updateDismissed) return;
        document.getElementById('update-current-version').textContent = ver;
      } catch (_) {}
      const notesEl = document.getElementById('update-notes-body');
      if (update.body) {
        if (window.markdownit) {
          notesEl.innerHTML = window.markdownit({ html: true, linkify: true }).render(update.body);
        } else {
          notesEl.innerHTML = update.body.replace(/\n/g, '<br>');
        }
      } else {
        notesEl.textContent = this.t('noUpdateNotes');
      }
      this.showUpdateState('available');
      this.pendingUpdate = update;
      this.pendingUpdateRid = update.rid;
      this.setUpdateAction('download');
    } catch (err) {
      console.error('Update check failed:', err);
      if (showUpToDate) {
        this.hideUpdateDialog();
        this.showToast(this.t('updateFailed'));
      }
    }
  }

  setUpdateAction(state) {
    const btn = document.getElementById('update-action');
    btn.dataset.state = state;
    btn.disabled = state === 'downloading';
    if (state === 'download') {
      btn.textContent = this.t('updateDownloadLabel');
    } else if (state === 'downloading') {
      btn.textContent = this.t('updateDownloading');
    } else if (state === 'install') {
      btn.textContent = this.t('updateInstallNow');
    }
  }

  async handleUpdateAction() {
    const state = document.getElementById('update-action').dataset.state;
    if (state === 'download') {
      this.setUpdateAction('downloading');
      document.getElementById('update-progress-wrap').classList.remove('hidden');
      await this.downloadUpdate();
    } else if (state === 'install') {
      await this.installUpdate();
    }
  }

  async downloadUpdate() {
    if (!this.pendingUpdate || !this.pendingUpdateRid) return;
    this.pendingBytesRid = null;
    try {
      const { invoke, Channel } = window.__TAURI__.core;
      const channel = new Channel();
      let totalSize = 0;
      let downloadedSize = 0;
      channel.onmessage = (eventData) => {
        if (eventData.event === 'Started') {
          totalSize = eventData.data?.contentLength || 0;
        } else if (eventData.event === 'Progress') {
          downloadedSize += eventData.data?.chunkLength || 0;
          const pct = totalSize > 0 ? Math.min(100, Math.round((downloadedSize / totalSize) * 100)) : 0;
          document.getElementById('update-progress-fill').style.width = pct + '%';
          document.getElementById('update-progress-text').textContent = pct + '%';
        } else if (eventData.event === 'Finished') {
          document.getElementById('update-progress-fill').style.width = '100%';
          document.getElementById('update-progress-text').textContent = '100%';
        }
      };
      const bytesRid = await invoke('plugin:updater|download', { rid: this.pendingUpdateRid, onEvent: channel });
      this.pendingBytesRid = bytesRid;
      this.setUpdateAction('install');
    } catch (err) {
      console.error('Download failed:', err);
      this.showToast(this.t('updateFailed'));
      this.hideUpdateDialog();
    }
  }

  async installUpdate() {
    if (!this.pendingUpdateRid || !this.pendingBytesRid) return;
    document.getElementById('update-action').disabled = true;
    this.hideUpdateDialog();
    try {
      const { invoke } = window.__TAURI__.core;
      await invoke('plugin:updater|install', { updateRid: this.pendingUpdateRid, bytesRid: this.pendingBytesRid });
    } catch (err) {
      console.error('Install failed:', err);
      document.getElementById('update-action').disabled = false;
      this.showToast(this.t('updateFailed'));
    }
  }

  openExternal(url) {
    if (window.__TAURI__ && window.__TAURI__.shell) {
      window.__TAURI__.shell.open(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
    await this.handleAppClose();
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

  insertImageBlock(text) {
    const cursor = this.cm.getCursor();
    const line = this.cm.getLine(cursor.line);
    const afterText = line.slice(cursor.ch);
    const prevLine = cursor.line > 0 ? this.cm.getLine(cursor.line - 1) : '';
    let prefix = '';
    let addedLines = 0;
    if (cursor.ch > 0 || (cursor.line > 0 && prevLine.trim() !== '')) {
      prefix = '\n';
      addedLines = 1;
    }
    this.cm.replaceRange(prefix + text + '\n' + afterText, cursor, { line: cursor.line, ch: line.length });
    this.cm.setCursor({ line: cursor.line + addedLines + 1, ch: 0 });
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

      case 'insert-link': this.showInsertLinkDialog(); break;
      case 'insert-image': this.showInsertImageDialog(); break;

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

  async closeOtherTabs(keepIndex) {
    if (keepIndex < 0 || keepIndex >= this.tabs.length) return;
    const otherModified = this.tabs.filter((t, i) => i !== keepIndex && t.isModified);
    if (otherModified.length > 0) {
      const result = await this.showSaveDialog(
        this.t('saveChanges'),
        `有 ${otherModified.length} 个文件未保存，是否保存更改？`,
        '保存全部', '放弃全部', '取消'
      );
      if (result === 'cancel') return;
      if (result === 'save') {
        const ok = await this.batchSaveTabs(otherModified);
        if (!ok) return;
      } else {
        for (const tab of otherModified) {
          tab.content = tab.savedContent;
        }
        this.cm.setValue(this.activeTab.content);
        this.updateTabDisplay();
        this.updatePreview();
      }
    }
    const tab = this.tabs[keepIndex];
    this.tabs = [tab];
    this.activeTabIndex = 0;
    this.cm.setValue(tab.content);
    this.cm.setCursor(tab.cursorPos);
    this.updateTabBar();
    this.updatePreview();
  }

  async closeAllTabs() {
    const modified = this.tabs.filter(t => t.isModified);
    if (modified.length > 0) {
      const result = await this.showSaveDialog(
        this.t('saveChanges'),
        `有 ${modified.length} 个文件未保存，是否保存更改？`,
        '保存全部', '放弃全部', '取消'
      );
      if (result === 'cancel') return;
      if (result === 'save') {
        const ok = await this.batchSaveTabs(modified);
        if (!ok) return;
      }
    }
    this.tabs = [new Tab(`${this.t('untitled')}${this.untitledCounter++}`)];
    this.activeTabIndex = 0;
    this.cm.setValue('');
    this.updateTabBar();
    this.updatePreview();
  }

  async copyTabPath(index) {
    if (index < 0 || index >= this.tabs.length) return;
    const tab = this.tabs[index];
    if (!tab.filePath) {
      this.setStatus(this.t('notSaved'));
      return;
    }
    try {
      await navigator.clipboard.writeText(tab.filePath);
      this.setStatus(this.t('pathCopied'));
    } catch {
      this.setStatus(this.t('copyFailed'));
    }
  }

  async batchSaveTabs(tabs) {
    const rollback = new Map();
    for (const tab of tabs) {
      if (!tab.isModified) continue;
      rollback.set(tab, tab.savedContent);
      try {
        if (!tab.filePath) {
          const path = await dialogSave({
            filters: [
              { name: 'Markdown', extensions: ['md'] },
              { name: this.t('allFiles'), extensions: ['*'] }
            ]
          });
          if (!path) {
            for (const [t, sc] of rollback) {
              if (t !== tab) t.savedContent = sc;
            }
            return false;
          }
          tab.filePath = path;
          tab.name = path.split(/[/\\]/).pop();
        }
        await invoke('write_file', { path: tab.filePath, content: tab.content });
        tab.savedContent = tab.content;
      } catch (error) {
        this.setStatus(`${this.t('saveFailed')}: ${error}`);
        for (const [t, sc] of rollback) {
          if (t !== tab) t.savedContent = sc;
        }
        return false;
      }
    }
    return true;
  }

  async handleAppClose() {
    try {
      const { getCurrentWindow } = window.__TAURI__.window;
      const modified = this.tabs.filter(t => t.isModified);
      if (modified.length === 0) {
        await getCurrentWindow().hide();
        return;
      }
      const result = await this.showSaveDialog(
        this.t('saveChanges'),
        `有 ${modified.length} 个文件未保存，是否保存更改？`,
        '保存全部', '放弃全部', '取消'
      );
      if (result === 'cancel') return;
      if (result === 'save') {
        const ok = await this.batchSaveTabs(modified);
        if (!ok) return;
      } else {
        for (const tab of modified) {
          tab.content = tab.savedContent;
        }
        const remaining = this.tabs.filter(t => t.filePath || t.content !== '');
        if (remaining.length === 0) {
          this.tabs.length = 0;
          this.tabs.push(new Tab(`${this.t('untitled')}${this.untitledCounter++}`));
          this.activeTabIndex = 0;
        } else {
          this.tabs = remaining;
          if (this.activeTabIndex >= this.tabs.length) {
            this.activeTabIndex = this.tabs.length - 1;
          }
        }
        this.cm.setValue(this.activeTab.content);
        this.updateTabBar();
        this.updatePreview();
      }
      await getCurrentWindow().hide();
    } catch (error) {
      console.error('handleAppClose error:', error);
      try {
        if (window.__TAURI__) {
          const { getCurrentWindow } = window.__TAURI__.window;
          await getCurrentWindow().hide();
        }
      } catch { /* 浏览器环境下降级 */ }
    }
  }

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

  // ========== 标签栏滚动 ==========

  initTabScroll() {
    this.scrollContainer = document.getElementById('tab-bar-scroll');
    this.scrollLeftBtn = document.getElementById('tab-scroll-left');
    this.scrollRightBtn = document.getElementById('tab-scroll-right');

    if (!this.scrollContainer) return;

    const updateArrows = () => {
      const maxScroll = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      if (maxScroll <= 1) {
        this.scrollLeftBtn.classList.add('hidden');
        this.scrollRightBtn.classList.add('hidden');
      } else {
        this.scrollLeftBtn.classList.toggle('hidden', this.scrollContainer.scrollLeft <= 1);
        this.scrollRightBtn.classList.toggle('hidden', this.scrollContainer.scrollLeft >= maxScroll - 1);
      }
    };

    this.scrollContainer.addEventListener('scroll', updateArrows, { passive: true });

    this.scrollContainer.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        this.scrollContainer.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    this.scrollLeftBtn.addEventListener('click', () => {
      this.scrollContainer.scrollBy({ left: -200, behavior: 'auto' });
    });

    this.scrollRightBtn.addEventListener('click', () => {
      this.scrollContainer.scrollBy({ left: 200, behavior: 'auto' });
    });

    // Update arrows after tab bar changes or window resize
    const observer = new ResizeObserver(updateArrows);
    observer.observe(this.scrollContainer);

    // Also observe the tab bar itself for changes when tabs are added/removed
    const tabBar = document.getElementById('tab-bar');
    if (tabBar) {
      const tabObserver = new ResizeObserver(updateArrows);
      tabObserver.observe(tabBar);
    }

    // Store updateArrows for external calls (e.g. after updateTabBar)
    this.updateTabScrollArrows = updateArrows;
  }
}

function updateLoadingProgress(percent, text) {
  document.getElementById('loading-progress-fill').style.width = Math.min(100, Math.max(0, percent)) + '%';
  const textEl = document.getElementById('loading-text');
  if (textEl && text) textEl.textContent = text;
}

function initEula() {
  const eulaAccepted = localStorage.getItem('tizumark-eula-accepted');
  if (eulaAccepted === 'true') {
    document.getElementById('eula-dialog').classList.add('hidden');
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const overlay = document.getElementById('eula-dialog');
    const acceptBtn = document.getElementById('eula-accept');

    overlay.classList.remove('hidden');

    const autoAccept = () => {
      localStorage.setItem('tizumark-eula-accepted', 'true');
      overlay.classList.add('hidden');
      console.warn('EULA auto-accepted after timeout');
      resolve(true);
    };

    const autoTimer = setTimeout(autoAccept, 20000);

    const gplLink = overlay.querySelector('.gpl-link');
    if (gplLink) {
      gplLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.gnu.org/licenses/gpl-3.0.html', '_blank');
      });
    }

    acceptBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      localStorage.setItem('tizumark-eula-accepted', 'true');
      overlay.classList.add('hidden');
      resolve(true);
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  // 安全兜底：20 秒后强制隐藏加载遮罩，防止任何异常导致卡死
  const loadingSafetyTimer = setTimeout(() => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      console.warn('Loading overlay force-hidden by safety timeout (20s)');
    }
  }, 20000);

  try {
    updateLoadingProgress(5, '正在检查许可协议…');
    const isFirstLaunch = await initEula();

    updateLoadingProgress(15, '正在初始化编辑器…');
    window.editor = new MarkdownEditor();
    window.editor._loadingStart = Date.now();

    updateLoadingProgress(60, '正在注册事件监听…');
    await window.__TAURI__.event.listen('close-requested', async () => {
      await window.editor.handleAppClose();
    });

    await window.__TAURI__.event.listen('file-open', async (event) => {
      const args = event.payload;
      if (!args || args.length === 0) return;

      try {
        const w = window.__TAURI__.window.getCurrentWindow();
        await w.unminimize();
        await w.show();
        await w.setFocus();
      } catch (_) {}

      window.editor.showLoading();
      try {
        for (const filePath of args) {
          if (filePath.startsWith('-')) continue;

          const existingIndex = window.editor.tabs.findIndex(t => t.filePath === filePath);
          if (existingIndex !== -1) {
            window.editor.switchTab(existingIndex);
            continue;
          }
          try {
            const content = await invoke('read_file', { path: filePath });
            const name = filePath.split(/[/\\]/).pop();
            window.editor.addTab(name, content, filePath);
            window.editor.updateWordCount();
            window.editor.updateOutline();
            window.editor.setStatus(`已打开: ${name}`);
          } catch (_) {
          }
        }
      } finally {
        window.editor.hideLoading();
      }
    });

    updateLoadingProgress(85, '正在加载文件…');
    try {
      const args = await invoke('get_cli_args');
      if (args.length > 0) {
        const filePath = args[0];
        const content = (await invoke('read_file', { path: filePath })).replace(/\r\n/g, '\n');
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
      } else if (isFirstLaunch) {
        window.editor.openUserGuide();
      }
    } catch (e) {
      console.warn('Failed to open file from CLI args:', e);
    }

    updateLoadingProgress(100, '准备就绪');
    await new Promise(r => setTimeout(r, 300));
  } catch (e) {
    console.error('Initialization error:', e);
  } finally {
    clearTimeout(loadingSafetyTimer);
    window.editor?.hideLoading();
  }
});
