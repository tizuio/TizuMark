use std::fs;
use tauri::{Emitter, Manager};
use tauri::WindowEvent;
use tauri::tray::{TrayIconBuilder, TrayIconEvent, MouseButton, MouseButtonState};
use tauri::menu::{Menu, MenuItem};
use md5::{Md5, Digest};

fn show_window(window: &tauri::WebviewWindow) {
    let _ = window.unminimize();
    let _ = window.show();
    let _ = window.set_focus();
}

fn escape_html(s: &str) -> String {
    s.replace('&', "&amp;")
     .replace('<', "&lt;")
     .replace('>', "&gt;")
     .replace('"', "&quot;")
     .replace('\'', "&#x27;")
}

fn count_backtick_prefix(s: &str) -> usize {
    s.chars().take_while(|c| *c == '`').count()
}

fn sanitize_html(html: &str) -> String {
    let dangerous_tags = ["script", "style", "iframe", "object", "embed", "form", "textarea", "select", "button", "link", "meta", "base"];
    let mut result = String::with_capacity(html.len());
    let chars: Vec<char> = html.chars().collect();
    let len = chars.len();
    let mut i = 0;

    while i < len {
        if chars[i] == '<' && i + 1 < len {
            if chars[i + 1] == '/' {
                let end = find_char(&chars, i, '>');
                if end == chars.len() || end <= i + 3 { i = end; continue; }
                let inner: String = chars[i + 2..end - 1].iter().collect();
                let tag_name = inner.split_whitespace().next().unwrap_or("").to_ascii_lowercase();
                if dangerous_tags.contains(&tag_name.as_str()) {
                    i = end;
                    continue;
                }
                for c in &chars[i..end] {
                    result.push(*c);
                }
                i = end;
            } else if chars[i + 1] == '!' {
                let end = find_str(&chars, i, "->");
                let comment: String = chars[i..end].iter().collect();
                if comment.starts_with("<!--MATHBLOCK_") {
                    for c in &chars[i..end] {
                        result.push(*c);
                    }
                }
                i = end;
            } else {
                let end = find_char(&chars, i, '>');
                if end == chars.len() || end <= i + 2 { i = end; continue; }
                let inner: String = chars[i + 1..end - 1].iter().collect();
                let tag_name = inner.split_whitespace().next().unwrap_or("").to_ascii_lowercase();
                if dangerous_tags.contains(&tag_name.as_str()) {
                    i = end;
                    continue;
                }
                let sanitized = sanitize_tag_attributes(&inner);
                result.push('<');
                result.push_str(&sanitized);
                result.push('>');
                i = end;
            }
        } else {
            result.push(chars[i]);
            i += 1;
        }
    }
    result
}

fn find_char(chars: &[char], start: usize, target: char) -> usize {
    for i in start..chars.len() {
        if chars[i] == target {
            return i + 1;
        }
    }
    chars.len()
}

fn find_str(chars: &[char], start: usize, pattern: &str) -> usize {
    let pat: Vec<char> = pattern.chars().collect();
    for i in start..chars.len() {
        if i + pat.len() <= chars.len() && chars[i..i + pat.len()] == pat[..] {
            return i + pat.len();
        }
    }
    chars.len()
}

fn decode_numeric_entities(s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();
    let mut result = String::with_capacity(s.len());
    let mut i = 0;
    while i < chars.len() {
        if chars[i] == '&' && i + 1 < chars.len() && chars[i + 1] == '#' {
            i += 2;
            let mut value: u32 = 0;
            let mut consumed = false;
            if i < chars.len() && (chars[i] == 'x' || chars[i] == 'X') {
                i += 1;
                while i < chars.len() && chars[i].is_ascii_hexdigit() {
                    value = value * 16 + chars[i].to_digit(16).unwrap();
                    i += 1;
                    consumed = true;
                }
            } else {
                while i < chars.len() && chars[i].is_ascii_digit() {
                    value = value * 10 + chars[i].to_digit(10).unwrap();
                    i += 1;
                    consumed = true;
                }
            }
            if i < chars.len() && chars[i] == ';' && consumed {
                i += 1;
                if let Some(c) = char::from_u32(value) {
                    result.push(c);
                }
            }
        } else {
            result.push(chars[i]);
            i += 1;
        }
    }
    result
}

fn contains_dangerous_protocol(s: &str) -> bool {
    let lower = s.to_lowercase();
    if lower.contains("javascript:") { return true; }
    let decoded = decode_numeric_entities(&lower);
    decoded.contains("javascript:")
}

fn sanitize_tag_attributes(tag_content: &str) -> String {
    let chars: Vec<char> = tag_content.chars().collect();
    let len = chars.len();

    // Extract tag name (first word before whitespace)
    let mut i = 0;
    while i < len && !chars[i].is_whitespace() {
        i += 1;
    }
    let tag_name: String = chars[..i].iter().collect();
    if i >= len {
        return tag_name;
    }

    let mut result = tag_name;
    while i < len {
        // Skip whitespace
        while i < len && chars[i].is_whitespace() {
            i += 1;
        }
        if i >= len { break; }

        // Read attribute name until '=' or whitespace (boolean attr)
        let attr_start = i;
        while i < len && chars[i] != '=' && !chars[i].is_whitespace() {
            i += 1;
        }
        let _attr_name: String = chars[attr_start..i].iter().collect();

        if i < len && chars[i] == '=' {
            // Quoted or unquoted value
            i += 1; // skip '='
            let _value_start = i;
            if i < len && (chars[i] == '"' || chars[i] == '\'') {
                let quote = chars[i];
                i += 1; // skip opening quote
                let val_start = i;
                while i < len && chars[i] != quote {
                    i += 1;
                }
                let _value: String = chars[val_start..i].iter().collect();
                i += 1; // skip closing quote
                // Reconstruct from original to preserve exact quoting
                let raw: String = chars[attr_start..i].iter().collect();
                let raw_lower = raw.to_lowercase();
                if raw_lower.starts_with("on") || contains_dangerous_protocol(&raw) {
                    continue;
                }
                result.push(' ');
                result.push_str(&raw);
            } else {
                // Unquoted value
                while i < len && !chars[i].is_whitespace() {
                    i += 1;
                }
                let raw: String = chars[attr_start..i].iter().collect();
                let raw_lower = raw.to_lowercase();
                if raw_lower.starts_with("on") || contains_dangerous_protocol(&raw) {
                    continue;
                }
                result.push(' ');
                result.push_str(&raw);
            }
        } else {
            // Boolean attribute (no value)
            let raw: String = chars[attr_start..i].iter().collect();
            let raw_lower = raw.to_lowercase();
            if raw_lower.starts_with("on") || contains_dangerous_protocol(&raw) {
                continue;
            }
            result.push(' ');
            result.push_str(&raw);
        }
    }
    result
}

#[tauri::command]
fn open_devtools(app_handle: tauri::AppHandle) {
    if let Some(window) = app_handle.get_webview_window("main") {
        let _ = window.open_devtools();
    }
}

#[tauri::command]
fn get_cli_args() -> Vec<String> {
    std::env::args().skip(1).collect()
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, &content).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_binary_file(path: String, contents: Vec<u8>) -> Result<(), String> {
    fs::write(&path, &contents).map_err(|e| e.to_string())
}

#[tauri::command]
fn ensure_dir(path: String) -> Result<(), String> {
    fs::create_dir_all(&path).map_err(|e| e.to_string())
}

