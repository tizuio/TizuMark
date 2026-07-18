# TizuMark User Guide

> A fast, elegant Markdown editor — from basics to mastery

[TOC]

---

## Getting Started

### Interface Overview

TizuMark's interface has four main areas:

| Area | Position | Purpose |
|------|----------|---------|
| **Top Toolbar** | Top | File operations, quick insert, view modes, theme, help |
| **Sidebar** | Left | Outline navigation & file tree (when a folder is open) |
| **Editor** | Center | CodeMirror with syntax highlighting & auto-completion |
| **Preview** | Right | Live-rendered Markdown with scroll sync |

### Basic Operations

| Action | Method | Shortcut |
|--------|--------|----------|
| New File | `File → New` | <kbd>Ctrl</kbd> + <kbd>N</kbd> |
| Open File | `File → Open` (batch supported) | <kbd>Ctrl</kbd> + <kbd>O</kbd> |
| Open Folder | `File → Open Folder` | — |
| Save File | `File → Save` | <kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Save As | `File → Save As` | — |
| Close Tab | Click × on tab or right-click | <kbd>Ctrl</kbd> + <kbd>W</kbd> |

> **Drag and drop** `.md` files directly into the window — supports multiple files.

---

## Editor Features

### View Modes

The two tabs in the center toolbar toggle between two view modes:

- **Preview Mode** — Full-screen document preview, ideal for reading and presenting
- **Edit Mode** — Write on the left, see rendered output on the right

In Edit Mode:

| Action | Method |
|--------|--------|
| Collapse editor | Click left <kbd>◄</kbd> button |
| Collapse preview | Click right <kbd>►</kbd> button |
| Resize panes | Drag the middle divider |

### Sidebar: Outline & Files

Click `View → Sidebar` to show or hide the sidebar. It has two tabs:

- **Outline**: Automatically shows the document heading structure (H1–H6), indented by level. **Click any heading** — the preview jumps and centers on it. The outline updates in real time as you edit.
- **Files**: After opening a directory with `File → Open Folder`, this tab shows a tree view of files in that directory. Click a file to open it in a tab. The tree watches the folder for external additions/removals and refreshes automatically.

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
| Basic Find | Enter keyword, navigate between matches, see match count |
| Replace | Enter replacement, click Replace or Replace All |
| Case Sensitive | Match exact letter casing |
| Regex | JavaScript-compatible regular expressions |

**Preview Find** (<kbd>Ctrl</kbd> + <kbd>F</kbd> in preview mode): Search directly within rendered content with highlights.

### Context Menus

Three right-click menus for efficient workflow:

- **Editor**: Cut / Copy / Paste / Structure Insert / Text Format / Lists / Links & Media / Find & Replace / Select All
- **Preview**: Copy / Select All / Copy as HTML / Find in Preview
- **Tab**: Close / Close Others / Close All / Copy File Path

### External File Change Prompt

When an open file is modified by another program outside TizuMark, a banner appears at the top offering **Reload** / **Ignore** / **Reload All** / **Ignore All**, so you never accidentally overwrite your changes.

### Large Document Protection

When a document is very large (over ~5000 lines or 4MB), the preview uses a sliding window that renders only the section currently being read, keeping even huge files smooth and responsive. A notice is shown at the top of the editor.

---

## Keyboard Shortcuts

