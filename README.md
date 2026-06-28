# TizuMark

🌐 **简体中文** | [English](README.en.md)

<div align="center">

![TizuMark](icon.png)

</div>

<p align="center">
  <b>⚡轻量 &nbsp;·&nbsp; 🚀高速 &nbsp;·&nbsp; ✨简洁 &nbsp;·&nbsp; 🆓<font color="#16a34a">开源免费</font></b>
  <br>
  <b>一个纯粹、快速的 Markdown 编辑器</b>
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

## 为什么你需要 TizuMark？

<p align="center"><b>打开、查看、编辑、导出——就是这么简单。</b></p>

市面上不缺 Markdown 编辑器，但大多走向两个极端：要么是动辄几百 MB 的"重型武器"，要么功能简陋得无法日常使用。TizuMark 卡在中间，刚好合适。

| | 常见方案 | ✨ TizuMark |
|---|---|---|
| 🚀 **启动** | 等 IDE 加载、装插件、切窗口——几十秒过去了 | **双击即开，一秒以内** |
| 👀 **阅读** | 源码和渲染分两屏，看个文档眼都花了 | **实时预览，所见即所得，无需切换** |
| 📂 **多文件** | 开十个窗口，任务栏密密麻麻 | **多标签页管理，干净利落** |
| 🧭 **长文档** | 滚轮滚到手酸，想回头找某个段落得翻半天 | **大纲自动解析，一键跳转，永不失位** |
| ✍️ **写作** | 格式全靠手敲，插入表格图片像做手术 | **语法高亮、右键菜单、自动补全——写得顺畅** |
| 📐 **公式** | 没装 LaTeX？抱歉，看不了 | **内置 KaTeX，行内、独立、矩阵、方程组全支持** |
| 📊 **图表** | 切到其他工具画图 → 导出 → 粘贴 → 再来一遍 | **Mermaid 代码即图表，流程图、时序图、甘特图** |
| 💾 **资源** | 几百 MB 内存，几个 G 安装包 | **Rust 原生引擎，安装包 ~5MB，内存 <50MB** |
| 🎨 **主题** | 万年不变的一个颜色，或者改半天配置文件 | **亮色/暗色/跟随系统，一键切换** |
| 🖥️ **跨平台** | Windows 能用，换 Mac/Linux 又得找替代品 | **同一套代码，三平台原生体验** |

---

## 功能一览

| 📝 编辑 | 👁️ 预览 | 📤 导出 |
|---|---|---|
| GFM 完整语法高亮 | 实时同步滚动 | 导出 HTML 单文件（完整样式） |
| 代码块 100+ 语言着色 | KaTeX 数学公式渲染 | 导出高清长图 PNG |
| 查找替换（支持正则） | Mermaid 流程图/时序图/甘特图/状态图 | 保留暗黑/亮色主题样式 |
| 自动补全括号、引号 | Emoji 短代码 (`:rocket:` → 🚀) | 完全离线，无需联网 |
| 插入菜单（表格/提示块/目录等） | 自适应图片尺寸 | 中英文 Emoji 完美适配 |

| ⚡ 效率 | 🎨 个性化 | 🔧 专业 |
|---|---|---|
| 大纲导航一键跳转 | 亮色 / 暗黑 / 跟随系统 | CLI 命令行打开文件 |
| 拖拽、批量打开文件 | 字体大小/行高/内容宽度可调 | 文件关联 .md / .markdown |
| 编辑/预览分屏比例自由拖拽 | Tab 宽度 / 自动换行开关 | 自动保存 + 脏状态标记 |
| 多标签页 + 右键快捷菜单 | 全套快捷键可自定义 | 状态栏实时字数统计 |

---

## 快速开始

### 下载安装

