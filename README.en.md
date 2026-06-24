# MarkFlow

🌐 [简体中文](README.md) | **English**

<p align="center">
  <img src="https://gitee.com/fankaa/markdown/raw/master/icon.png" alt="MarkFlow" width="96" height="96">
</p>

<p align="center">
  <b>A Blazing-Fast, Cross-Platform & <font color="#16a34a">Free Forever</font> Markdown Editor That Just Works</b>
</p>

<p align="center">
  <a href="https://github.com/fankaa/markdown/releases"><img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version"></a>
  <a href="https://github.com/fankaa/markdown/releases"><img src="https://img.shields.io/badge/Windows-7%2B-brightgreen.svg" alt="Windows"></a>
  <img src="https://img.shields.io/badge/macOS-Coming%20Soon-lightgrey.svg" alt="macOS">
  <img src="https://img.shields.io/badge/Linux-Coming%20Soon-lightgrey.svg" alt="Linux">
  <img src="https://img.shields.io/badge/Tauri-2.x-orange.svg" alt="Tauri">
  <img src="https://img.shields.io/badge/Rust-1.77+-black.svg" alt="Rust">
  <a href="https://github.com/fankaa/markdown/releases"><img src="https://img.shields.io/github/downloads/fankaa/markdown/total?color=blue" alt="Downloads"></a>
  <img src="https://img.shields.io/badge/免费-Free-brightgreen.svg" alt="Free">
</p>

---

## Why MarkFlow?

<p align="center"><b>One app. Every Markdown task. Zero friction.</b></p>

| | The Old Way | ✨ MarkFlow |
|---|---|---|
| 🚀 **Startup** | Wait for heavy editor → install plugins → open file → lag | **Double-click. Instant.** |
| 📝 **Editing** | Split windows, switch tabs, lose context | **Live side-by-side WYSIWYG preview** |
| 🧭 **Navigation** | Scroll endlessly, lose your place | **Smart outline — one click, you're there** |
| 📤 **Export** | Install converters → CLI incantations → broken formatting | **One-click HTML or high-res PNG** |
| 📐 **Math** | Requires LaTeX setup or just isn't supported | **Built-in KaTeX — type `$E=mc^2$`, see it rendered** |
| 📊 **Diagrams** | Switch to drawing tool → export → paste | **Mermaid code → live diagrams** |
| 🎨 **Themes** | One stale theme, config-file diving to change it | **Light / Dark / System — one click** |
| 💾 **Memory** | Hundreds of MB of RAM for a text editor | **Rust-powered, sub-50MB** |
| 🖥️ **Platforms** | Fragmented ecosystem, inconsistent UX | **True native on Windows, macOS & Linux** |

---

## Features at a Glance

| Editing | Preview | Export |
|---|---|---|
| Multi-tab workflow | Live scroll sync | Standalone HTML file |
| Full GFM syntax highlighting | KaTeX math rendering | High-res long screenshot |
| Code blocks: 100+ languages | Mermaid diagrams | Preserved styling |
| Auto bracket closing | Emoji shortcodes | Works offline |
| Find & replace w/ regex | Responsive images | No network needed |

| Productivity | Personalization | Professional |
|---|---|---|
| Outline sidebar nav | Fully customizable shortcuts | CLI file opening |
| Drag & drop file open | Font, line-height, max-width | File association: .md, .markdown |
| Adjustable split ratio | Tab size, word wrap toggle | Auto-save & dirty state |
| Batch file open | Line numbers on/off | Word & char count |

---

## Quick Start

### Download

Get the latest installer from [Releases](https://github.com/fankaa/markdown/releases):

| Platform | Status |
|---|---|
| Windows | Released |
| macOS | Coming soon |
| Linux | Coming soon |

Install, launch, write.

> Want to see everything MarkFlow can do? Try the demo: [demo.md](demo.md)

### Keyboard Shortcuts

| Shortcut | Action | Shortcut | Action |
|---|---|---|---|
| `Ctrl+N` | New File | `Ctrl+W` | Close Tab |
| `Ctrl+O` | Open File | `Ctrl+F` | Find |
| `Ctrl+S` | Save File | `Ctrl+H` | Find & Replace |
| `Ctrl+B` | Bold | `Ctrl+I` | Italic |
| `Ctrl+K` | Insert Link | `Ctrl+Tab` | Switch Tab |

> Customize all shortcuts via `File → Keyboard Shortcuts`

### Build from Source

```bash
git clone https://github.com/fankaa/markdown.git
cd markdown
npm install
npm run dev      # dev mode
npm run build    # production
```

---

## 🛠 Architecture

```
┌──────────────────────────────────────────┐
│               Frontend (WebView)          │
│   CodeMirror 5  │  markdown-it  │ KaTeX  │
│   highlight.js  │    Mermaid    │ ...    │
└──────────────┬───────────────────────────┘
               │ IPC (ipc: / tauri:)
┌──────────────┴───────────────────────────┐
│              Backend (Rust)               │
│   Tauri 2.5  │  pulldown-cmark         │
│   File I/O   │  Native Dialogs          │
└──────────────┬───────────────────────────┘
               │
        ┌──────┴──────┐
        │  OS Native   │
        │ Win / Mac /  │
        │   Linux      │
        └─────────────┘
```

> **Tauri vs alternatives**: Tauri v2 uses the OS native WebView, producing ~5MB installers — roughly 1/5 the footprint of comparable Electron-based tools.

---

## FAQ

<details>
<summary><b>Is MarkFlow free?</b></summary>

MarkFlow is currently free. A premium tier with advanced features may be introduced in the future, but core editing functionality will remain free forever.
</details>

<details>
<summary><b>How do I restore default settings?</b></summary>

Click "Restore Default" in `File → Settings` or `File → Keyboard Shortcuts`.
</details>

<details>
<summary><b>What file formats are supported?</b></summary>

`.md`, `.markdown`, `.txt`. More formats are planned.
</details>

<details>
<summary><b>How do I report a bug or request a feature?</b></summary>

- [GitHub Issues](https://github.com/fankaa/markdown/issues)
- [Gitee Issues](https://gitee.com/fankaa/markdown/issues)
</details>

---

## Support the Project

If MarkFlow makes your writing flow better, consider buying the author a coffee ☕

| WeChat | Alipay |
|---|---|
| *(QR code / donation link)* | *(QR code / donation link)* |

Every bit of support fuels continued development 🚀

---

## Contact the Author

| Channel | Link |
|---|---|
| GitHub | [@fankaa](https://github.com/fankaa) |
| Gitee | [@fankaa](https://gitee.com/fankaa) |
| Email | *(your email address)* |

For collaboration, custom development, or general inquiries — don't hesitate to reach out.

---

## License

Copyright (c) 2024-2026 MarkFlow. All rights reserved.

This software is proprietary commercial software. Unauthorized copying, modification, distribution, or use of any part of this software is strictly prohibited.

Bundled open-source components are licensed under their respective terms. See `Help → About` within the application for details.

---

<p align="center">
  <b>✨ MarkFlow — Write at the speed of thought</b><br><br>
  <a href="https://github.com/fankaa/markdown/releases">⬇ Download</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/fankaa/markdown/issues">🐛 Report Bug</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/fankaa/markdown">⭐ Star on GitHub</a>
</p>
