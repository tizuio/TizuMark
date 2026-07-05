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

<p align="center" style="font-size:1.15em"><b>~7MB installer · &lt;50MB RAM · Double-click to launch</b></p>

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
| 💾 **Resources** | Hundreds of MB RAM, multi-GB install | **Rust engine. ~7MB installer, <50MB RAM.** |
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

## Screenshots

<p align="center">
  <img src="screenshots/1.png" alt="Screenshot 1" width="45%">
  <img src="screenshots/2.png" alt="Screenshot 2" width="45%">
  <br>
  <img src="screenshots/3.png" alt="Screenshot 3" width="45%">
  <img src="screenshots/4.png" alt="Screenshot 4" width="45%">
  <br>
  <img src="screenshots/5.png" alt="Screenshot 5" width="45%">
  <img src="screenshots/6.png" alt="Screenshot 6" width="45%">
  <br>
  <img src="screenshots/7.png" alt="Screenshot 7" width="45%">
  <img src="screenshots/8.png" alt="Screenshot 8" width="45%">
</p>

---

## Quick Start

### Download

| Platform | Status |
|----------|--------|
| Windows | ✅ Supported |
| macOS | 🔜 Coming soon |
| Linux | 🔜 Coming soon |

<b>Visit the release page to download:</b>

<a href="https://github.com/tizuio/TizuMark/releases"><img src="https://img.shields.io/badge/⬇_Download_from_GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Download from GitHub"></a>
&nbsp;&nbsp;
<a href="https://gitee.com/tizu/tizu-mark/releases"><img src="https://img.shields.io/badge/⬇_Download_from_Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Download from Gitee"></a>

> On first launch, the user guide opens automatically. You can also find it in `Help → User Guide` anytime.

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
git clone https://github.com/tizuio/TizuMark.git
# Or via Gitee (China mirror):
git clone https://gitee.com/tizu/tizu-mark.git
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

> Tauri v2 uses the OS native WebView — ~7MB installer, ~1/5 the footprint of Electron-based alternatives.

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
- [GitHub Issues](https://github.com/tizuio/TizuMark/issues)
- [Gitee Issues](https://gitee.com/tizu/tizu-mark/issues)
</details>

---

## Donate

<p align="center"><b>One person. No salary. Your support keeps this alive.</b></p>

I built TizuMark because I was tired of Markdown tools that were either bloated or broken. So I made my own.

Every feature, every pixel, every bug squashed — carved out on nights and weekends after my day job. No company. No team. No funding. Just someone with a stubborn refusal to ship something mediocre.

If TizuMark has made your life even a little easier — docs look cleaner, writing flows better, that export earned you a compliment — please consider chipping in. **A hundred bucks or a single dollar — it all counts, and every bit of it genuinely makes my day and extends this project's runway.**

Can't donate? No worries. A GitHub star, a shout-out to a friend, a "nice tool" in the group chat — that's already huge.

<table align="center">
  <tr>
    <td align="center">
      <img src="donate-wechat.png" alt="WeChat Pay" width="220"><br>
      <span style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:14px;font-weight:500">
        <svg role="img" viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;fill:#07C160">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
        </svg>
        WeChat
      </span>
    </td>
    <td width="40"></td>
    <td align="center">
      <img src="donate-alipay.png" alt="Alipay" width="220"><br>
      <span style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;font-size:14px;font-weight:500">
        <svg role="img" viewBox="0 0 24 24" width="18" height="18" style="vertical-align:middle;fill:#1677FF">
          <path d="M19.695 15.07c3.426 1.158 4.203 1.22 4.203 1.22V3.846c0-2.124-1.705-3.845-3.81-3.845H3.914C1.808.001.102 1.722.102 3.846v16.31c0 2.123 1.706 3.845 3.813 3.845h16.173c2.105 0 3.81-1.722 3.81-3.845v-.157s-6.19-2.602-9.315-4.119c-2.096 2.602-4.8 4.181-7.607 4.181-4.75 0-6.361-4.19-4.112-6.949.49-.602 1.324-1.175 2.617-1.497 2.025-.502 5.247.313 8.266 1.317a16.796 16.796 0 0 0 1.341-3.302H5.781v-.952h4.799V6.975H4.77v-.953h5.81V3.591s0-.409.411-.409h2.347v2.84h5.744v.951h-5.744v1.704h4.69a19.453 19.453 0 0 1-1.986 5.06c1.424.52 2.702 1.011 3.654 1.333m-13.81-2.032c-.596.06-1.71.325-2.321.869-1.83 1.608-.735 4.55 2.968 4.55 2.151 0 4.301-1.388 5.99-3.61-2.403-1.182-4.438-2.028-6.637-1.809"/>
        </svg>
        Alipay
      </span>
    </td>
  </tr>
</table>

<p align="center"><sub>I read every donation notification. Thank you.</sub></p>

---

## Contact

| Channel | Link |
|---|---|
| QQ Group | **1035294939** [@Join the group【Tizu交流群】](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=G0xAh9l042apAmjy9MAKOI6pSMWhV5jI&authKey=hWwxCXRZkWorgQZtiBNeRE6L12Ow6CLSo9K9dWzSjDFNuIEfmnmLAWH1T3qooH40&noverify=0&group_code=1035294939)|
| GitHub | [@tizuio](https://github.com/tizuio) |
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
  <a href="https://github.com/tizuio/TizuMark/releases"><img src="https://img.shields.io/badge/⬇_GitHub_Download-black?style=for-the-badge&logo=github" alt="GitHub Download"></a>
  &nbsp;
  <a href="https://gitee.com/tizu/tizu-mark/releases"><img src="https://img.shields.io/badge/⬇_Gitee_Download-C71D23?style=for-the-badge&logo=gitee" alt="Gitee Download"></a>
  <br><br>
  <a href="https://github.com/tizuio/TizuMark">⭐ GitHub Star</a>
  &nbsp;·&nbsp;
  <a href="https://gitee.com/tizu/tizu-mark">⭐ Gitee Star</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tizuio/TizuMark/issues">🐛 Report Bug</a>
</p>