前往 [Releases 页面](https://gitee.com/tizu/tizu-mark/releases) 下载安装包，双击即装，即装即用。

| 平台 | 状态 |
|---|---|
| Windows | ✅ 已发布 |
| macOS | 🔜 即将推出 |
| Linux | 🔜 即将推出 |

> 想看 TizuMark 支持的全部语法？打开 Demo 文件体验：[demo.md](demo.md)

### 快捷键速览

| 快捷键 | 功能 | 快捷键 | 功能 |
|---|---|---|---|
| `Ctrl+N` | 新建文件 | `Ctrl+W` | 关闭标签 |
| `Ctrl+O` | 打开文件 | `Ctrl+F` | 查找 |
| `Ctrl+S` | 保存文件 | `Ctrl+H` | 查找替换 |
| `Ctrl+B` | 加粗 | `Ctrl+I` | 斜体 |

> 所有快捷键可在 `文件 → 快捷键设置` 中自定义

### 从源码构建

```bash
git clone https://gitee.com/tizu/tizu-mark.git
cd tizu-mark
npm install
npm run dev      # 开发模式
npm run build    # 构建发布版本
```

---

## 🛠 技术架构

```
┌──────────────────────────────────────────────────┐
│                  前端 (WebView)                   │
│   CodeMirror 5  │  highlight.js  │    KaTeX      │
│     Mermaid     │  html2canvas   │     ...       │
└──────────────┬───────────────────────────────────┘
               │ IPC (ipc: / tauri:)
┌──────────────┴───────────────────────────────────┐
│                  后端 (Rust)                      │
│     Tauri 2.5    │    pulldown-cmark              │
│     文件 I/O     │     系统对话框                  │
└──────────────┬───────────────────────────────────┘
               │
        ┌──────┴──────┐
        │  OS Native   │
        │ Win / Mac /  │
        │   Linux      │
        └─────────────┘
```

> Tauri v2 使用系统原生 WebView，安装包仅 ~5MB，内存占用不到 Electron 类应用的 1/5。

---

## 常见问题

<details open>
<summary><b>TizuMark 是免费的吗？</b></summary>

是的，永久免费且开源。基础功能没有任何限制。
</details>

<details open>
<summary><b>如何恢复默认设置？</b></summary>

在 `文件 → 设置` 或 `文件 → 快捷键设置` 中点击「恢复默认」按钮即可。
</details>

<details open>
<summary><b>支持哪些文件格式？</b></summary>

支持 `.md`、`.markdown`、`.txt` 文件。更多格式支持计划中。
</details>

<details open>
<summary><b>如何反馈问题或建议？</b></summary>

- QQ交流群：**1035294939**
- [Gitee Issues](https://gitee.com/tizu/tizu-mark/issues)
- [GitHub Issues](https://github.com/tizu/tizu-mark/issues)
</details>

---

## 捐赠支持

<p align="center"><b>一个人的开源，全靠你的支持续命。</b></p>

做 TizuMark 的原因很简单：用了很多 Markdown 工具，不是太臃肿就是不好用，干脆自己撸一个。

从第一行代码到现在，每个功能、每处细节，都是下班后和周末挤时间打磨的。没有团队，没有工资，没有 KPI，只有一个不想将就的人，和一台从不关机的电脑。

如果 TizuMark 帮到了你——看文档更轻松了、写东西更顺手了、导出的图让人夸好看了——希望能支持一下。**十万八万不嫌多，一块两块不嫌少**，每一笔钱都会让我实实在在地开心一整天，也意味着这个项目可以活得更久。

不方便打赏也没关系，点个 Star、发给朋友、或者在群里说一声"好用"，就已经是莫大的鼓励。

<p align="center">
  <img src="donate-wechat.png" alt="微信赞赏" width="220">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="donate-alipay.png" alt="支付宝赞赏" width="220">
</p>

<p align="center"><sub>每一笔我都会认真看。谢谢你。</sub></p>

---

## 联系作者

| 方式 | 链接 |
|---|---|
| QQ群 | **1035294939** [@点击链接加入群聊【Tizu交流群】](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=G0xAh9l042apAmjy9MAKOI6pSMWhV5jI&authKey=hWwxCXRZkWorgQZtiBNeRE6L12Ow6CLSo9K9dWzSjDFNuIEfmnmLAWH1T3qooH40&noverify=0&group_code=1035294939)|
| Gitee | [@tizu](https://gitee.com/tizu) |
| GitHub | [@tizu](https://github.com/tizu) |

有问题、建议、合作，欢迎加群或提 Issue。

---

## 许可证

Copyright (c) 2024-2026 TizuMark

本软件基于 [GNU General Public License v3.0](LICENSE) 开源发布。你可以自由使用、修改和分发，但衍生作品必须延续 GPL v3 协议。

内置开源组件按其各自许可证授权，详见应用内 `帮助 → 关于` 页面。

---

<p align="center">
  <b>✨ TizuMark — 轻得不像话，快得刚刚好</b><br><br>
  <a href="https://gitee.com/tizu/tizu-mark/releases">⬇ 下载体验</a>
  &nbsp;·&nbsp;
  <b>QQ群 1035294939</b>
  &nbsp;·&nbsp;
  <a href="https://gitee.com/tizu/tizu-mark">⭐ 给个 Star</a>
</p>
