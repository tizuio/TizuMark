# TizuMark User Guide

> Master every feature of TizuMark, from basics to advanced usage

---

## Getting Started

### Interface Overview

TizuMark's interface consists of four main areas:

| Area | Location | Purpose |
|------|----------|---------|
| **Toolbar** | Top | File operations, insert, view modes, theme, help |
| **Tab Bar** | Below toolbar | Multi-tab management for editing multiple documents |
| **Editor Pane** | Left (edit mode) | CodeMirror editor with syntax highlighting & auto-completion |
| **Preview Pane** | Right (edit mode) | Live-rendered Markdown with scroll sync |

### Basic Operations

| Action | Method | Shortcut |
|--------|--------|----------|
| New File | `File → New` | `Ctrl+N` |
| Open File | `File → Open` (batch supported) | `Ctrl+O` |
| Save File | `File → Save` | `Ctrl+S` |
| Save As | `File → Save As` | — |
| Close Tab | Click × on tab or right-click menu | `Ctrl+W` |

> **Tip**: Drag and drop `.md` files directly into the window to open them — supports multiple files.

---

## Editor Features

### View Modes

TizuMark offers two view modes, toggled via the center toolbar buttons:

- **Preview Mode** — Hide the editor for full-screen reading. Great for reviewing and presenting.
- **Edit Mode** — Show both editor and preview panes. Write on the left, see rendered output on the right.

In Edit Mode:
- Click the **◄** button on the left edge to collapse the editor
- Click the **►** button on the right edge to collapse the preview
- Drag the middle divider to resize the panes

### Outline Navigation

The outline helps you navigate long documents with ease:

1. Click `View → Outline` to open the sidebar
2. Headings from H1 to H6 are auto-detected and shown with indentation
3. **Click any heading** to jump — the preview scrolls to center the heading
4. Outline updates automatically as you edit

### Multi-Tab Editing

TizuMark supports editing multiple files in tabs:

| Action | Method |
|--------|--------|
| New Tab | Click the **+** button on tab bar, or `Ctrl+N` |
| Switch Tab | Click tab, or `Ctrl+Tab` / `Ctrl+Shift+Tab` |
| Close Tab | Click × on tab, or `Ctrl+W` |
| Right-Click Menu | Close / Close Others / Close All / Copy File Path |
| Double-Click | Double-click empty space on tab bar to new tab |

Modified but unsaved tabs show a `*` indicator next to the filename.

### Find & Replace

TizuMark provides two independent search systems — one for the editor, one for the preview:

**Editor Find** (`Ctrl+F` / `Ctrl+H`):

| Feature | Description |
|---------|-------------|
| Basic Find | Enter keyword, click Next / Previous |
| Replace | Enter replacement text, click Replace / Replace All |
| Case Sensitive | Match exact letter casing |
| Regex | JavaScript-compatible regular expressions |

**Preview Find** (`Ctrl+F` in preview mode): Search directly within rendered content with highlight navigation.

### Right-Click Context Menus

TizuMark provides convenient right-click menus in three areas to minimize mouse travel.

#### Editor Context Menu

Right-click in the editor area to access:

| Item | Description |
|------|-------------|
| **Cut** | Cut selected text |
| **Copy** | Copy selected text |
| **Paste** | Paste from clipboard |
| **Structure** | Cascading: Heading / Code Block / Table / Blockquote / Callout / Math Block / Mermaid Chart / Horizontal Rule / TOC |
| **Text Format** | Cascading: Bold / Italic / Strikethrough / Inline Code / Highlight / Superscript / Subscript |
| **List** | Cascading: Unordered List / Ordered List / Task List |
| **Links & Media** | Cascading: Link / Image |
| **Find & Replace** | Open the find/replace panel |
| **Select All** | Select all content in the editor |

> The context menu structure mirrors the toolbar "Insert" menu — no need to move back to the toolbar when right-clicking.

#### Preview Context Menu

Right-click in the preview area:

| Item | Description |
|------|-------------|
| **Copy** | Copy selected preview content |
| **Select All** | Select all preview content |
| **Copy as HTML** | Copy selected content as HTML — paste into Word, Feishu, email and preserve styling |
| **Find in Preview** | Open the preview search panel |

