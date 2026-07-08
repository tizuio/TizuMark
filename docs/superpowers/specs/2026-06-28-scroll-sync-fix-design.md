# 滚动同步修复设计

## 问题描述

在编辑模式下，左边编辑器的内容与右边预览的滚动位置不同步。当用户在左边编辑器中编辑某个位置的内容时，右边预览没有滚动到对应的位置，而是在其他位置。

## 问题根源

`buildLinePositionMap` 方法使用 `this.activeTab.content` 来解析内容块，但这个值可能与 CodeMirror 实际内容不同步，导致行位置映射不准确，最终导致滚动同步不准确。

## 解决方案

在 `buildLinePositionMap` 方法中，直接从 CodeMirror 获取最新内容：

```javascript
// 修改前
const content = this.activeTab.content;

// 修改后
const content = this.cm.getValue();
```

## 需要修改的文件

- `src/app.js` - `buildLinePositionMap` 方法

## 影响范围

- 只影响滚动同步，不影响其他功能
- 滚动同步将始终与编辑器内容同步

## 验证方法

1. 打开编辑器，切换到编辑模式
2. 在左边编辑器中输入内容
3. 滚动左边编辑器到不同位置
4. 检查右边预览是否滚动到对应位置
5. 验证滚动同步是否正常工作
