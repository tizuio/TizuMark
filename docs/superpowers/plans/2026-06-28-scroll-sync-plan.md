# 滚动同步优化 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将滚动同步从字符位置比例映射改为渲染后块匹配+像素内插，使编辑器视口中央内容与预览视口中央内容对应。

**架构：** 在 `updatePreview()` 中新增四个 JS 方法——`parseBlocks()` 按空行分割 markdown 为块、`collectBlockElements()` 收集预览 DOM 块元素、`injectLineMarkers()` 按比例映射注入 `data-md-line` 属性、`getPreviewTopForLine()`/`getLineForPreviewTop()` 做像素内插查找。改造三处现有滚动逻辑（editor scroll、preview scroll、post-render restore）使用新映射。

**技术栈：** 纯 JS（CodeMirror 5 DOM API），不改 Rust/HTML/CSS

---

### 任务 1：新增 `parseBlocks()` — Markdown 源码分块

**文件：**
- 修改：`src/app.js`（在 `debounceUpdatePreview()` 之后、`updatePreview()` 之前插入）

- [ ] **步骤 1：添加 `parseBlocks()` 方法**

在 `debounceUpdatePreview()` 方法结束（第 2498 行）之后插入：

```javascript
  // 将 markdown 源码按空行切分为逻辑块，跟踪围栏代码块
  parseBlocks(content) {
    const lines = content.split('\n');
    const blocks = [];
    let inFence = false;
    let fenceChar = '';
    let fenceCount = 0;
    let blockStart = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!inFence && (trimmed.startsWith('```') || trimmed.startsWith('~~~'))) {
        const fc = trimmed[0];
        const match = trimmed.match(new RegExp('^\\' + fc + '{3,}'));
        if (match) {
          inFence = true;
          fenceChar = fc;
          fenceCount = match[0].length;
          if (blockStart >= 0) {
            blocks.push({ startLine: blockStart, endLine: i - 1 });
            blockStart = -1;
          }
          blockStart = i;
          continue;
        }
      }

      if (inFence) {
        if (trimmed.startsWith(fenceChar)) {
          const match = trimmed.match(new RegExp('^\\' + fenceChar + '{' + fenceCount + ',}'));
          if (match && trimmed.replace(match[0], '').trim() === '') {
            blocks.push({ startLine: blockStart, endLine: i });
            blockStart = -1;
            inFence = false;
          }
        }
        continue;
      }

      if (trimmed === '') {
        if (blockStart >= 0) {
          blocks.push({ startLine: blockStart, endLine: i - 1 });
          blockStart = -1;
        }
      } else if (blockStart < 0) {
        blockStart = i;
      }
    }

    if (blockStart >= 0) {
      blocks.push({ startLine: blockStart, endLine: lines.length - 1 });
    }

    return blocks;
  }
```

- [ ] **步骤 2：验证**

运行：`node -c src/app.js`
预期：无输出（语法正确）

- [ ] **步骤 3：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 新增 parseBlocks 按空行分块，跟踪围栏代码块"
```

---

### 任务 2：新增 `collectBlockElements()` — 收集预览 DOM 块元素

**文件：**
- 修改：`src/app.js`

- [ ] **步骤 1：添加 `collectBlockElements()` 方法**

在 `parseBlocks()` 之后插入：

```javascript
  // 遍历预览 DOM，收集所有块级渲染元素
  collectBlockElements(root) {
    const blockTags = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE', 'TABLE', 'UL', 'OL', 'BLOCKQUOTE', 'HR']);
    const result = [];

    const walk = (el) => {
      for (const child of el.children) {
        if (blockTags.has(child.tagName)) {
          result.push(child);
        } else {
          walk(child);
        }
      }
    };

    walk(root);
    return result;
  }
```

