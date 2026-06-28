# TizuMark

🌐 [简体中文](README.md) | **English**

<div align="center">

![TizuMark](icon.png)

</div>

<p align="center">
  <b>⚡Lightweight &nbsp;·&nbsp; 🚀Blazing Fast &nbsp;·&nbsp; ✨Minimal &nbsp;·&nbsp; 🆓<font color="#16a34a">Free & Open Source</font></b>
  <br>
  <b>A clean, fast Markdown editor</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Windows-7%2B-brightgreen" alt="Windows">
  <img src="https://img.shields.io/badge/macOS-Coming%20Soon-lightgrey" alt="macOS">
  <img src="https://img.shields.io/badge/Linux-Coming%20Soon-lightgrey" alt="Linux">
  <img src="https://img.shields.io/badge/Tauri-2.x-orange" alt="Tauri">
  <img src="https://img.shields.io/badge/Rust-1.77%2B-black" alt="Rust">
  <img src="https://img.shields.io/badge/License-GPL--3.0-blue" alt="License">
</p>

---

## Why TizuMark?

<p align="center"><b>Open. Read. Edit. Export. That's it.</b></p>

The world isn't short of Markdown editors. But most fall into one of two camps: heavyweight monsters that hog hundreds of MB, or toys too barebones for real work. TizuMark lands right in the sweet spot.

| | The Usual Way | ✨ TizuMark |
|---|---|---|
| 🚀 **Startup** | Boot up a full IDE, install plugins, wait... and wait | **Double-click. Up in under a second.** |
| 👀 **Reading** | Source on one side, render on the other — squint and scroll | **Live preview, WYSIWYG, no mode switching needed** |
| 📂 **Tabs** | Ten windows, taskbar chaos | **Clean multi-tab interface. Peace of mind.** |
| 🧭 **Navigation** | Scroll endlessly, can't find that one section you need | **Auto-generated outline. One click to any heading.** |
| ✍️ **Writing** | Format manually, inserting a table feels like surgery | **Syntax highlighting, right-click menus, auto-complete — just write** |
| 📐 **Math** | No LaTeX installed? Sorry, you're out of luck | **Built-in KaTeX — inline, display, matrices, equation systems** |
| 📊 **Diagrams** | Fire up another tool, draw, export, paste, repeat | **Mermaid — flowcharts, sequence diagrams, Gantt charts, in code** |
| 💾 **Resources** | Hundreds of MB RAM, multi-GB install | **Rust engine. ~5MB installer, <50MB RAM.** |
| 🎨 **Themes** | One stale color scheme, or config-file archaeology | **Light / Dark / System — one click, no fumbling** |
| 🖥️ **Platforms** | Different tool for every OS, different quirks | **One codebase. Native on Windows, macOS & Linux.** |

---

## Features

| 📝 Editing | 👁️ Preview | 📤 Export |
|---|---|---|
| Full GFM syntax highlighting | Live scroll-synced preview | Standalone HTML (with full styling) |
| 100+ language code highlighting | KaTeX math rendering | High-res long screenshot PNG |
| Find & replace with regex | Mermaid flowcharts, sequences, Gantt, state | Dark / light theme preserved |
| Auto bracket & quote pairing | Emoji shortcodes (`:rocket:` → 🚀) | 100% offline |
| Insert menu (tables, callouts, TOC) | Adaptive image sizing | CJK Emoji support |

| ⚡ Productivity | 🎨 Style | 🔧 Power |
|---|---|---|
| Outline sidebar — jump anywhere | Light / Dark / Follow System themes | CLI file opening |
| Drag & drop, batch file open | Font size, line height, max width | File association: .md, .markdown |
| Free-drag split pane ratio | Tab width, word wrap toggle | Auto-save + dirty state markers |
| Multi-tab + right-click context menus | Fully rebindable shortcuts | Status bar word & char count |

---

## Quick Start

### Download

