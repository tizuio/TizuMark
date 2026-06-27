# 滚动同步优化设计

## 问题

编辑器与预览的滚动同步基于字符位置比例映射（`scrollPercent = charPos / totalChars`），但 markdown 源码与渲染后 HTML 的内容密度非线性（标题、代码块、图片等），导致相同百分比指向不同内容。

## 目标

编辑器视口中央的内容在预览视口中也应可见、大致居中，不出现"编辑第 50 行、预览滚到了 200 行"的情况。

## 方案

**渲染后块匹配 + 像素内插**，纯 JS 端实现，不改 Rust。

### 第一步：Markdown 源码分块

在 JS 端新增 `parseBlocks(content)` 函数：

- 按空行将源码切分为逻辑块
- 跟踪围栏代码块（以 ``` 或 ~~~ 开头结尾），内部不切分
- 每个块记录 `{ startLine, endLine }`
- 块是源码中最小的"内容单元"，对应一个 DOM 块级元素

### 第二步：DOM 块元素收集

在 `updatePreview()` 中，`innerHTML` 设置后，新增 `collectBlockElements(previewEl)` 函数：

- 遍历预览 DOM 的直接子元素（及容器子元素如 LI、BLOCKQUOTE 内部）
- 收集块级元素：P、H1~H6、PRE、UL、OL、TABLE、BLOCKQUOTE、HR
- 按出现顺序构成数组

### 第三步：块映射与标记注入

新增 `injectLineMarkers(previewEl, blocks)` 函数：

- 将块数量与 DOM 元素数量按比例映射：DOM 元素索引 i → 块索引 `floor(i / elemCount * blockCount)`
- 在每个 DOM 元素上设置 `data-md-line` 属性值为对应块的 `startLine`
- 构建 `linePositions[]` 数组：`[{ line, top }, ...]`，top 为元素相对预览容器的 `offsetTop`

### 第四步：滚动同步改造

替换 `app.js` 中三处滚动同步逻辑（编辑器 scroll 事件、预览 scroll 事件、updatePreview 恢复），使用新的 `getPreviewTopForLine()` 和 `getLineForPreviewTop()` 函数。

#### 编辑器→预览（`getPreviewTopForLine(line)`）

1. 在 `linePositions` 中二分查找包围 line 的两个标记（lower、upper）
2. `fraction = (line - lower.line) / (upper.line - lower.line)`
3. `targetTop = lower.top + fraction * (upper.top - lower.top)`
4. 返回 `targetTop - preview.clientHeight / 2`（居中）

#### 预览→编辑器（`getLineForPreviewTop(scrollTop)`）

1. `targetTop = scrollTop + preview.clientHeight / 2`
2. 在 `linePositions` 中二分查找包围 targetTop 的两个标记
3. 内插得到目标行号
4. 通过 `cm.charCoords` + `cm.scrollTo` 将编辑器居中到该行

### 第三步补充：边界处理

- 第一个标记之前（文档开头）：`linePositions` 始终包含 `{ line: 0, top: 0 }`
- 最后一个标记之后（文档末尾）：内插时会使用最后两个标记
- 空文档：无块，无标记，不执行同步

## 数据流

```
用户输入 → debounce 30ms → updatePreview()
  → Rust render_markdown（不变）
  → innerHTML 设置
  → processImages/Mermaid/Math（不变）
  → parseBlocks(content)  // 新增
  → collectBlockElements(preview)  // 新增
  → injectLineMarkers(preview, blocks)  // 新增
  → 滚动恢复（使用新映射）// 改造
```

每次 updatePreview 都重建整个映射链，映射始终跟随最新内容。

## 涉及文件

- **src/app.js**：新增 4 个函数 + 改造 3 处滚动同步逻辑
- 不涉及 Rust、CSS、HTML

## 性能

- 分块：O(n)，n 为源码行数
- DOM 遍历：O(m)，m 为预览子元素数（通常远小于 n）
- 映射查找：O(log k)，k 为标记数
- 整体开销 < 1ms，对 30ms debounce 无影响