| Shortcut | Action | Shortcut | Action |
|----------|--------|----------|--------|
| <kbd>Ctrl</kbd> + <kbd>N</kbd> | New File | <kbd>Ctrl</kbd> + <kbd>B</kbd> | Bold |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open File | <kbd>Ctrl</kbd> + <kbd>I</kbd> | Italic |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save File | <kbd>Ctrl</kbd> + <kbd>K</kbd> | Insert Link |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> | Close Tab | <kbd>Ctrl</kbd> + <kbd>F</kbd> | Find |
| <kbd>Ctrl</kbd> + <kbd>H</kbd> | Replace | <kbd>Ctrl</kbd> + <kbd>P</kbd> | Export PDF |
| <kbd>Esc</kbd> | Close Panel | <kbd>Ctrl</kbd> + <kbd>Tab</kbd> | Next Tab |
| <kbd>Ctrl</kbd> + <kbd>\`</kbd> | Inline Code | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> | Previous Tab |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Strikethrough | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Code Block |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> | Blockquote | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> | Toggle Theme |

> All shortcuts are customizable in **`File → Keyboard Shortcuts`**. Click "Modify" and press your new key combination. Click "Clear" to remove, "Restore Default" to reset.

---

## Format Toolbar

The toolbar below the top bar provides quick formatting buttons (collapsible via the arrow on the right):

**Direct buttons**: Bold, Italic, Strikethrough, Link, Image, Horizontal Rule, Highlight, Superscript, Subscript.

**Dropdown groups** (hover to expand):

- **Structure**: Inline Code, Code Block, Table, Blockquote, Math Block, Mermaid Chart, TOC
- **Lists**: Unordered, Ordered, Task List
- **Headings**: H1 – H6
- **Callouts**: Note / Tip / Warning / Caution / Important

---

## Insert Features in Detail

### Structure

| Element | Inserts |
|---------|---------|
| Headings H1–H6 | `#` through `######` prefixed headings |
| Code Block | ` ``` ` wrapped block (syntax highlighting for JavaScript / Python / Rust / HTML / CSS / YAML / Shell, etc.) |
| Table | 3×3 starter template |
| Blockquote | `>` prefixed quote paragraph |
| Callout | Note / Tip / Warning / Caution / Important boxes |
| Math Block | `$$` wrapped display formula (KaTeX) |
| Mermaid Chart | Flowchart / sequence-diagram template |
| Horizontal Rule | `---` divider |
| TOC | `[TOC]` marker — auto-generates table of contents |

> Inline math uses `$...$`, display math uses `$$...$$`. Formulas with `&` are auto-escaped.

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

- Link — `[text](URL)`, shortcut <kbd>Ctrl</kbd> + <kbd>K</kbd>
- Image — `![alt](image-url)`

### Callout Blocks

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

## Full Syntax Reference

[Open the Demo file for all syntax examples →](demo.md)

---

## Image Management

TizuMark offers comprehensive image support with multiple insertion methods and auto-dedup.

### Insert an Image

| Method | Action | Description |
|--------|--------|-------------|
| Paste | <kbd>Ctrl</kbd> + <kbd>V</kbd> | Paste an image from clipboard (screenshot, copied image, etc.) |
| Insert Dialog | `Insert → Image` | Choose a local file or enter a network image URL |
| Drag & Drop | Drag image file | Drop an image file from file explorer into the editor |

### Auto Deduplication

Images with identical content are stored only once. TizuMark uses **MD5 hash** for content comparison:

- On paste or insert, the file's MD5 is computed automatically
- If the image already exists, the existing file is reused
- Same filename with different content will not conflict

### Image Storage Mode

Configured at `File → Settings → Image Storage Mode`:

- **Copy to assets/ (recommended)**: Images saved as separate files; the md file stays lightweight and version-friendly
- **Base64 Embed**: Images encoded into the md file; single-file sharing, but size grows significantly (~1.4× original)

### Image Storage Path

Configured at `File → Settings → Image Asset Path`:

- **Relative** (default): Relative to the current Markdown file's directory
- **Absolute**: Uses a fixed directory (e.g. `D:\assets`)

A dynamic hint below the setting shows the actual reference path for confirmation.

### Auto Width & Height

Images are inserted with original dimensions automatically:

```html
<img src="assets/abc123.png" width="800" height="600" alt="example">
```

You can edit or remove `width`/`height` directly in the source:

- Change to a percentage: `width="100%"`
- Remove entirely: the editor renders at original dimensions

---

## Auto Updates

TizuMark silently checks for updates on startup:

| Scenario | Behavior |
|----------|----------|
| Startup check | Silent — no dialog, no toast |
| New version found | Update dialog appears automatically with version, release notes, and download button |
| Already up-to-date | On manual check, the dialog shows "You're up to date" with a single "OK" button to close (no toast); startup check remains silent |
| Manual check | `Help → Check for Updates` — shows dialog if update found, otherwise shows "You're up to date" |
| Check failed | Toast notification "Check for updates failed" |

Update dialog:

- Shows current and new version
- Renders release notes (Markdown)
- Click "Download" → progress bar → "Install Now" → install & restart
- When up to date: dialog stays open showing "You're up to date", with a single blue "OK" button to close it

---

## Export

### Export HTML

`File → Export HTML` generates a standalone HTML file:

- Full CSS styling included
- Tables, code blocks, math formulas, and Mermaid charts preserved
- Ready to open in any browser

### Export Image

`File → Export Image` generates a high-resolution PNG:

- Fixed 800px width, auto height
- Dark theme styling preserved
- Perfect for social media sharing

### Export PDF

`File → Export PDF` (shortcut <kbd>Ctrl</kbd> + <kbd>P</kbd>) uses the system print dialog:

- After a confirmation prompt, the browser's native print function is used
- In the print dialog you can choose "Save as PDF" and adjust page orientation/margins
- Math formulas and Mermaid charts are re-rendered for crisp output

---

## Personalization

All options are available in `File → Settings`:

### Basic

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Language | 中文 / English | 中文 | Switch the entire UI language |
| Theme Mode | Light / Dark / Follow System | Light | Light/dark background, or match OS |
| Color Scheme | Base / Sunset / Forest / Nord / Dusk | Base | Overall UI color style |
| Font Scheme | Minimalist (sans-serif) / Print Style (serif) | Print Style | Preview body font family style |

> Click the sun/moon icon in the toolbar to quickly toggle between Light and Dark.

### Editor

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 8–36px | 14px | Editor code font size |
| Tab Size | 2 / 4 / 8 | 2 | Spaces per Tab |
| Line Wrap | On / Off | On | Wrap long lines |
| Line Numbers | On / Off | On | Gutter line numbers |

### Preview

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 8–36px | 16px | Preview body text size |
| Line Height | 1.4–2.0 | 1.7 | Preview line spacing |
| Max Width | Unlimited / 800–1200px | Unlimited | Max content width |
| Code Line Numbers | On / Off | Off | Show line numbers in code blocks |
| Code Wrap | On / Off | Off | Wrap long lines in code blocks |

### Behavior

| Setting | Options | Description |
|---------|---------|-------------|
| Default View | Preview / Edit | Startup view mode |
| Scroll Sync | On / Off | Sync preview scroll with editor |
| Soft Line Break (Enter = newline) | On / Off | When on, a single Enter creates a line break; when off, CommonMark standard applies (Enter = space) |
| Image Storage Mode | Copy to assets / Base64 Embed | See Image Management |
| Image Asset Path | Relative / Absolute | See Image Management |

### Custom Fonts

In `File → Settings → Custom Fonts`:

- Click "Add Font…" to import a local font file (`.ttf` / `.otf` / `.woff`) for repeated use
- Imported fonts appear in the "Editor Font" and "Preview Font" dropdowns, assignable separately
- A font preview sample below helps you compare results

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

### How to manage a whole folder of files?

`File → Open Folder` opens a directory; the sidebar "Files" tab shows a tree view. Click to open files, and it auto-refreshes on external changes.

### How to contact us?

- **QQ Group: 1035294939** (Chinese community)
- Bug reports, feature requests, tips & discussion

---

<p align="center">
  <b>TizuMark — Write at the speed of thought</b>
</p>