Get the latest installer from [Releases](https://github.com/tizu/tizu-mark/releases):

| Platform | Status |
|---|---|
| Windows | ✅ Released |
| macOS | 🔜 Coming soon |
| Linux | 🔜 Coming soon |

Install, launch, done.

> Want to see every syntax TizuMark supports? Open the demo: [demo.md](demo.md)

### Shortcuts

| Shortcut | Action | Shortcut | Action |
|---|---|---|---|
| `Ctrl+N` | New File | `Ctrl+W` | Close Tab |
| `Ctrl+O` | Open File | `Ctrl+F` | Find |
| `Ctrl+S` | Save File | `Ctrl+H` | Find & Replace |
| `Ctrl+B` | Bold | `Ctrl+I` | Italic |

> All shortcuts are customizable via `File → Keyboard Shortcuts`

### Build from Source

```bash
git clone https://github.com/tizu/tizu-mark.git
cd tizu-mark
npm install
npm run dev      # dev mode
npm run build    # production build
```

---

## 🛠 Architecture

```
┌──────────────────────────────────────────────────┐
│                 Frontend (WebView)                 │
│   CodeMirror 5  │  highlight.js  │    KaTeX       │
│     Mermaid     │  html2canvas   │     ...        │
└──────────────┬───────────────────────────────────┘
               │ IPC (ipc: / tauri:)
┌──────────────┴───────────────────────────────────┐
│                  Backend (Rust)                    │
│     Tauri 2.5    │    pulldown-cmark               │
│     File I/O     │    Native Dialogs               │
└──────────────┬───────────────────────────────────┘
               │
        ┌──────┴──────┐
        │  OS Native   │
        │ Win / Mac /  │
        │   Linux      │
        └─────────────┘
```

> Tauri v2 uses the OS native WebView — ~5MB installer, ~1/5 the footprint of Electron-based alternatives.

---

## FAQ

<details open>
<summary><b>Is TizuMark really free?</b></summary>

Yes. Free forever, open source, no feature paywalls.
</details>

<details open>
<summary><b>How do I restore default settings?</b></summary>

Click "Restore Default" in `File → Settings` or `File → Keyboard Shortcuts`.
</details>

<details open>
<summary><b>What file formats are supported?</b></summary>

`.md`, `.markdown`, `.txt`. More coming.
</details>

<details open>
<summary><b>How do I report a bug or request a feature?</b></summary>

- QQ Group: **1035294939** (Chinese community)
- [GitHub Issues](https://github.com/tizu/tizu-mark/issues)
- [Gitee Issues](https://gitee.com/tizu/tizu-mark/issues)
</details>

---

## Donate

<p align="center"><b>One person. No salary. Your support keeps this alive.</b></p>

I built TizuMark because I was tired of Markdown tools that were either bloated or broken. So I made my own.

Every feature, every pixel, every bug squashed — carved out on nights and weekends after my day job. No company. No team. No funding. Just someone with a stubborn refusal to ship something mediocre.

If TizuMark has made your life even a little easier — docs look cleaner, writing flows better, that export earned you a compliment — please consider chipping in. **A hundred bucks or a single dollar — it all counts, and every bit of it genuinely makes my day and extends this project's runway.**

Can't donate? No worries. A GitHub star, a shout-out to a friend, a "nice tool" in the group chat — that's already huge.

<p align="center">
  <img src="donate-wechat.png" alt="WeChat Donate" width="220">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="donate-alipay.png" alt="Alipay Donate" width="220">
</p>

<p align="center"><sub>I read every donation notification. Thank you.</sub></p>

---

## Contact

| Channel | Link |
|---|---|
| QQ Group | **1035294939** [@Join the group【Tizu交流群】](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=G0xAh9l042apAmjy9MAKOI6pSMWhV5jI&authKey=hWwxCXRZkWorgQZtiBNeRE6L12Ow6CLSo9K9dWzSjDFNuIEfmnmLAWH1T3qooH40&noverify=0&group_code=1035294939)|
| GitHub | [@tizu](https://github.com/tizu) |
| Gitee | [@tizu](https://gitee.com/tizu) |

Questions, feedback, collaboration — open an issue or join the QQ group.

---

## License

Copyright (c) 2024-2026 TizuMark

This software is released under the [GNU General Public License v3.0](LICENSE). You are free to use, modify, and distribute it, but derivative works must remain under GPL v3.

Bundled open-source components are licensed under their respective terms. See `Help → About` in the app for details.

---

<p align="center">
  <b>✨ TizuMark — Stupidly light. Exactly fast enough.</b><br><br>
  <a href="https://github.com/tizu/tizu-mark/releases">⬇ Download</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tizu/tizu-mark/issues">🐛 Report Bug</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tizu/tizu-mark">⭐ Star on GitHub</a>
</p>
