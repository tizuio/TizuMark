# TizuMark

🌐 [简体中文](README.md) | **English**

<div align="center">

![TizuMark](icon.png)

</div>

<p align="center">
  <b>⚡Lightning Fast &nbsp;·&nbsp; 🚀High Performance &nbsp;·&nbsp; ✨Elegant &nbsp;·&nbsp; 🆓<font color="#16a34a">Free Forever</font></b>
  <br>
  <b>A Cross-Platform Markdown Editor That Just Works</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Windows-7%2B-brightgreen" alt="Windows">
  <img src="https://img.shields.io/badge/macOS-Coming%20Soon-lightgrey" alt="macOS">
  <img src="https://img.shields.io/badge/Linux-Coming%20Soon-lightgrey" alt="Linux">
  <img src="https://img.shields.io/badge/Tauri-2.x-orange" alt="Tauri">
  <img src="https://img.shields.io/badge/Rust-1.77%2B-black" alt="Rust">
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License">
</p>

---

## Why TizuMark?

<p align="center"><b>One app. Every Markdown task. Zero friction.</b></p>

| | The Old Way | ✨ TizuMark |
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

Get the latest installer from [Releases](https://github.com/tizu/tizu-mark/releases):

| Platform | Status |
|---|---|
| Windows | Released |
| macOS | Coming soon |
| Linux | Coming soon |

Install, launch, write.

> Want to see everything TizuMark can do? Try the demo: [demo.md](demo.md)

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
git clone https://github.com/tizu/tizu-mark.git
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

<details open>
<summary><b>Is TizuMark free?</b></summary>

TizuMark is free forever. Core features have no restrictions. A premium tier may be introduced in the future, but existing features will remain unaffected.
</details>

<details open>
<summary><b>How do I restore default settings?</b></summary>

Click "Restore Default" in `File → Settings` or `File → Keyboard Shortcuts`.
</details>

<details open>
<summary><b>What file formats are supported?</b></summary>

`.md`, `.markdown`, `.txt`. More formats are planned.
</details>

<details open>
<summary><b>How do I report a bug or request a feature?</b></summary>

- QQ Group: **1035294939** (Chinese community)
- [GitHub Issues](https://github.com/tizu/tizu-mark/issues)
- [Gitee Issues](https://gitee.com/tizu/tizu-mark/issues)
</details>

---

## Support the Project

If TizuMark makes your writing flow better, consider buying the author a coffee ☕

<p align="center">
  <img src="donate-wechat.png" alt="WeChat Donate" width="200">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="donate-alipay.png" alt="Alipay Donate" width="200">
</p>

Every bit of support fuels continued development 🚀

---

## Contact

| Channel | Link |
|---|---|
| QQ Group | **1035294939** [@Click the link to join the group chat【Tizu交流群】](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=G0xAh9l042apAmjy9MAKOI6pSMWhV5jI&authKey=hWwxCXRZkWorgQZtiBNeRE6L12Ow6CLSo9K9dWzSjDFNuIEfmnmLAWH1T3qooH40&noverify=0&group_code=1035294939)|
| GitHub | [@tizu](https://github.com/tizu) |
| Gitee | [@tizu](https://gitee.com/tizu) |

For collaboration, custom development, or general inquiries — join our QQ group or open an issue.

---

## License

Copyright (c) 2024-2026 TizuMark. All rights reserved.

This software is proprietary commercial software. Unauthorized copying, modification, distribution, or use of any part of this software is strictly prohibited.

Bundled open-source components are licensed under their respective terms. See `Help → About` within the application for details.

---

<p align="center">
  <b>✨ TizuMark — Write at the speed of thought</b><br><br>
  <a href="https://github.com/tizu/tizu-mark/releases">⬇ Download</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tizu/tizu-mark/issues">🐛 Report Bug</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tizu/tizu-mark">⭐ Star on GitHub</a>
</p>
