# TizuMark

🌐 **简体中文** | [English](README.en.md)

<div align="center">

![TizuMark](icon.png)

</div>

<p align="center">
  <b>⚡轻量 &nbsp;·&nbsp; 🚀高速 &nbsp;·&nbsp; ✨优雅 &nbsp;·&nbsp; 🆓<font color="#16a34a">永久免费</font></b>
  <br>
  <b>跨平台 Markdown 编辑器</b>
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

## 为什么选择 TizuMark？

<p align="center"><b>一个软件，解决你所有 Markdown 写作需求。</b></p>

| | 常规方案 | ✨ TizuMark |
|---|---|---|
| 🚀 **启动速度** | 等待 IDE 加载 → 装插件 → 打开文件 → 数秒等待 | **双击即开，秒级启动** |
| 📝 **编辑预览** | 编辑器和预览分离，切换窗口手忙脚乱 | **实时双栏同步，所见即所得** |
| 🧭 **文档导航** | 长文档手动滚屏，标题找不到、位置丢失 | **智能大纲自动解析，一键跳转** |
| 📤 **导出分享** | 装 Pandoc → 学命令行 → 调参数 → 格式错乱 | **一键导出 HTML / 高清长图** |
| 📐 **数学公式** | 不支持或需额外配置 LaTeX 环境 | **内置 KaTeX，即写即渲染** |
| 📊 **流程图** | 切换绘图工具 → 画图 → 导出截图 → 粘贴 | **Mermaid 语法，代码即图表** |
| 🎨 **外观定制** | 一个主题用到吐，换个色还得改配置文件 | **亮色/暗色/跟随系统，一键切换** |
| 💾 **内存占用** | 动辄几百 MB，开着吃资源 | **Rust 原生引擎，<50MB** |
| 🖥️ **跨平台** | Windows 能用，macOS/Linux 得另找方案 | **一套代码，三平台原生体验** |

---

## 核心功能

| 编辑 | 预览 | 导出 |
|---|---|---|
| 多标签页管理 | 实时同步滚动 | 导出为 HTML 单文件 |
| 完整 GFM 语法高亮 | KaTeX 数学公式渲染 | 导出为高清长图 |
| 代码块 100+ 语言 | Mermaid 流程图/时序图 | 保留完整样式 |
| 自动补全括号 | Emoji 短代码 | 中英文 Emoji 适配 |
| 查找替换 / 正则 | 自适应图片尺寸 | 离线导出，无需联网 |

| 效率 | 个性化 | 专业 |
|---|---|---|
| 大纲导航快速跳转 | 全套快捷键可自定义 | 支持 CLI 参数打开文件 |
| 拖拽打开文件 | 字体/行高/宽度调节 | 文件关联 .md / .markdown |
| 分屏比例自由拖拽 | Tab 大小 / 自动换行 | 自动保存 / 脏状态标记 |
| 批量文件打开 | 显示行号开关 | 状态栏字数统计 |

---

## 快速上手

### 下载安装

前往 [Releases 页面](https://gitee.com/tizu/tizu-mark/releases) 下载对应平台安装包：

| 平台 | 状态 |
|---|---|
| Windows | 已发布 |
| macOS | 即将推出，敬请期待 |
| Linux | 即将推出，敬请期待 |

双击安装，开始写作。

> 想看 TizuMark 支持的全部语法？打开 Demo 文件体验：[demo.md](demo.md)

### 快捷键速览

| 快捷键 | 功能 | 快捷键 | 功能 |
|---|---|---|---|
| `Ctrl+N` | 新建文件 | `Ctrl+W` | 关闭标签页 |
| `Ctrl+O` | 打开文件 | `Ctrl+F` | 查找 |
| `Ctrl+S` | 保存文件 | `Ctrl+H` | 查找替换 |
| `Ctrl+B` | 加粗 | `Ctrl+I` | 斜体 |
| `Ctrl+K` | 插入链接 | `Ctrl+Tab` | 切换标签页 |

> 所有快捷键可在 `文件 → 快捷键设置` 中自定义

### 从源码构建

```bash
# 克隆仓库
git clone https://gitee.com/tizu/tizu-mark.git
cd markdown

# 安装依赖
npm install

# 启动开发模式
npm run dev

# 构建发布版本
npm run build
```

---

## 🛠 技术架构

```
┌──────────────────────────────────────────┐
│                 前端 (WebView)            │
│   CodeMirror 5  │  markdown-it  │ KaTeX  │
│   highlight.js  │    Mermaid    │ ...    │
└──────────────┬───────────────────────────┘
               │ IPC (ipc: / tauri:)
┌──────────────┴───────────────────────────┐
│              后端 (Rust)                  │
│   Tauri 2.5  │  pulldown-cmark         │
│   文件 I/O   │   系统对话框              │
└──────────────┬───────────────────────────┘
               │
        ┌──────┴──────┐
        │  OS Native   │
        │ Win / Mac /  │
        │   Linux      │
        └─────────────┘
```

> **为什么不用 Electron？** Tauri v2 使用系统原生 WebView，安装包仅 ~5MB，内存占用不到 Electron 类应用的 1/5。

---

## 常见问题

<details open>
<summary><b>TizuMark 是免费的吗？</b></summary>

TizuMark 永久免费，基础功能不设任何限制。未来可能推出高级付费版本，但现有功能不会受到影响。
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

## 支持项目

如果 TizuMark 帮助你提升了写作效率，欢迎请作者喝杯咖啡 ☕

<p align="center">
  <img src="donate-wechat.png" alt="微信赞赏" width="200">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="donate-alipay.png" alt="支付宝赞赏" width="200">
</p>

您的支持是我持续更新的动力 🚀

---

## 联系作者

| 方式 | 链接 |
|---|---|
| QQ群 | **1035294939**  [@点击链接加入群聊【Tizu交流群】](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=G0xAh9l042apAmjy9MAKOI6pSMWhV5jI&authKey=hWwxCXRZkWorgQZtiBNeRE6L12Ow6CLSo9K9dWzSjDFNuIEfmnmLAWH1T3qooH40&noverify=0&group_code=1035294939)|
| Gitee | [@tizu](https://gitee.com/tizu) |
| GitHub | [@tizu](https://github.com/tizu) |

有合作意向、定制需求或任何问题，欢迎加群或通过 Issues 联系。

---

## 许可证

Copyright (c) 2024-2026 TizuMark. All rights reserved.

本软件为专有商业软件，保留所有权利。未经授权，不得以任何形式复制、修改、分发或使用本软件的全部或部分内容。

内置开源组件按其各自许可证授权，详见应用内 `帮助 → 关于` 页面。

---

<p align="center">
  <b>✨ TizuMark — 让写作回归专注</b><br><br>
  <a href="https://gitee.com/tizu/tizu-mark/releases">⬇ 下载体验</a>
  &nbsp;·&nbsp;
  <b>QQ群 1035294939</b>
  &nbsp;·&nbsp;
  <a href="https://gitee.com/tizu/tizu-mark">⭐ 给个 Star</a>
</p>
