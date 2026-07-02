# TizuMark User Guide

> A fast, elegant Markdown editor — from basics to mastery

[TOC]

---

## Getting Started

### Interface Overview

TizuMark's interface has four main areas:

| Area | Position | Purpose |
|------|----------|---------|
| **Toolbar** | Top | File operations, quick insert, view modes, theme, help |
| **Tab Bar** | Below toolbar | Multi-tab management for multiple documents |
| **Editor** | Left | CodeMirror with syntax highlighting & auto-completion |
| **Preview** | Right | Live-rendered Markdown with scroll sync |

### Basic Operations

| Action | Method | Shortcut |
|--------|--------|----------|
| New File | `File → New` | <kbd>Ctrl</kbd> + <kbd>N</kbd> |
| Open File | `File → Open` (batch supported) | <kbd>Ctrl</kbd> + <kbd>O</kbd> |
| Save File | `File → Save` | <kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Save As | `File → Save As` | — |
| Close Tab | Click × on tab or right-click | <kbd>Ctrl</kbd> + <kbd>W</kbd> |

> **Drag and drop** `.md` files directly into the window — supports multiple files.

---

## Editor Features

### View Modes

Toggle between two view modes via the center toolbar button:

- **Preview Mode** — Full-screen document preview, ideal for reading and presenting
- **Edit Mode** — Write on the left, see rendered output on the right

In Edit Mode:

| Action | Method |
|--------|--------|
| Collapse editor | Click left <kbd>◄</kbd> button |
| Collapse preview | Click right <kbd>►</kbd> button |
| Resize panes | Drag the middle divider |

### Outline Navigation

The outline helps you ==quickly navigate long documents==:

1. The left sidebar automatically shows the document heading structure (H1–H6)
2. Headings are indented by level for clarity
3. **Click any heading** — the preview jumps and centers on it
4. Outline updates in real time as you edit

> Toggle the outline via `View → Outline` at any time.

### Multi-Tab Editing

| Action | Method |
|--------|--------|
| New Tab | Click <kbd>+</kbd> on tab bar or <kbd>Ctrl</kbd> + <kbd>N</kbd> |
| Switch Tab | <kbd>Ctrl</kbd> + <kbd>Tab</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Close Tab | Click × or <kbd>Ctrl</kbd> + <kbd>W</kbd> |
| Right-Click Menu | Close / Close Others / Close All / Copy Path |
| Double-Click | On empty tab bar space to create new tab |

Unsaved tabs show a `*` indicator.

### Find & Replace

Two independent search systems:

**Editor Find** (<kbd>Ctrl</kbd> + <kbd>F</kbd> / <kbd>Ctrl</kbd> + <kbd>H</kbd>):

| Feature | Description |
|---------|-------------|
| Basic Find | Enter keyword, navigate between matches |
| Replace | Enter replacement, click Replace or Replace All |
| Case Sensitive | Match exact letter casing |
| Regex | JavaScript-compatible regular expressions |

**Preview Find** (<kbd>Ctrl</kbd> + <kbd>F</kbd> in preview mode): Search directly within rendered content with highlights.

### Context Menus

Three right-click menus for efficient workflow:

- **Editor**: Cut / Copy / Paste / Structure Insert / Text Format / Lists / Links & Media / Find & Replace / Select All
- **Preview**: Copy / Select All / Copy as HTML / Find in Preview
- **Tab**: Close / Close Others / Close All / Copy File Path

---

## Keyboard Shortcuts

| Shortcut | Action | Shortcut | Action |
|----------|--------|----------|--------|
| <kbd>Ctrl</kbd> + <kbd>N</kbd> | New File | <kbd>Ctrl</kbd> + <kbd>B</kbd> | Bold |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open File | <kbd>Ctrl</kbd> + <kbd>I</kbd> | Italic |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save File | <kbd>Ctrl</kbd> + <kbd>K</kbd> | Insert Link |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> | Close Tab | <kbd>Ctrl</kbd> + <kbd>F</kbd> | Find |
| <kbd>Ctrl</kbd> + <kbd>H</kbd> | Replace | <kbd>Ctrl</kbd> + <kbd>Tab</kbd> | Next Tab |
| <kbd>Esc</kbd> | Close Panel | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> | Previous Tab |