#[derive(serde::Serialize)]
struct ImageAssetInfo {
    filename: String,
    width: u32,
    height: u32,
}

#[tauri::command]
fn save_image_to_assets(bytes: Vec<u8>, ext: String, assets_dir: String) -> Result<ImageAssetInfo, String> {
    let hash = format!("{:x}", Md5::digest(&bytes));
    let filename = format!("{}.{}", hash, ext);
    let dest = std::path::Path::new(&assets_dir).join(&filename);

    std::fs::create_dir_all(&assets_dir).map_err(|e| e.to_string())?;
    if !dest.exists() {
        std::fs::write(&dest, &bytes).map_err(|e| e.to_string())?;
    }

    let (width, height) = match imagesize::blob_size(&bytes) {
        Ok(size) => (size.width as u32, size.height as u32),
        Err(_) => (0, 0),
    };

    Ok(ImageAssetInfo { filename, width, height })
}

#[tauri::command]
async fn fetch_image_as_base64(url: String) -> Result<String, String> {
    let bytes = if url.starts_with("http://") || url.starts_with("https://") {
        let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
        resp.bytes().await.map_err(|e| e.to_string())?.to_vec()
    } else {
        let path = std::path::Path::new(&url);
        let canonical = path.canonicalize().map_err(|e| format!("Cannot resolve path {}: {}", url, e))?;
        if !canonical.is_file() {
            return Err(format!("Not a regular file: {}", url));
        }
        std::fs::read(&canonical).map_err(|e| format!("Cannot read local file {}: {}", url, e))?
    };
    use base64::Engine;
    let encoded = base64::engine::general_purpose::STANDARD.encode(&bytes);
    Ok(encoded)
}

