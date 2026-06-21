# MarkFlow

轻量级跨平台 Markdown 编辑器，基于 Tauri + Rust 构建，极致性能，优雅体验。

## 核心特性

### 编辑体验
- **实时双栏预览** - 左侧编辑，右侧即时渲染，所见即所得
- **多标签页管理** - 同时编辑多个文件，标签页拖拽排序
- **智能大纲导航** - 自动识别标题层级，一键跳转定位
- **专业语法高亮** - 支持 GFM 语法、代码块、表格等
- **代码块增强** - 一键复制代码，支持多语言语法高亮

### 扩展语法
- **数学公式** - 支持 KaTeX/LaTeX 数学公式渲染
- **流程图** - 内置 Mermaid 图表支持
- **Emoji 表情** - 支持短代码快速插入表情

### 文件管理
- **拖拽打开** - 直接拖拽文件到窗口打开
- **文件关联** - 双击 `.md` 文件直接打开
- **自动保存** - 关闭时智能提示保存

### 导出功能
- **导出 HTML** - 生成独立的 HTML 文件，可直接分享
- **导出长图** - 一键生成高清长图，适合社交媒体分享

### 个性化设置
- **主题切换** - 明亮/暗黑/跟随系统三种模式
- **自定义快捷键** - 根据习惯配置所有快捷键
- **编辑器配置** - 字体大小、Tab宽度、行号、自动换行
- **预览配置** - 字号、行高、最大宽度

### 界面设计
- **无边框窗口** - 自定义标题栏，更沉浸的编辑体验
- **可调节布局** - 自由拖拽调整编辑器与预览区比例
- **折叠面板** - 单栏模式，专注编辑或预览
- **状态栏** - 实时显示字数、字符数、行数、光标位置

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl+N | 新建文件 |
| Ctrl+O | 打开文件 |
| Ctrl+S | 保存文件 |
| Ctrl+W | 关闭标签页 |
| Ctrl+F | 查找 |
| Ctrl+H | 查找替换 |
| Ctrl+Tab | 下一个标签页 |
| Ctrl+Shift+Tab | 上一个标签页 |

> 所有快捷键可在「文件 → 快捷键设置」中自定义

## 技术栈

- **前端** - 原生 HTML/CSS/JavaScript + CodeMirror 5
- **后端** - Rust + Tauri 2.x
- **渲染** - markdown-it + highlight.js + KaTeX + Mermaid

## 开发环境

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.77
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

## 快速开始

```bash
# 克隆仓库
git clone https://gitee.com/fankaa/markdown.git

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
markflow/
├── src-tauri/              # Rust 后端
│   ├── src/
│   │   ├── main.rs         # 主入口
│   │   └── lib.rs          # 核心逻辑
│   ├── icons/              # 应用图标
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/                    # 前端代码
│   ├── index.html          # 主页面
│   ├── styles.css          # 样式
│   ├── app.js              # 应用逻辑
│   └── lib/                # 第三方库
├── package.json
└── README.md
```

## 许可证

MIT License
