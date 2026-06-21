# MarkFlow

A lightweight cross-platform Markdown editor built with Tauri + Rust. Blazing fast performance with an elegant experience.

## Features

### Editing Experience
- **Live Split Preview** - Edit on the left, instant rendering on the right
- **Multi-Tab Management** - Edit multiple files simultaneously with tab switching
- **Smart Outline Navigation** - Auto-detect heading hierarchy, click to jump
- **Professional Syntax Highlighting** - GFM syntax, code blocks, tables support
- **Code Block Enhancement** - One-click copy code, multi-language highlighting

### Extended Syntax
- **Math Formulas** - KaTeX/LaTeX math formula rendering
- **Flowcharts** - Built-in Mermaid diagram support
- **Emoji Shortcodes** - Quick emoji insertion with shortcodes

### File Management
- **Drag & Drop** - Drag files directly to open
- **File Association** - Double-click `.md` files to open
- **Auto Save** - Smart save prompts on close

### Export Options
- **Export HTML** - Generate standalone HTML files for sharing
- **Export Image** - One-click high-quality long image for social media

### Customization
- **Theme Switching** - Light / Dark / System following modes
- **Custom Shortcuts** - Configure all keyboard shortcuts
- **Editor Settings** - Font size, tab width, line numbers, word wrap
- **Preview Settings** - Font size, line height, max width

### UI Design
- **Frameless Window** - Custom title bar for immersive editing
- **Adjustable Layout** - Drag to resize editor and preview panels
- **Collapsible Panels** - Single-column mode for focused editing
- **Status Bar** - Real-time word/char/line count and cursor position

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+N | New File |
| Ctrl+O | Open File |
| Ctrl+S | Save File |
| Ctrl+W | Close Tab |
| Ctrl+F | Find |
| Ctrl+H | Find & Replace |
| Ctrl+Tab | Next Tab |
| Ctrl+Shift+Tab | Previous Tab |

> All shortcuts can be customized in File → Keyboard Shortcuts

## Tech Stack

- **Frontend** - Vanilla HTML/CSS/JavaScript + CodeMirror 5
- **Backend** - Rust + Tauri 2.x
- **Rendering** - markdown-it + highlight.js + KaTeX + Mermaid

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.77
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

## Quick Start

```bash
git clone https://gitee.com/fankaa/markdown.git
npm install
npm run dev
```

## Project Structure

```
markflow/
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/                    # Frontend
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── lib/
├── package.json
└── README.md
```

## License

MIT License