> All shortcuts are customizable in **`File → Keyboard Shortcuts`**. Click "Modify" and press your new key combination.

---

## Insert Menu

The toolbar **Insert** button provides quick Markdown element insertion.

### Structure

| Element | Inserts |
|---------|---------|
| Headings H1–H6 | `#` through `######` prefixed headings |
| Code Block | ` ``` ` wrapped block |
| Table | 3×3 starter template |
| Blockquote | `>` prefixed quote paragraph |
| Callout | Note / Tip / Warning / Caution / Important boxes |
| Math Block | `$$` wrapped display formula |
| Mermaid Chart | Flowchart template |
| Horizontal Rule | `---` divider |
| TOC | `[TOC]` marker — auto-generates table of contents |

### Text Formatting

| Format | Syntax | Result |
|--------|--------|--------|
| Bold | `**text**` | **bold text** |
| Italic | `*text*` | *italic text* |
| Strikethrough | `~~text~~` | ~~strikethrough~~ |
| Inline Code | `` `code` `` | `code snippet` |
| Highlight | `==text==` | ==highlighted text== |
| Superscript | `<sup>text</sup>` | ^superscript^ |
| Subscript | `<sub>text</sub>` | ~subscript~ |

### Lists

- Unordered — `- ` prefix
- Ordered — `1. ` prefix
- Task List — `- [ ] ` prefix (checkable in preview)

### Links & Media

- Link — `[text](URL)`
- Image — `![alt](image-url)`

## Full Syntax Reference

[Open the Demo file for all syntax examples →](../demo.md)

---

## Callout Blocks

GitHub-style callout blocks for highlighting important information:

```markdown
> [!NOTE]
> This is a general note.

> [!TIP]
> This is a helpful tip or suggestion.

> [!WARNING]
> This is a warning that needs attention.

> [!CAUTION]
> This is a caution about potential risks.

> [!IMPORTANT]
> This is critical information.
```

---

## Export

### Export HTML

`File → Export HTML` generates a standalone HTML file:

- Full CSS styling included
- Tables, code blocks, math formulas preserved
- Ready to open in any browser

### Export Image

`File → Export Image` generates a high-resolution PNG:

- Fixed 800px width, auto height
- Dark theme styling preserved
- Perfect for social media sharing

---

## Personalization

### Editor

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 12–20px | 14px | Editor code font size |
| Tab Size | 2 / 4 / 8 | 2 | Spaces per Tab |
| Line Wrap | On / Off | On | Wrap long lines |
| Line Numbers | On / Off | On | Gutter line numbers |

### Preview

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 14–20px | 16px | Preview body text size |
| Line Height | 1.4–2.0 | 1.7 | Preview line spacing |
| Max Width | Unlimited / 800–1200px | Unlimited | Max content width |

### Theme

- **Light** — Light background, ideal for daytime
- **Dark** — Dark background, reduces eye strain
- **Follow System** — Matches your OS theme automatically

> Click the sun/moon icon in the toolbar to quickly toggle.

### Behavior

| Setting | Options | Description |
|---------|---------|-------------|
| Default View | Preview / Edit | Startup view mode |
| Scroll Sync | On / Off | Sync preview scroll with editor |

### Language

`File → Settings → Language`:

- **中文** — All UI in Simplified Chinese
- **English** — All UI elements in English

---

## FAQ

### How to restore default settings?

Click "Restore Default" in `File → Settings` or `File → Keyboard Shortcuts`.

### Supported file formats?

`.md`, `.markdown`, `.txt`. More formats planned.

### How to customize shortcuts?

`File → Keyboard Shortcuts`, click "Modify" and press new combination. Click "Clear" to remove, "Restore Default" to reset.

### Math formulas not rendering?

Check syntax: inline `$...$`, display `$$...$$`. Formulas with `&` are auto-escaped.

### Images missing in export?

Ensure image accessibility. Use relative paths for local files, check network for remote images.

### How to contact us?

- **QQ Group: 1035294939** (Chinese community)
- Bug reports, feature requests, tips & discussion

---

<p align="center">
  <b>TizuMark — Write at the speed of thought</b>
</p>