#### Tab Context Menu

Right-click any tab in the tab bar:

| Item | Description |
|------|-------------|
| **Close** | Close this tab |
| **Close Others** | Keep this tab, close all others |
| **Close All** | Close all tabs |
| **Copy File Path** | Copy the file's full path to clipboard |

---

## Complete Keyboard Shortcuts

| Shortcut | Action | Shortcut | Action |
|----------|--------|----------|--------|
| `Ctrl+N` | New File | `Ctrl+B` | Bold |
| `Ctrl+O` | Open File | `Ctrl+I` | Italic |
| `Ctrl+S` | Save File | `Ctrl+K` | Insert Link |
| `Ctrl+W` | Close Tab | `Ctrl+F` | Find |
| `Ctrl+H` | Find & Replace | `Ctrl+Tab` | Next Tab |
| `Ctrl+Shift+Tab` | Previous Tab | `Esc` | Close Panel/Dialog |

> All shortcuts are customizable in **`File → Keyboard Shortcuts`**. Click "Modify" then press your new key combination to rebind.

---

## Insert Menu

The toolbar "Insert" button provides quick Markdown element insertion. All insert actions are also available via the editor right-click context menu.

### Structure

| Element | Inserts |
|---------|---------|
| **Headings H1–H6** | `#` through `######` prefixed headings |
| **Code Block** | ` ``` ` wrapped code block (default: JavaScript) |
| **Table** | 3×3 starter table template |
| **Blockquote** | `>` prefixed quote paragraph |
| **Callout** | Note / Tip / Warning / Caution / Important boxes |
| **Math Block** | `$$` wrapped display formula |
| **Mermaid Chart** | Mermaid flowchart template |
| **Horizontal Rule** | `---` divider |
| **TOC** | `[TOC]` marker (auto-generates table of contents) |

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

- **Unordered** — `- ` prefix
- **Ordered** — `1. ` prefix
- **Task List** — `- [ ] ` prefix (checkable in preview)

### Links & Media

- **Link** — `[text](URL)`
- **Image** — `![alt](image-URL)`

---

## Complete Markdown Syntax Reference

### Basic Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**Bold text**
*Italic text*
***Bold + Italic***
~~Strikethrough text~~
==Highlighted text==

[Link text](https://www.example.com)
![Image description](image-url.png)

> Blockquote
>> Nested blockquote

`Inline code`

---

Three or more asterisks, dashes, or underscores = horizontal rule
```

### Extended Syntax (GFM)

TizuMark supports GitHub Flavored Markdown extensions:

```markdown
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Content      | Content        | Content       |

- [x] Completed task
- [ ] Incomplete task

Auto-links: https://www.example.com

Strikethrough: ~~text to strike~~
```

### Code Blocks

````markdown
```javascript
// JavaScript example
const greeting = 'Hello TizuMark!';
console.log(greeting);
```

```python
# Python example
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

```rust
// Rust example
fn main() {
    println!("Hello TizuMark!");
}
```

```html
<!-- HTML example -->
<div class="container">
  <h1>TizuMark</h1>
</div>
```

```css
/* CSS example */
body {
  font-family: sans-serif;
  color: #333;
}
```
````

Syntax highlighting is supported for 100+ programming languages.

### Math Formulas (KaTeX)

**Inline formula**: `$E = mc^2$` renders as $E = mc^2$

**Display formula blocks**:

```latex
$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$
```

**LaTeX environments**:

```latex
$$
\begin{aligned}
x &= a + b \\
y &= c + d
\end{aligned}
$$

$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$
```

> All common KaTeX symbols, matrices, equation systems, calculus, Greek letters are supported.

### Diagrams (Mermaid)

**Flowchart**:

```mermaid
graph TD
    A[Start] --> B{Condition}
    B -->|Yes| C[Execute A]
    B -->|No| D[Execute B]
    C --> E[End]
    D --> E
```

**Sequence Diagram**:

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant D as Database
    U->>S: Send Request
    S->>D: Query Data
    D-->>S: Return Result
    S-->>U: Response
```

