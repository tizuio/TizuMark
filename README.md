# MarkFlow

轻量级跨平台 Markdown 编辑器，基于 Tauri + Rust 构建。

## 功能特性

- 实时预览
- 语法高亮
- 文件管理（新建/打开/保存）
- 导出为 HTML/Markdown
- 深色/浅色主题切换
- 可调节编辑/预览分屏比例

## 开发环境要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.77
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

## 安装与运行

```bash
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
├── src-tauri/          # Rust 后端
│   ├── src/
│   │   ├── main.rs     # 主入口
│   │   └── lib.rs      # 核心逻辑
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/                # 前端代码
│   ├── index.html      # 主页面
│   ├── styles.css      # 样式
│   └── app.js          # 应用逻辑
├── package.json
└── README.md
```

## License

MIT