- [ ] **步骤 2：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 3：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 新增 collectBlockElements 收集预览 DOM 块级元素"
```

---

### 任务 3：新增 `injectLineMarkers()` — 注入行号标记并构建位置映射

**文件：**
- 修改：`src/app.js`

- [ ] **步骤 1：添加 `buildLinePositionMap()` 方法**

在 `collectBlockElements()` 之后插入：

```javascript
  // 将 markdown 块映射到预览 DOM 元素，注入 data-md-line 属性，构建位置映射
  buildLinePositionMap(blocks) {
    const elements = this.collectBlockElements(this.preview);
    const positions = [];

    if (elements.length === 0 || blocks.length === 0) {
      this._linePositions = [{ line: 0, top: 0 }];
      return;
    }

    const previewRect = this.preview.getBoundingClientRect();
    const scrollTop = this.preview.scrollTop;

    for (let i = 0; i < elements.length; i++) {
      const blockIdx = Math.floor((i / elements.length) * blocks.length);
      const line = blocks[blockIdx].startLine;
      elements[i].dataset.mdLine = line;
      const rect = elements[i].getBoundingClientRect();
      positions.push({
        line: line,
        top: rect.top - previewRect.top + scrollTop,
      });
    }

    // 合并相同行号的标记（只保留第一个，即该行块的最小 top 值）
    const deduped = [];
    let lastLine = -1;
    for (const p of positions) {
      if (p.line !== lastLine) {
        deduped.push(p);
        lastLine = p.line;
      }
    }

    // 确保文档开头有标记
    if (deduped.length === 0 || deduped[0].line > 0) {
      deduped.unshift({ line: 0, top: 0 });
    }

    this._linePositions = deduped;
  }
```

- [ ] **步骤 2：在 constructor 中初始化 `_linePositions`**

在 constructor 中（约第 400-440 行的初始化区域）添加：

```javascript
this._linePositions = [{ line: 0, top: 0 }];
```

- [ ] **步骤 3：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 4：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 新增 buildLinePositionMap 注入行号标记并构建位置映射"
```

---

### 任务 4：新增 `getPreviewTopForLine()` 和 `getLineForPreviewTop()`

**文件：**
- 修改：`src/app.js`

- [ ] **步骤 1：添加查找函数**

在 `buildLinePositionMap()` 之后插入：

```javascript
  // 根据编辑器行号计算预览的目标 scrollTop（居中）
  getPreviewTopForLine(line) {
    const positions = this._linePositions;
    if (positions.length < 2) return 0;

    let lo = 0, hi = positions.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (positions[mid].line <= line) lo = mid;
      else hi = mid;
    }

    const lower = positions[lo];
    const upper = positions[hi];
    if (upper.line === lower.line) return lower.top;

    const frac = (line - lower.line) / (upper.line - lower.line);
    const targetTop = lower.top + frac * (upper.top - lower.top);
    return Math.max(0, targetTop - this.preview.clientHeight / 2);
  }

  // 根据预览 scrollTop 计算编辑器目标行号（居中）
  getLineForPreviewTop(scrollTop) {
    const positions = this._linePositions;
    if (positions.length < 2) return 0;

    const targetTop = scrollTop + this.preview.clientHeight / 2;

    let lo = 0, hi = positions.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (positions[mid].top <= targetTop) lo = mid;
      else hi = mid;
    }

    const lower = positions[lo];
    const upper = positions[hi];
    if (upper.top === lower.top) return lower.line;

    const frac = (targetTop - lower.top) / (upper.top - lower.top);
    return Math.round(lower.line + frac * (upper.line - lower.line));
  }
```

- [ ] **步骤 2：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 3：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 新增二分查找和内插函数"
```

---

### 任务 5：改造编辑器 scroll 事件处理

**文件：**
- 修改：`src/app.js`（约第 1294-1323 行）

- [ ] **步骤 1：替换编辑器→预览的滚动同步逻辑**

将现有一整段（从 `this.cm.on('scroll', () => {` 到对应的 `});`）替换为：

```javascript
    this.cm.on('scroll', () => {
      const info = this.cm.getScrollInfo();
      this.activeTab.scrollPos = { top: info.top, left: info.left };

      if (!this.settings.scrollSync || this.syncingScroll) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;
      this.syncingScroll = true;

      const viewportCenter = info.top + info.clientHeight / 2;
      const centerLine = this.cm.lineAtHeight(viewportCenter);
      const previewTop = this.getPreviewTopForLine(centerLine);
      const previewMax = Math.max(this.preview.scrollHeight - this.preview.clientHeight, 0);
      this.preview.scrollTop = Math.min(previewTop, previewMax);

      requestAnimationFrame(() => { this.syncingScroll = false; });
    });