**Gantt Chart**:

```mermaid
gantt
    title Project Plan
    dateFormat  YYYY-MM-DD
    section Phase 1
    Requirements  :a1, 2024-01-01, 7d
    Design        :a2, after a1, 5d
    section Phase 2
    Development   :b1, after a2, 14d
    Testing       :b2, after b1, 5d
```

**State Diagram**:

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review
    Review --> Published
    Review --> Draft
    Published --> [*]
```

### Emoji Shortcodes

TizuMark has built-in emoji shortcode support:

| Shortcode | Emoji | Shortcode | Emoji |
|-----------|-------|-----------|-------|
| `:smile:` | 😄 | `:joy:` | 😂 |
| `:heart:` | ❤️ | `:fire:` | 🔥 |
| `:rocket:` | 🚀 | `:star:` | ⭐ |
| `:check:` | ✅ | `:x:` | ❌ |
| `:warning:` | ⚠️ | `:bulb:` | 💡 |
| `:memo:` | 📝 | `:book:` | 📖 |
| `:computer:` | 💻 | `:package:` | 📦 |
| `:thumbsup:` | 👍 | `:clap:` | 👏 |

---

## Callout Blocks

TizuMark supports GitHub-style callout blocks to highlight important information:

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

## Export Features

### Export HTML

`File → Export HTML` generates a standalone HTML file:
- Includes complete CSS styling
- Tables, code blocks, and math formulas retain their styles
- Ready to open in any browser for sharing

### Export Image

`File → Export Image` generates a high-resolution PNG screenshot:
- Fixed 800px width, height adapts to content
- Dark theme styling preserved when applicable
- Perfect for sharing on social media

---

## Personalization

### Editor Settings

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 12–20px | 14px | Editor code font size |
| Tab Size | 2/4/8 spaces | 2 | Spaces inserted per Tab press |
| Line Wrap | On/Off | On | Wrap long lines past editor width |
| Line Numbers | On/Off | On | Line number gutter visibility |

### Preview Settings

| Setting | Options | Default | Description |
|---------|---------|---------|-------------|
| Font Size | 14–20px | 16px | Preview body text size |
| Line Height | 1.4–2.0 | 1.7 | Preview body line spacing |
| Max Width | Unlimited / 800–1200px | Unlimited | Maximum content width in preview |

### Theme Settings

Three theme modes available:
- **Light** — Light background, ideal for daytime use
- **Dark** — Dark background, reduces eye strain
- **Follow System** — Automatically matches your OS theme

> Click the sun/moon icon on the right side of the toolbar to quickly toggle themes.

### Behavior Settings

| Setting | Options | Description |
|---------|---------|-------------|
| Default View | Preview / Edit | Which view mode is shown on startup |
| Scroll Sync | On/Off | Whether preview scrolls in sync with editor |

### Language

`File → Settings → Language`:
- **中文** — All UI elements in Simplified Chinese
- **English** — All UI elements in English

---

## FAQ

### How do I restore default settings?

Click "Restore Default" in `File → Settings` or `File → Keyboard Shortcuts`.

### What file formats are supported?

`.md`, `.markdown`, `.txt`. More formats are planned.

### How do I customize keyboard shortcuts?

Go to `File → Keyboard Shortcuts`, click "Modify" next to an action, then press your new key combination. Click "Clear" to remove a shortcut. Click "Restore Default" to reset all.

### Why aren't math formulas rendering in the preview?

Check your syntax. Inline formulas use `$...$`, display formulas use `$$...$$`. If a formula contains `&` characters, the Rust backend HTML-escapes them and KaTeX handles the decoding before rendering — no special handling is needed on your part.

### Why aren't images showing in exported PNG?

Images need to be accessible. Use relative paths for local files. For remote images, ensure network connectivity during export.

### How do I contact the developer?

- **QQ Group: 1035294939** (Chinese community)
- Report bugs, request features, or discuss tips — join the group!

---

<p align="center">
  <b>TizuMark — Write at the speed of thought</b>
</p>