#[tauri::command]
fn generate_toc(content: String) -> String {
    let mut items: Vec<(usize, String, String)> = Vec::new();
    let mut in_code_block = false;

    for line in content.lines() {
        let trimmed = line.trim_start();
        if trimmed.starts_with("```") {
            in_code_block = !in_code_block;
            continue;
        }
        if in_code_block {
            continue;
        }

        let (level, text) = if trimmed.starts_with("###### ") {
            (6, trimmed[7..].trim())
        } else if trimmed.starts_with("##### ") {
            (5, trimmed[6..].trim())
        } else if trimmed.starts_with("#### ") {
            (4, trimmed[5..].trim())
        } else if trimmed.starts_with("### ") {
            (3, trimmed[4..].trim())
        } else if trimmed.starts_with("## ") {
            (2, trimmed[3..].trim())
        } else if trimmed.starts_with("# ") {
            (1, trimmed[2..].trim())
        } else {
            continue;
        };

        let id = heading_to_id(text);
        items.push((level, text.to_string(), id));
    }

    if items.is_empty() {
        return String::new();
    }

    let mut html = String::from(r#"<div class="toc"><div class="toc-title">📑 目录</div><ul class="toc-list">"#);
    let mut prev_level = 0;

    for (level, text, id) in &items {
        if *level > prev_level {
            for _ in prev_level..*level {
                html.push_str("<ul>");
            }
        } else if *level < prev_level {
            for _ in *level..prev_level {
                html.push_str("</ul>");
            }
        }
        let href = format!("#{}", id);
        let item = format!(r#"<li><a href="{}">{}</a></li>"#, escape_html(&href), escape_html(text));
        html.push_str(&item);
        prev_level = *level;
    }

    for _ in 0..prev_level {
        html.push_str("</ul>");
    }

    html.push_str("</ul></div>");
    html
}

fn heading_to_id(text: &str) -> String {
    let mut id = String::new();
    for c in text.chars() {
        if c.is_alphanumeric() || c == '-' || c == '_' || c == ' ' {
            if c == ' ' || c == '-' || c == '_' {
                id.push('-');
            } else {
                // to_lowercase() may yield multiple chars for some Unicode (e.g. İ → i\u{0307}),
                // but heading chars are single-width in practice; take only the first.
                if let Some(lower_c) = c.to_lowercase().next() {
                    id.push(lower_c);
                }
            }
        }
    }
    let collapsed: String = id.chars().fold(String::new(), |mut acc, ch| {
        if ch != '-' || acc.chars().last() != Some('-') {
            acc.push(ch);
        }
        acc
    });
    collapsed.trim_matches('-').to_string()
}

fn extract_abbreviations(content: &str) -> Vec<(String, String)> {
    let mut abbrs = Vec::new();
    for line in content.lines() {
        if line.starts_with("*[") {
            if let Some(bracket_end) = line.find("]: ") {
                let term = line[2..bracket_end].to_string();
                let def = line[bracket_end + 3..].to_string();
                if !term.is_empty() {
                    abbrs.push((term, def));
                }
            }
        }
    }
    abbrs
}

fn embed_abbr_data(html: &str, abbreviations: &[(String, String)]) -> String {
    if abbreviations.is_empty() {
        return html.to_string();
    }
    let json = serde_json::to_string(abbreviations).unwrap_or_default();
    let safe_json = json.replace('\'', "&#x27;");
    format!("{html}<div id=\"abbr-data\" style=\"display:none\" data-abbrs='{safe_json}'></div>")
}

#[allow(dead_code)]
#[tauri::command]
fn render_markdown(content: String) -> String {
    use pulldown_cmark::{Parser, Options, html};

    let abbreviations = extract_abbreviations(&content);
    let preprocessed = preprocess_markdown(content);
    let (guarded, placeholders) = guard_math_blocks(&preprocessed);

    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
    // options.insert(Options::ENABLE_SMART_PUNCTUATION);

    let parser = Parser::new_ext(&guarded, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    let html = sanitize_html(&html_output);
    let html = restore_math_blocks(&html, &placeholders);
    embed_abbr_data(&html, &abbreviations)
}

fn guard_math_blocks(content: &str) -> (String, Vec<String>) {
    let mut placeholders = Vec::new();
    let mut result = String::with_capacity(content.len());
    let mut i = 0;
    let chars: Vec<char> = content.chars().collect();
    let len = chars.len();
    let mut in_backtick = false;
    let mut in_code_block = false;
    let mut code_fence_count = 0;
    let mut in_code_tag = false; // Track <code>...</code> tags from preprocess_markdown

    while i < len {
        // Track fenced code blocks (```...``` etc.)
        if chars[i] == '`' {
            let mut bt_count = 1;
            while i + bt_count < len && chars[i + bt_count] == '`' {
                bt_count += 1;
            }
            if bt_count >= 3 {
                if !in_code_block {
                    in_code_block = true;
                    code_fence_count = bt_count;
                    for j in 0..bt_count { result.push(chars[i + j]); }
                    i += bt_count;
                    continue;
                } else if bt_count >= code_fence_count {
                    in_code_block = false;
                    for j in 0..bt_count { result.push(chars[i + j]); }
                    i += bt_count;
                    continue;
                }
            }
        }

        // Skip everything inside code blocks
        if in_code_block {
            result.push(chars[i]);
            i += 1;
            continue;
        }

        // Track <code> and </code> tags — preprocess_markdown converts `$$` to <code>$$</code>
        // We must NOT treat $$ inside <code> tags as math delimiters
        if !in_backtick {
            // Check for <code> opening tag
            if i + 5 < len && chars[i] == '<' && chars[i + 1] == 'c' && chars[i + 2] == 'o'
                && chars[i + 3] == 'd' && chars[i + 4] == 'e' && chars[i + 5] == '>' {
                in_code_tag = true;
                // Copy the entire <code> tag
                for j in 0..6 { result.push(chars[i + j]); }
                i += 6;
                continue;
            }
            // Check for </code> closing tag
            if i + 6 < len && chars[i] == '<' && chars[i + 1] == '/'
                && chars[i + 2] == 'c' && chars[i + 3] == 'o' && chars[i + 4] == 'd'
                && chars[i + 5] == 'e' && chars[i + 6] == '>' {
                in_code_tag = false;
                for j in 0..7 { result.push(chars[i + j]); }
                i += 7;
                continue;
            }
        }

        // Skip $$ matching inside <code> tags
        if in_code_tag {
            result.push(chars[i]);
            i += 1;
            continue;
        }

        // Track inline code backticks to avoid false $$ matching
        if chars[i] == '`' {
            in_backtick = !in_backtick;
            result.push(chars[i]);
            i += 1;
            continue;
        }

        if !in_backtick && i + 1 < len && chars[i] == '$' && chars[i + 1] == '$' {
            // Display math: $$...$$
            let start = i;
            i += 2;
            let mut found_end = false;
            while i + 1 < len {
                if chars[i] == '$' && chars[i + 1] == '$' {
                    i += 2;
                    let math_block: String = chars[start..i].iter().collect();
                    let idx = placeholders.len();
                    placeholders.push(math_block);
                    result.push_str(&format!("<!--MATHBLOCK_{}-->", idx));
                    found_end = true;
                    break;
                }
                i += 1;
            }
            if !found_end {
                for j in start..i { result.push(chars[j]); }
            }
        } else if !in_backtick && chars[i] == '$' && i + 1 < len && !chars[i + 1].is_whitespace() && chars[i + 1] != '$' {
            // Inline math: $...$ (single dollar); note display math $$...$$ is caught
            // in the prior else-if so the `i == start + 1` guard below is unreachable.
            let start = i;
            i += 1;
            let mut found_end = false;
            while i < len {
                if chars[i] == '$' && (i == start + 1 || !chars[i - 1].is_whitespace()) {
                    i += 1;
                    let math_block: String = chars[start..i].iter().collect();
                    let idx = placeholders.len();
                    placeholders.push(math_block);
                    result.push_str(&format!("<!--MATHBLOCK_{}-->", idx));
                    found_end = true;
                    break;
                }
                i += 1;
            }
            if !found_end {
                for j in start..i { result.push(chars[j]); }
            }
        } else {
            result.push(chars[i]);
            i += 1;
        }
    }
    (result, placeholders)
}

fn restore_math_blocks(html: &str, placeholders: &[String]) -> String {
    let mut result = html.to_string();
    for (idx, math) in placeholders.iter().enumerate() {
        let marker = format!("<!--MATHBLOCK_{}-->", idx);
        // HTML-escape the math content so that LaTeX characters
        // (especially & used as column separator in matrices / align)
        // are not misinterpreted by the browser's HTML parser.
        let escaped = escape_html(math);
        result = result.replace(&marker, &escaped);
    }
    result
}

fn preprocess_markdown(content: String) -> String {
    let lines: Vec<&str> = content.lines().collect();
    let len = lines.len();
    let mut in_code_block = false;
    let mut code_fence_count = 0;
    let mut in_math_block = false;
    let mut line_types: Vec<LineType> = Vec::with_capacity(len);

    for idx in 0..len {
        let line = lines[idx];
        let trimmed = line.trim_start();

        if !in_code_block {
            let bt_count = count_backtick_prefix(trimmed);
            if bt_count >= 3 {
                in_code_block = true;
                code_fence_count = bt_count;
                line_types.push(LineType::Code);
                continue;
            }
        } else if in_code_block {
            let bt_count = count_backtick_prefix(trimmed);
            if bt_count >= code_fence_count {
                let after = &trimmed[bt_count..];
                if after.trim().is_empty() {
                    in_code_block = false;
                    line_types.push(LineType::Code);
                    continue;
                }
            }
        }
        if in_code_block {
            line_types.push(LineType::Code);
            continue;
        }
        
        if trimmed.starts_with("$$") {
            if in_math_block {
                in_math_block = false;
                line_types.push(LineType::Math);
            } else {
                in_math_block = true;
                line_types.push(LineType::Math);
            }
            continue;
        }
        if in_math_block {
            line_types.push(LineType::Math);
            continue;
        }
        
        // *[TERM]: definition → abbreviation
        if line.starts_with("*[") {
            if let Some(bracket_end) = line.find("]: ") {
                let term = &line[2..bracket_end]; // between *[ and ]:
                if !term.is_empty() {
                    line_types.push(LineType::Abbr);
                    continue;
                }
            }
        }
        if line.starts_with("> [!") {
            line_types.push(LineType::Alert);
        } else if line.starts_with(": ") || line == ":" {
            line_types.push(LineType::Def);
        } else if idx + 1 < len {
            let next = lines[idx + 1];
            if (next.starts_with(": ") || next == ":")
                && !line.is_empty()
                && !line.starts_with('#')
                && !line.starts_with('-')
                && !line.starts_with('*')
                && !line.starts_with('>')
                && !line.starts_with('|')
                && !line.starts_with('`')
                && !line.starts_with('[')
                && !line.starts_with('<')
                && !line.starts_with('!')
            {
                line_types.push(LineType::DefTerm);
            } else {
                line_types.push(LineType::Normal);
            }
        } else {
            line_types.push(LineType::Normal);
        }
    }

    let mut result = String::new();
    let mut i = 0;

    while i < len {
        let line = lines[i];
        let lt = &line_types[i];

        if *lt == LineType::Code || *lt == LineType::Math {
            result.push_str(line);
            result.push('\n');
            i += 1;
            continue;
        }

        if *lt == LineType::Abbr {
            // Abbreviation definitions are hidden from output
            result.push('\n');
            i += 1;
            continue;
        }

        if *lt == LineType::Alert {
            if let Some(alert_content) = parse_alert(line) {
                result.push_str(&alert_content);
                i += 1;
                while i < len && lines[i].starts_with('>') {
                    let stripped = lines[i].strip_prefix('>').unwrap_or("");
                    let content_line = stripped.strip_prefix(' ').unwrap_or(stripped);
                    result.push_str(&process_inline_markdown(content_line));
                    result.push('\n');
                    i += 1;
                }
                result.push_str("</div></div>\n\n");
            } else {
                result.push_str(&process_inline_markdown(line));
                result.push('\n');
                i += 1;
            }
            continue;
        }

        if *lt == LineType::DefTerm {
            result.push_str("<dl>\n");
            while i < len && line_types[i] == LineType::DefTerm {
                let processed = process_inline_markdown(lines[i]);
                result.push_str(&format!("<dt>{}</dt>\n", processed));
                i += 1;
                while i < len && line_types[i] == LineType::Def {
                    let def_text = lines[i].strip_prefix(": ").unwrap_or("");
                    let processed_def = process_inline_markdown(def_text);
                    result.push_str(&format!("<dd>{}</dd>\n", processed_def));
                    i += 1;
                }
            }
            result.push_str("</dl>\n");
            continue;
        }

        if contains_html_tag(line) {
            result.push_str(line);
        } else {
            let processed = process_inline_markdown(line);
            result.push_str(&processed);
        }
        result.push('\n');
        i += 1;
    }

    result
}

#[derive(PartialEq)]
enum LineType {
    Normal,
    Code,
    Math,
    Alert,
    Def,
    DefTerm,
    Abbr,
}

fn contains_html_tag(line: &str) -> bool {
    let chars: Vec<char> = line.chars().collect();
    let len = chars.len();
    let mut i = 0;
    while i < len {
        if chars[i] == '<' && i + 1 < len {
            let next = chars[i + 1];
            if next.is_ascii_alphabetic() || next == '/' {
                return true;
            }
        }
        i += 1;
    }
    false
}

fn process_inline_markdown(line: &str) -> String {
    let mut result = String::new();
    let chars: Vec<char> = line.chars().collect();
    let len = chars.len();
    let mut i = 0;

    while i < len {
        // Backslash escapes (CommonMark §2.2): \* → *, \[ → [, etc.
        if chars[i] == '\\' && i + 1 < len {
            let next = chars[i + 1];
            // Preserve \( and \) for KaTeX inline math compatibility
            if next == '(' || next == ')' {
                result.push('\\');
                result.push(next);
                i += 2;
                continue;
            }
            if matches!(next, '!' | '"' | '#' | '$' | '%' | '&' | '\'' | '*' | '+' | ',' | '-' | '.' | '/' | ':' | ';' | '<' | '=' | '>' | '?' | '@' | '[' | '\\' | ']' | '^' | '_' | '`' | '{' | '|' | '}' | '~') {
                // Use HTML entity for chars that pulldown-cmark would re-interpret
                match next {
                    '*' => result.push_str("&#42;"),
                    '_' => result.push_str("&#95;"),
                    '`' => result.push_str("&#96;"),
                    '[' => result.push_str("&#91;"),
                    ']' => result.push_str("&#93;"),
                    '!' => result.push_str("&#33;"),
                    '#' => result.push_str("&#35;"),
                    '~' => result.push_str("&#126;"),
                    '<' => result.push_str("&lt;"),
                    '&' => result.push_str("&amp;"),
                    '"' => result.push_str("&quot;"),
                    '\'' => result.push_str("&#x27;"),
                    c => result.push(c),
                }
                i += 2;
                continue;
            }
            result.push('\\');
            i += 1;
            continue;
        }

        // `inline code` → <code>inline code</code>
        // Supports 1-3 backtick delimiters per CommonMark (e.g. `` ` ``)
        if chars[i] == '`' {
            // Count opening backticks
            let mut open_count = 1;
            while i + open_count < len && chars[i + open_count] == '`' {
                open_count += 1;
            }
            let mut j = i + open_count;
            // Scan for matching closing sequence
            while j + open_count <= len {
                if j < len && chars[j] == '`' {
                    // Check if we have exactly open_count backticks
                    let mut match_count = 1;
                    while j + match_count < len && chars[j + match_count] == '`' {
                        match_count += 1;
                    }
                    if match_count >= open_count {
                        // Found matching closer
                        let inner: String = chars[i + open_count..j].iter().collect();
                        // CommonMark §6.1: strip one space from each end if both start/end with space
                        let trimmed = inner.trim();
                        let code_content = if inner.len() > 1 && inner.starts_with(' ') && inner.ends_with(' ') && !trimmed.is_empty() {
                            &inner[1..inner.len() - 1]
                        } else if inner.chars().all(|c| c == ' ') {
                            " "
                        } else {
                            &inner
                        };
                        let safe_content = escape_html(code_content);
                        // Escape all backslashes to &#92; so pulldown-cmark
                        // won't apply backslash escapes to the content inside
                        // <code> tags (e.g. \* → *, \# → #).
                        let safe_content = safe_content.replace('\\', "&#92;");
                        result.push_str(&format!("<code>{}</code>", safe_content));
                        // Consume all matching backticks; extras → &#96; so they
                        // don't accidentally start new inline code spans
                        i = j + match_count;
                        if match_count > open_count {
                            for _ in 0..(match_count - open_count) {
                                result.push_str("&#96;");
                            }
                        }
                        break;
                    }
                    j += match_count;
                } else {
                    j += 1;
                }
            }
            if j + open_count > len {
                // No matching closer found, emit literal backticks
                for _ in 0..open_count {
                    result.push('`');
                }
                i += open_count;
            }
            continue;
        }

        // ~~strikethrough~~
        if i + 3 < len && chars[i] == '~' && chars[i + 1] == '~' {
            let mut j = i + 2;
            while j + 1 < len && !(chars[j] == '~' && chars[j + 1] == '~') {
                j += 1;
            }
            if j + 1 < len {
                let inner: String = chars[i + 2..j].iter().collect();
                result.push_str(&format!("<del>{}</del>", escape_html(&inner)));
                i = j + 2;
                continue;
            }
        }

        // ***bold italic*** (handle before ** to avoid conflict)
        if i + 5 < len && chars[i] == '*' && chars[i + 1] == '*' && chars[i + 2] == '*' {
            let mut j = i + 3;
            while j + 2 < len && !(chars[j] == '*' && chars[j + 1] == '*' && chars[j + 2] == '*') {
                j += 1;
            }
            if j + 2 < len {
                let inner: String = chars[i + 3..j].iter().collect();
                result.push_str(&format!("<em><strong>{}</strong></em>", escape_html(&inner)));
                i = j + 3;
                continue;
            }
        }

        // **bold**
        if i + 3 < len && chars[i] == '*' && chars[i + 1] == '*' {
            let mut j = i + 2;
            while j + 1 < len && !(chars[j] == '*' && chars[j + 1] == '*') {
                j += 1;
            }
            if j + 1 < len {
                let inner: String = chars[i + 2..j].iter().collect();
                result.push_str(&format!("<strong>{}</strong>", escape_html(&inner)));
                i = j + 2;
                continue;
            }
        }

        // *italic*
        if chars[i] == '*' {
            let mut j = i + 1;
            while j < len && chars[j] != '*' {
                j += 1;
            }
            if j < len && j > i + 1 {
                let inner: String = chars[i + 1..j].iter().collect();
                result.push_str(&format!("<em>{}</em>", escape_html(&inner)));
                i = j + 1;
                continue;
            }
        }

        // ==highlight==
        if i + 1 < len && chars[i] == '=' && chars[i + 1] == '=' {
            let mut j = i + 2;
            while j + 1 < len && !(chars[j] == '=' && chars[j + 1] == '=') {
                j += 1;
            }
            if j + 1 < len {
                let inner: String = chars[i + 2..j].iter().collect();
                result.push_str(&format!("<mark>{}</mark>", escape_html(&inner)));
                i = j + 2;
                continue;
            }
        }

        // [text](url) links (skip ![ for images)
        if chars[i] == '[' && (i == 0 || chars[i - 1] != '!') {
            let mut text_end = i + 1;
            while text_end < len && chars[text_end] != ']' {
                text_end += 1;
            }
            if text_end + 1 < len && chars[text_end] == ']' && chars[text_end + 1] == '(' {
                let mut url_end = text_end + 2;
                while url_end < len && chars[url_end] != ')' {
                    url_end += 1;
                }
                if url_end < len && chars[url_end] == ')' {
                    let link_text: String = chars[i + 1..text_end].iter().collect();
                    let url: String = chars[text_end + 2..url_end].iter().collect();
                    result.push_str(&format!("<a href=\"{}\">{}</a>", escape_html(&url), escape_html(&link_text)));
                    i = url_end + 1;
                    continue;
                }
            }
        }

        // Auto-links
        if i + 7 < len && chars[i] == 'h' && chars[i+1] == 't' && chars[i+2] == 't' && chars[i+3] == 'p' {
            let is_in_brackets = i >= 2 && chars[i-1] == '(' && chars[i-2] == ']';
            let is_in_angle = i >= 1 && chars[i-1] == '<';

            if !is_in_brackets && !is_in_angle {
                let is_https = i + 8 < len && chars[i+4] == 's' && chars[i+5] == ':';
                let prefix_len = if is_https { 8 } else { 7 };

                let mut url_len = prefix_len;
                while i + url_len < len {
                    let c = chars[i + url_len];
                    if c.is_alphanumeric() || c == '/' || c == '.' || c == '-' || c == '_' || c == '~' || c == ':' || c == '@' || c == '!' || c == '$' || c == '&' || c == '\'' || c == '(' || c == ')' || c == '*' || c == '+' || c == ',' || c == ';' || c == '=' || c == '?' || c == '%' || c == '#' {
                        url_len += 1;
                    } else {
                        break;
                    }
                }

                if url_len > prefix_len {
                    let url: String = chars[i..i+url_len].iter().collect();
                    let mut clean_url = url.trim_end_matches('.');
                    clean_url = clean_url.trim_end_matches(',');
                    if clean_url.ends_with(')') {
                        let open_parens = clean_url[prefix_len..].chars().filter(|&c| c == '(').count();
                        let close_parens = clean_url[prefix_len..clean_url.len()-1].chars().filter(|&c| c == ')').count();
                        if close_parens < open_parens {
                            clean_url = clean_url.trim_end_matches(')');
                        }
                    }
                    let clean_len = clean_url.len();
                    let actual_url: String = chars[i..i+clean_len].iter().collect();
                    result.push_str(&format!("<a href=\"{}\" target=\"_blank\">{}</a>", escape_html(&actual_url), escape_html(&actual_url)));
                    i += clean_len;
                    continue;
                }
            }
        }

        // Auto-detect email addresses (e.g. contact@tizumark.app)
        if chars[i].is_alphanumeric() {
            // Scan forward looking for an @ that would indicate an email
            let mut has_at = false;
            let mut at_pos = 0;
            let mut j = i;
            while j < len {
                let c = chars[j];
                if c.is_alphanumeric() || c == '.' || c == '-' || c == '_' || c == '+' {
                    // valid email character
                } else if c == '@' && !has_at && j > i && j + 1 < len {
                    has_at = true;
                    at_pos = j;
                } else {
                    break;
                }
                j += 1;
            }
            // Valid email: has @, domain has a dot, and ends with a valid TLD
            if has_at && at_pos + 3 < j {
                let domain_part: String = chars[at_pos + 1..j].iter().collect();
                if domain_part.contains('.') && !domain_part.starts_with('.') && !domain_part.ends_with('.') {
                    let email: String = chars[i..j].iter().collect();
                    // Verify the character after the email isn't alphanumeric (to avoid false matches)
                    let is_standalone = j >= len || !chars[j].is_alphanumeric();
                    if is_standalone {
                        result.push_str(&format!("<a href=\"mailto:{}\">{}</a>", escape_html(&email), escape_html(&email)));
                        i = j;
                        continue;
                    }
                }
            }
        }

        // Default: HTML-escape to prevent XSS
        // Note: '>' is NOT escaped because it is valid Markdown syntax (blockquote, nested blockquote).
        // pulldown-cmark will properly escape it in text content during HTML generation.
        match chars[i] {
            '&' => {
                // CommonMark §2.3 & §6.5: preserve valid HTML entity references
                let start = i;
                let mut found = false;
                if i + 1 < len {
                    if chars[i + 1] == '#' {
                        // Numeric entity &#NNN; or &#xHHH;
                        let mut j = i + 2;
                        if j < len && chars[j] == 'x' { j += 1; }
                        while j < len {
                            if chars[j] == ';' {
                                for k in start..=j { result.push(chars[k]); }
                                i = j;
                                found = true;
                                break;
                            }
                            if !chars[j].is_ascii_hexdigit() { break; }
                            j += 1;
                        }
                    } else if chars[i + 1].is_ascii_alphabetic() {
                        // Named entity &amp; &lt; &copy; etc.
                        let mut j = i + 2;
                        while j < len {
                            if chars[j] == ';' {
                                for k in start..=j { result.push(chars[k]); }
                                i = j;
                                found = true;
                                break;
                            }
                            if !chars[j].is_ascii_alphanumeric() { break; }
                            j += 1;
                        }
                    }
                }
                if !found {
                    result.push_str("&amp;");
                }
            }
            '<' => result.push_str("&lt;"),
            '"' => result.push_str("&quot;"),
            '\'' => result.push_str("&#x27;"),
            c => result.push(c),
        }
        i += 1;
    }

    result
}

fn parse_alert(line: &str) -> Option<String> {
    let lower = line.to_lowercase();
    if lower.starts_with("> [!info]") || lower.starts_with("> [!note]") {
        Some(r#"<div class="alert alert-note"><div class="alert-title"><svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="7" x2="8" y2="11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>Note</div><div class="alert-content">"#.to_string())
    } else if lower.starts_with("> [!tip]") {
        Some(r#"<div class="alert alert-tip"><div class="alert-title"><svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 1.8 1 3 2.2 3.8.3.2.3.5.3.8v1.4h4v-1.4c0-.3.1-.6.3-.8 1.2-.8 2.2-2 2.2-3.8 0-2.5-2-4.5-4.5-4.5z" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="6" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Tip</div><div class="alert-content">"#.to_string())
    } else if lower.starts_with("> [!important]") {
        Some(r#"<div class="alert alert-important"><div class="alert-title"><svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6.5" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>Important</div><div class="alert-content">"#.to_string())
    } else if lower.starts_with("> [!warning]") {
        Some(r#"<div class="alert alert-warning"><div class="alert-title"><svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>Warning</div><div class="alert-content">"#.to_string())
    } else if lower.starts_with("> [!caution]") {
        Some(r#"<div class="alert alert-caution"><div class="alert-title"><svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10.5" r="0.8" fill="currentColor"/></svg>Caution</div><div class="alert-content">"#.to_string())
    } else {
        None
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, argv, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                show_window(&window);
                let _ = app.emit("file-open", argv);
            }
        }))
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close();
                let _ = window.emit("close-requested", ());
            }
        })
        .setup(|app| {
            let show = MenuItem::with_id(app, "show", "显示主窗口", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show, &quit])?;
            TrayIconBuilder::new()
                .tooltip("TizuMark")
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .on_menu_event(|app, event| {
                    match event.id().as_ref() {
                        "show" => {
                            if let Some(window) = app.get_webview_window("main") {
                                show_window(&window);
                            }
                        }
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    }
                })
                .on_tray_icon_event(|tray, event| {
                    match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        }
                        | TrayIconEvent::DoubleClick { .. } => {
                            if let Some(window) = tray.app_handle().get_webview_window("main") {
                                show_window(&window);
                            }
                        }
                        _ => {}
                    }
                })
                .build(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_devtools,
            get_cli_args,
            read_file,
            write_file,
            write_binary_file,
            ensure_dir,
            save_image_to_assets,
            fetch_image_as_base64,
            generate_toc
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_escape_html() {
        assert_eq!(escape_html("hello"), "hello");
        assert_eq!(escape_html("<script>alert(1)</script>"), "&lt;script&gt;alert(1)&lt;/script&gt;");
        assert_eq!(escape_html("a & b"), "a &amp; b");
        assert_eq!(escape_html("\"quoted\""), "&quot;quoted&quot;");
        assert_eq!(escape_html("it's"), "it&#x27;s");
        assert_eq!(escape_html("<img src=x onerror=alert(1)>"), "&lt;img src=x onerror=alert(1)&gt;");
    }

    #[test]
    fn test_render_markdown_xss_in_heading() {
        let input = "# <script>alert(1)</script>".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("<script>"));
        assert!(html.contains("alert(1)"));
    }

    #[test]
    fn test_render_markdown_xss_in_text() {
        let input = "Hello <img src=x onerror=alert(1)>".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("onerror"));
        assert!(html.contains("<img"));
    }

    #[test]
    fn test_render_markdown_script_tag_stripped() {
        let input = "Text <script>document.cookie</script> more".to_string();
        let html = render_markdown(input);
        eprintln!("script output: {:?}", html);
        assert!(!html.contains("<script>"));
        assert!(!html.contains("</script>"));
        assert!(html.contains("Text"));
        assert!(html.contains("more"));
    }

    #[test]
    fn test_render_markdown_iframe_stripped() {
        let input = "Text <iframe src=\"evil.com\"></iframe> more".to_string();
        let html = render_markdown(input);
        eprintln!("iframe output: {:?}", html);
        assert!(!html.contains("<iframe"));
        assert!(!html.contains("</iframe>"));
    }

    #[test]
    fn test_render_markdown_img_preserved() {
        let input = "![alt](https://example.com/img.png)".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<img"));
        assert!(html.contains("src="));
    }

    #[test]
    fn test_render_markdown_normal() {
        let input = "# Hello\n\nThis is **bold** and *italic*.".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<h1>"));
        assert!(html.contains("<strong>bold</strong>"));
        assert!(html.contains("<em>italic</em>"));
    }

    #[test]
    fn test_generate_toc_xss() {
        let input = "# <script>alert(1)</script>\n## Normal Heading".to_string();
        let toc = generate_toc(input);
        assert!(!toc.contains("<script>"));
        assert!(toc.contains("&lt;script&gt;"));
        assert!(toc.contains("Normal Heading"));
    }

    #[test]
    fn test_generate_toc_normal() {
        let input = "# First\n## Second\n### Third".to_string();
        let toc = generate_toc(input);
        assert!(toc.contains("First"));
        assert!(toc.contains("Second"));
        assert!(toc.contains("Third"));
    }

    #[test]
    fn test_preprocess_alert_xss() {
        let input = "> [!NOTE]\n> <script>alert(1)</script>".to_string();
        let result = preprocess_markdown(input);
        assert!(!result.contains("<script>"), "Raw script tag should not appear in: {}", result);
        // After > escaping fix: < is escaped to &lt;, but > is preserved for markdown syntax
        assert!(result.contains("&lt;script"), "Script tag should be escaped in: {}", result);
    }

    #[test]
    fn test_preprocess_alert_normal() {
        let input = "> [!TIP]\n> This is a tip".to_string();
        let result = preprocess_markdown(input);
        assert!(result.contains("This is a tip"));
        assert!(result.contains("alert-tip"));
    }

    #[test]
    fn test_render_markdown_table() {
        let input = "| A | B |\n|---|---|\n| 1 | 2 |".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<table>"));
        assert!(html.contains("<td>1</td>"));
    }

    #[test]
    fn test_render_markdown_code_block() {
        let input = "```javascript\nconsole.log('hello');\n```".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<code"));
        assert!(html.contains("console.log"));
    }

    #[test]
    fn test_sanitize_preserves_chinese() {
        let input = "# 你好世界\n\n这是**中文**测试。".to_string();
        let html = render_markdown(input);
        assert!(html.contains("你好世界"));
        assert!(html.contains("中文"));
        assert!(html.contains("<strong>中文</strong>"));
    }

    #[test]
    fn test_sanitize_chinese_with_html() {
        let input = "# 标题\n\n<bold>加粗</bold>文字".to_string();
        let html = render_markdown(input);
        assert!(html.contains("标题"));
        assert!(html.contains("加粗"));
        assert!(html.contains("文字"));
    }

    #[test]
    fn test_render_markdown_math_block() {
        let input = "$$\n\\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}\n$$".to_string();
        let html = render_markdown(input);
        assert!(html.contains("\\begin{bmatrix}"));
        assert!(html.contains("\\end{bmatrix}"));
        assert!(html.contains("$$"), "Display math $$ delimiters should be preserved for frontend KaTeX");
    }

    #[test]
    fn test_render_markdown_inline_math() {
        let input = "行内公式：$E = mc^2$".to_string();
        let html = render_markdown(input);
        assert!(html.contains("$E = mc^2$"));
    }

    #[test]
    fn test_render_markdown_blockquote() {
        let input = "> 智能标点自动转换".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<blockquote"), "Blockquote should be present in: {}", html);
        assert!(html.contains("智能标点自动转换"));
    }

    #[test]
    fn test_render_markdown_nested_blockquote() {
        let input = "> 第一层\n> > 第二层".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<blockquote"), "Blockquote should be present in: {}", html);
    }

    #[test]
    fn test_render_markdown_task_list() {
        let input = "- [x] 完成项目文档\n- [ ] 发布版本".to_string();
        let html = render_markdown(input);
        assert!(html.contains("checkbox"), "Task list checkbox should be present in: {}", html);
        assert!(html.contains("完成项目文档"));
        assert!(html.contains("发布版本"));
    }

    #[test]
    fn test_render_markdown_horizontal_rule() {
        let input = "text before\n\n---\n\ntext after".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<hr"), "Horizontal rule should be present in: {}", html);
    }

    #[test]
    fn test_render_markdown_heading_with_math_section() {
        let input = "### 行内公式\n\n勾股定理：$a^2 + b^2 = c^2$".to_string();
        let html = render_markdown(input);
        assert!(html.contains("行内公式"), "Heading text should be present in: {}", html);
        assert!(!html.contains("###"), "Raw ### should not be present in: {}", html);
    }

    #[test]
    fn test_render_markdown_heading_after_alert() {
        let input = "> [!NOTE]\n> 提示内容\n\n### 独立公式块\n\n内容".to_string();
        let html = render_markdown(input);
        assert!(html.contains("独立公式块"), "Heading after alert should be present in: {}", html);
        assert!(!html.contains("###"), "Raw ### should not be present in: {}", html);
    }

    #[test]
    fn test_render_markdown_smart_punctuation_hr() {
        // ENABLE_SMART_PUNCTUATION should not break thematic breaks
        let input = "text\n\n---\n\nmore text".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<hr"), "Horizontal rule should be present with smart punctuation in: {}", html);
    }

    #[test]
    fn test_guard_math_blocks_respects_inline_code() {
        // $$ inside inline code should NOT be treated as math block delimiters
        let input = "> [!NOTE]\n> 如 `$$` 符号\n\n### 行内公式\n\n$$
真实公式
$$".to_string();
        let html = render_markdown(input);
        assert!(html.contains("行内公式"), "Heading should be preserved in: {}", html);
        assert!(!html.contains("###"), "Raw ### should not be present in: {}", html);
        assert!(html.contains("真实公式"), "Real math should be preserved in: {}", html);
    }

    #[test]
    fn test_render_demo_math_section() {
        let input = concat!(
            "> [!NOTE]\n",
            "> 以下数学公式在 Gitee / GitHub 等网页端可能显示为源码（如 `$$` 和 LaTeX 代码），这是平台不支持 KaTeX 渲染所致。\n",
            "\n",
            "### 行内公式\n",
            "\n",
            "勾股定理：$a^2 + b^2 = c^2$\n",
            "\n",
            "### 独立公式块\n",
            "\n",
            "麦克斯韦方程组：\n",
            "\n",
            "$$\n",
            "\\begin{aligned}\n",
            "\\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\\n",
            "\\end{aligned}\n",
            "$$\n",
        ).to_string();
        let html = render_markdown(input);
        assert!(html.contains("行内公式"), "Heading '行内公式' should be present in: {}", html);
        assert!(html.contains("独立公式块"), "Heading '独立公式块' should be present in: {}", html);
        assert!(!html.contains("### 行内公式"), "Raw markdown heading should not appear in: {}", html);
        assert!(html.contains("勾股定理"), "Content before math should be present in: {}", html);
        assert!(html.contains("麦克斯韦方程组"), "Content after heading should be present in: {}", html);
        assert!(html.contains("alert-note"), "Alert blockquote should be rendered in: {}", html);
    }


    #[test]
    fn test_render_four_backtick_fence() {
        let input = "````markdown
```javascript
let x = 1;
```
````".to_string();
        let html = render_markdown(input);
        assert!(html.contains("let x = 1"), "Inner code must be present");
        assert!(html.contains("```"), "Should render literal backticks");
    }
    #[test]
    fn test_full_demo_md_file() {
        let content = std::fs::read_to_string("../demo.md")
            .expect("Could not read demo.md");
        let html = render_markdown(content);

        // Find and print context around "### 行内公式"
        if let Some(pos) = html.find("### 行内公式") {
            let start = pos.saturating_sub(500);
            let end = std::cmp::min(pos + 500, html.len());
            // Make sure we're at char boundaries
            let start = html[..start].char_indices().last().map(|(i, _)| i).unwrap_or(0);
            let end = html[..end].char_indices().last().map(|(i, _)| i).unwrap_or(html.len());
            eprintln!("\n========== Context around ### 行内公式 ==========");
            eprintln!("{}", &html[start..end]);
            eprintln!("==========================================================");
        }

        assert!(!html.contains("### 行内公式"), "Raw ### 行内公式 should NOT appear in output");
    }
    #[test]
    fn test_full_demo_math_section_output() {
        // Exact content from demo.md lines 293-335
        let input = r##"## 数学公式

TizuMark 内置 KaTeX 渲染引擎，支持行内公式和独立公式。这是 TizuMark 区别于普通 Markdown 编辑器的重要特性。

> [!NOTE]
> 以下数学公式在 Gitee / GitHub 等网页端可能显示为源码（如 `$$` 和 LaTeX 代码），这是平台不支持 KaTeX 渲染所致。**在 TizuMark 软件中可完美渲染。** 打开 [demo.md](https://gitee.com/tizu/tizu-mark/blob/master/demo.md) 查看效果。

### 行内公式

勾股定理：$a^2 + b^2 = c^2$
欧拉恒等式：$e^{i\pi} + 1 = 0$
二次方程：$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$

### 独立公式块

麦克斯韦方程组：

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### 常用数学

线性回归的损失函数（MSE）：

$$
J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2
$$

贝叶斯定理：

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$
"##.to_string();

        let html = render_markdown(input);
        eprintln!("\n========== FULL MATH SECTION OUTPUT ==========\n{}\n================================================\n", html);

        // Verify structure
        assert!(html.contains("<h2>数学公式</h2>"), "h2 should be rendered");
        assert!(html.contains("<h3>行内公式</h3>"), "h3 行内公式 should be rendered");
        assert!(html.contains("<h3>独立公式块</h3>"), "h3 独立公式块 should be rendered");
        assert!(html.contains("<h3>常用数学</h3>"), "h3 常用数学 should be rendered");
        assert!(!html.contains("### "), "No raw ### should remain");
    }

    #[test]
    fn test_render_demo_task_list() {
        let input = concat!(
            "### 任务列表\n",
            "\n",
            "本周待办事项：\n",
            "\n",
            "- [x] 完成项目文档\n",
            "- [x] Review 代码\n",
            "- [ ] 发布 v0.2.0 版本\n",
        ).to_string();
        let html = render_markdown(input);
        assert!(html.contains("checkbox"), "Task list should have checkboxes in: {}", html);
        assert!(html.contains("完成项目文档"));
    }

    #[test]
    fn test_render_blockquote_and_hr() {
        let input = "> 单一引用：TizuMark 的设计哲学是\"简单就是力量\"。\n\n---\n\n## 流程图与图表\n\nTizuMark 内置 Mermaid 图表引擎。".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<blockquote"), "Blockquote should be present in: {}", html);
        assert!(html.contains("<hr"), "Horizontal rule should be present in: {}", html);
        assert!(html.contains("流程图与图表"), "Heading should be present in: {}", html);
        assert!(html.contains("Mermaid"), "Content should be present in: {}", html);
    }
}

    #[test]
    fn test_matrix_math_block() {
        // Test with proper \\ (double backslash) matching actual demo.md content
        let input = "矩阵乘法：\n\n\
$$\n\
\\begin{bmatrix}\n\
a_{11} & a_{12} \\\\\n\
a_{21} & a_{22}\n\
\\end{bmatrix}\n\
\\times\n\
\\begin{bmatrix}\n\
b_{11} & b_{12} \\\\\n\
b_{21} & b_{22}\n\
\\end{bmatrix}\n\
=\n\
\\begin{bmatrix}\n\
a_{11}b_{11} + a_{12}b_{21} & a_{11}b_{12} + a_{12}b_{22} \\\\\n\
a_{21}b_{11} + a_{22}b_{21} & a_{21}b_{12} + a_{22}b_{22}\n\
\\end{bmatrix}\n\
$$\n\
\n\
---\n\
".to_string();
        let html = render_markdown(input);
        eprintln!("\n========== MATRIX BLOCK OUTPUT (with \\\\) ==========\n{}\n======================================================\n", html);

        // Check: should have the matrix LaTeX content
        assert!(html.contains("bmatrix"), "Should contain bmatrix");
        assert!(html.contains("矩阵乘法"), "Should contain 矩阵乘法 heading text");
        // After HTML-escaping, & becomes &amp; but \\ is preserved (backslash is not special in HTML)
        assert!(html.contains("a_{11} &amp; a_{12} \\\\"), "Should preserve LaTeX row breaks with &amp;");
    }

    #[test]
    fn test_backslash_escape_asterisk() {
        let input = "\\*not italic\\*".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("<em>"), "Escaped * should not be emphasis");
        assert!(html.contains("not italic"), "Content should be preserved");
    }

    #[test]
    fn test_backslash_escape_bracket() {
        let input = "\\[not a link\\]".to_string();
        let html = render_markdown(input);
        assert!(html.contains("[not a link]"), "Escaped brackets as literal");
    }

    #[test]
    fn test_inline_code_space_trimming() {
        let input = "` code `".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<code>code</code>"), "Spaces should be trimmed");
    }

    #[test]
    fn test_triple_emphasis() {
        let input = "***bold italic***".to_string();
        let html = render_markdown(input);
        assert!(html.contains("<em><strong>"), "Triple *** should give nested emphasis");
        assert!(html.contains("bold italic"), "Content preserved");
    }

    #[test]
    fn test_html_entity_copy() {
        let input = "&copy; 2025".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("&amp;copy;"), "Entity &copy; should not be double-escaped");
    }

    #[test]
    fn test_html_entity_amp() {
        let input = "&amp; is the & symbol".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("&amp;amp;"), "Entity &amp; should not be double-escaped");
    }

    #[test]
    fn test_plain_ampersand_escaped() {
        let input = "A & B".to_string();
        let html = render_markdown(input);
        assert!(html.contains("&amp;"), "Plain & should be escaped");
    }

    #[test]
    fn test_math_before_alert() {
        let input = "如果你在写技术文档，可以自然地插入数学公式：\n\n$$\nO(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n)\n$$\n\n> [!TIP]\n> **写作建议**：好的技术文档是\"分层\"的——正文讲核心逻辑，脚注补充细节，引用块标注出处，提示框强调要点。";
        let html = render_markdown(input.to_string());
        assert!(html.contains("$$"), "Math $$ should be preserved");
        assert!(!html.contains("<p>$$"), "Math block should NOT be wrapped in <p>");
    }

    #[test]
    fn test_full_demo_md_for_code_wrap() {
        let content = std::fs::read_to_string("../demo.md")
            .expect("Could not read demo.md");
        let html = render_markdown(content.clone());

        // Complexity formula must NOT be wrapped in <code>
        assert!(
            !html.contains("<code>\n$$\nO(1)") && !html.contains("<code>$$\nO(1)"),
            "Complexity formula should NOT be wrapped in <code>"
        );

        // All <code> tags must be balanced
        let mut tag_stack: Vec<()> = Vec::new();
        let mut pos = 0;
        let chars: Vec<char> = html.chars().collect();
        let len = chars.len();
        while pos < len {
            if chars[pos] == '<' && pos + 1 < len {
                if chars[pos + 1] == '/' {
                    let mut tag_end = pos + 2;
                    while tag_end < len && chars[tag_end] != '>' { tag_end += 1; }
                    let tag_name: String = chars[pos + 2..tag_end].iter().collect();
                    if tag_name == "code" {
                        assert!(tag_stack.pop().is_some(), "Orphan </code> in HTML output");
                    }
                    pos = tag_end + 1;
                    continue;
                }
                if chars[pos + 1].is_ascii_alphabetic() {
                    let mut tag_end = pos + 1;
                    while tag_end < len && chars[tag_end] != '>' && chars[tag_end] != ' ' { tag_end += 1; }
                    let tag_name: String = chars[pos + 1..tag_end].iter().collect();
                    if tag_name == "code" {
                        tag_stack.push(());
                    }
                    while tag_end < len && chars[tag_end] != '>' { tag_end += 1; }
                    pos = tag_end + 1;
                    continue;
                }
            }
            pos += 1;
        }
        assert!(tag_stack.is_empty(), "Unclosed <code> tags in HTML output: {}", tag_stack.len());
    }

    #[test]
    fn test_extract_abbreviations() {
        let input = "*[HTML]: HyperText Markup Language\n*[CSS]: Cascading Style Sheets\n";
        let abbrs = extract_abbreviations(input);
        assert_eq!(abbrs.len(), 2, "Should extract 2 abbreviations");
        assert_eq!(abbrs[0], ("HTML".to_string(), "HyperText Markup Language".to_string()));
        assert_eq!(abbrs[1], ("CSS".to_string(), "Cascading Style Sheets".to_string()));
    }

    #[test]
    fn test_abbr_defs_hidden_from_output() {
        let input = "*[HTML]: HyperText Markup Language\n\nHTML is a markup language.\n".to_string();
        let html = render_markdown(input);
        assert!(!html.contains("*[HTML]:"), "Abbr definition lines should be hidden from output");
        assert!(html.contains("id=\"abbr-data\""), "Abbr data div should be embedded in output");
        assert!(html.contains("HTML is a markup language"), "Regular text should still appear in output");
    }

    #[test]
    fn test_abbr_not_in_code_blocks() {
        // extract_abbreviations is line-based; it will find *[HTML]: even in code blocks.
        // The frontend TreeWalker skips CODE/PRE tags, so this is safe at render time.
        let content = "```\n*[HTML]: this is not an abbreviation\n```\n\n*[CSS]: Cascading Style Sheets\n\nCSS is used.\n".to_string();
        let abbrs = extract_abbreviations(&content);
        assert!(abbrs.iter().any(|(t, _)| t == "HTML"), "Line parser extracts all *[TERM]: lines");
        assert!(abbrs.iter().any(|(t, _)| t == "CSS"), "Legitimate abbreviation should also be extracted");
        let html = render_markdown(content);
        // Code block content IS preserved verbatim (including *[HTML]: text)
        // The real abbreviation definition *[CSS]: should be hidden
        // Data div should be embedded
        assert!(html.contains("<pre><code>"), "Code block should be rendered");
        assert!(html.contains("*[HTML]:"), "Code block content should be preserved verbatim");
        assert!(!html.contains("*[CSS]:"), "Abbr definition outside code should be hidden");
        assert!(html.contains("id=\"abbr-data\""), "Data div should be embedded");
    }

    #[test]
    fn test_decode_numeric_entities() {
        assert_eq!(decode_numeric_entities("&#x6A;"), "j"); // hex 'j'
        assert_eq!(decode_numeric_entities("&#106;"), "j"); // decimal 'j'
        assert_eq!(decode_numeric_entities("&#x6A"), ""); // No closing ; → stripped
        assert_eq!(decode_numeric_entities("hello&#65;world"), "helloAworld");
        assert_eq!(decode_numeric_entities("&#x6A;&#x61;"), "ja"); // Multiple
        assert_eq!(decode_numeric_entities("no entities"), "no entities");
        assert_eq!(decode_numeric_entities("&#X6A;"), "j"); // Uppercase X
        assert_eq!(decode_numeric_entities("&#x6A;avascript:"), "javascript:"); // Decode 'j'
    }

    #[test]
    fn test_contains_dangerous_protocol() {
        assert!(contains_dangerous_protocol("javascript:alert(1)"));
        assert!(contains_dangerous_protocol("JAVASCRIPT:alert(1)"));
        assert!(contains_dangerous_protocol("&#x6A;avascript:alert(1)"));
        assert!(contains_dangerous_protocol("&#106;avascript:alert(1)"));
        assert!(contains_dangerous_protocol("&#X6A;avascript:alert(1)"));
        assert!(!contains_dangerous_protocol("https://example.com"));
        assert!(!contains_dangerous_protocol("javascript-alert"));
        assert!(!contains_dangerous_protocol("onclick"));
    }

    #[test]
    fn test_xss_numeric_entity_bypass() {
        // &#x6A; = 'j', so &#x6A;avascript: = javascript:
        let input = "<a href=\"&#x6A;avascript:alert(1)\">click</a>";
        let html = render_markdown(input.to_string());
        assert!(!html.contains("javascript:"), "Numeric entity bypass should be blocked");
        assert!(html.contains("click"), "Link text should be preserved");
    }

    #[test]
    fn test_xss_decimal_entity_bypass() {
        // &#106; = 'j', so &#106;avascript: = javascript:
        let input = "<a href=\"&#106;avascript:alert(1)\">click</a>";
        let html = render_markdown(input.to_string());
        assert!(!html.contains("javascript:"), "Decimal entity bypass should be blocked");
        assert!(html.contains("click"), "Link text should be preserved");
    }

    #[test]
    fn test_boolean_attribute_xss() {
        // Boolean attribute with dangerous protocol
        let input = "<div javascript:>test</div>";
        let html = render_markdown(input.to_string());
        assert!(!html.contains("javascript:"), "Boolean attribute with javascript: should be stripped");
    }