```

读取原代码确认精确范围（约第 1294 行 `this.cm.on('scroll', () => {` 到第 1323 行 `});`）。

- [ ] **步骤 2：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 3：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 编辑器滚动改用块匹配内插"
```

---

### 任务 6：改造预览 scroll 事件处理

**文件：**
- 修改：`src/app.js`（约第 1325-1352 行）

- [ ] **步骤 1：替换预览→编辑器的滚动同步逻辑**

将现有整段（从 `this.preview.addEventListener('scroll', () => {` 到 `});`）替换为：

```javascript
    this.preview.addEventListener('scroll', () => {
      if (!this.settings.scrollSync || this.syncingScroll) return;
      const container = document.querySelector('.editor-container');
      if (container.classList.contains('preview-collapsed') || container.classList.contains('preview-mode')) return;
      this.syncingScroll = true;

      const targetLine = this.getLineForPreviewTop(this.preview.scrollTop);
      const scrollInfo = this.cm.getScrollInfo();
      const lineCoords = this.cm.charCoords({ line: Math.min(targetLine, this.cm.lineCount() - 1), ch: 0 }, 'local');
      const lineH = (lineCoords.bottom - lineCoords.top) || 1;
      this.cm.scrollTo(0, Math.max(0, lineCoords.top - scrollInfo.clientHeight / 2 + lineH / 2));

      requestAnimationFrame(() => { this.syncingScroll = false; });
    });
```

- [ ] **步骤 2：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 3：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): 预览滚动改用块匹配内插"
```

---

### 任务 7：在 updatePreview 中集成位置映射并改造滚动恢复

**文件：**
- 修改：`src/app.js`（约第 2521 行插入 buildLinePositionMap 调用，替换第 2543-2566 行滚动恢复逻辑）

- [ ] **步骤 1：在 innerHTML 设置后构建位置映射**

在第 2521 行 `this.preview.innerHTML = finalHtml;` 之后、第 2523 行 `details` 展开之前插入：

```javascript
      const blocks = this.parseBlocks(content);
      this.buildLinePositionMap(blocks);
```

- [ ] **步骤 2：替换 updatePreview 中的滚动恢复逻辑**

将第 2543-2566 行（`if (this.settings.scrollSync) {` 到 `else {` 块的结束 `}`）替换为：

```javascript
      // 基于块位置映射恢复滚动位置
      if (this.settings.scrollSync && this._linePositions.length > 1) {
        const info = this.cm.getScrollInfo();
        const viewportCenter = info.top + info.clientHeight / 2;
        const centerLine = this.cm.lineAtHeight(viewportCenter);
        const previewTop = this.getPreviewTopForLine(centerLine);
        const previewMax = Math.max(this.preview.scrollHeight - this.preview.clientHeight, 0);
        this.preview.scrollTop = Math.min(previewTop, previewMax);
      } else {
```

注意：保持后续的 `else` 分支和 `requestAnimationFrame` 不变。

- [ ] **步骤 3：验证**

运行：`node -c src/app.js`
预期：无输出

- [ ] **步骤 4：Commit**

```bash
git add src/app.js
git commit -m "feat(滚动同步): updatePreview 中构建位置映射并改造滚动恢复"
```

---

### 任务 8：构建和人工验证

**文件：** 无

- [ ] **步骤 1：构建**

运行：`npm run build`
预期：编译成功，无错误

- [ ] **步骤 2：人工验证检查项**

启动应用 `npm run dev`，验证：
1. 打开一篇有标题+段落+代码块的 markdown 文件
2. 编辑模式下滚动编辑器，预览侧应大致跟随到相应内容区域
3. 滚动预览侧，编辑器应滚动到对应位置
4. 打字编辑时，预览滚动不会跳动（保持同步）
5. 点击 `[TOC]` 跳转到标题后，预览渲染正确
6. 切换标签页再切回来，滚动位置恢复正确

- [ ] **步骤 3：Commit（如有修复）**

```bash
git add src/app.js
git commit -m "fix(滚动同步): 修复人工验证发现的问题"
```
