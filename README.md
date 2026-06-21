# MarkFlow

🌐 **简体中文** | [English](README.en.md)

> ✨ **轻量级跨平台 Markdown 编辑器** — 基于 Tauri + Rust 构建，极致性能，优雅体验。实时预览、多标签页、智能大纲、数学公式、流程图导出，让你专注于写作本身。

---

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/fankaa/markdown)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/Tauri-2.x-orange.svg)](https://tauri.app)
[![Rust](https://img.shields.io/badge/Rust-1.77+-black.svg)](https://www.rust-lang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

---

## 为什么选择 MarkFlow？

<table>
<tr><td>

**普通编辑器：**
```
打开 VS Code → 找插件 → 装 Markdown 预览 → 卡顿
写完想导出 → 装 Pandoc → 命令行转换 → 格式错乱
想看大纲 → 手动滚动找标题 → 丢失位置
```

</td><td>

**MarkFlow：**
```
双击打开 → 即时写作 → 实时预览
导出 HTML → 一键分享 → 格式完美
智能大纲 → 点击跳转 → 精确定位
```

</td></tr>
</table>

---

## 核心特性

<table>
<tr>
<td width="50%">

### 📝 编辑体验

- **实时双栏预览** — 左侧编辑，右侧即时渲染
- **多标签页管理** — 同时编辑多个文件
- **智能大纲导航** — 自动识别标题，一键跳转
- **专业语法高亮** — GFM 语法完整支持
- **代码块增强** — 一键复制，多语言高亮

</td>
<td width="50%">

### 🎨 个性化设置

- **主题切换** — 明亮 / 暗黑 / 跟随系统
- **自定义快捷键** — 根据习惯配置
- **编辑器配置** — 字体、Tab、行号、换行
- **预览配置** — 字号、行高、最大宽度
- **可调节布局** — 自由拖拽分屏比例

</td>
</tr>
<tr>
<td>

### 📤 导出功能

- **导出 HTML** — 生成独立网页，可直接分享
- **导出长图** — 高清长图，适合社交媒体

</td>
<td>

### 🚀 扩展语法

- **数学公式** — KaTeX/LaTeX 渲染
- **流程图** — Mermaid 图表支持
- **Emoji** — 短代码快速插入

</td>
</tr>
</table>

---

## 功能演示

### 实时预览

写入 Markdown，右侧即时渲染，所见即所得。

### 智能大纲

自动识别文档标题层级，点击快速跳转。

### 数学公式

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 流程图

```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作]
    B -->|否| D[结束]
    C --> D
```

---

## 快捷键

| 快捷键 | 功能 | 快捷键 | 功能 |
|--------|------|--------|------|
| `Ctrl+N` | 新建文件 | `Ctrl+W` | 关闭标签页 |
| `Ctrl+O` | 打开文件 | `Ctrl+F` | 查找 |
| `Ctrl+S` | 保存文件 | `Ctrl+H` | 查找替换 |
| `Ctrl+Tab` | 下一个标签页 | `Ctrl+Shift+Tab` | 上一个标签页 |

> 💡 所有快捷键可在「文件 → 快捷键设置」中自定义

---

## 快速开始

### 下载安装

前往 [Releases](https://gitee.com/fankaa/markdown/releases) 下载最新版本。

### 开发环境

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.77
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

### 从源码构建

```bash
# 克隆仓库
git clone https://gitee.com/fankaa/markdown.git
cd markdown

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

---

## 技术栈

<table>
<tr>
<td align="center" width="30%">

**前端**
<br>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
<br><br>
CodeMirror 5

</td>
<td align="center" width="30%">

**后端**
<br>
<img src="https://img.shields.io/badge/Tauri-2.x-FFC131?style=flat&logo=tauri&logoColor=black" alt="Tauri">
<img src="https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white" alt="Rust">
<br><br>
原生性能

</td>
<td align="center" width="30%">

**渲染引擎**
<br>
<img src="https://img.shields.io/badge/markdown--it-Module-blue" alt="markdown-it">
<img src="https://img.shields.io/badge/highlight.js-Syntax-green" alt="highlight.js">
<img src="https://img.shields.io/badge/KaTeX-Math-purple" alt="KaTeX">
<img src="https://img.shields.io/badge/Mermaid-Diagram-pink" alt="Mermaid">

</td>
</tr>
</table>

---

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
│   ├── guide.md            # 使用说明（中文）
│   ├── guide.en.md         # 使用说明（英文）
│   └── lib/                # 第三方库
├── package.json
└── README.md
```

---

## 常见问题

<details>
<summary><b>Q: 如何恢复默认设置？</b></summary>

在「文件 → 设置」或「文件 → 快捷键设置」中点击「恢复默认」按钮。
</details>

<details>
<summary><b>Q: 支持哪些文件格式？</b></summary>

支持 `.md`、`.markdown`、`.txt` 格式的文件。
</details>

<details>
<summary><b>Q: 如何反馈问题？</b></summary>

访问 [Gitee Issues](https://gitee.com/fankaa/markdown/issues) 提交问题或建议。
</details>

---

## 贡献

欢迎参与！Bug 修复、新功能、文档改进都可以。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 许可证

MIT License — 自由使用，商业或个人均可。

---

<div align="center">

**✨ MarkFlow — 让 Markdown 写作更优雅**

[下载体验](https://gitee.com/fankaa/markdown/releases) · [提交 Issue](https://gitee.com/fankaa/markdown/issues) · [贡献代码](https://gitee.com/fankaa/markdown/pulls)

</div>
