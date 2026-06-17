use std::fs;

fn escape_html(s: &str) -> String {
    s.replace('&', "&amp;")
     .replace('<', "&lt;")
     .replace('>', "&gt;")
     .replace('"', "&quot;")
     .replace('\'', "&#x27;")
}

fn sanitize_html(html: &str) -> String {
    let dangerous_tags = ["script", "style", "iframe", "object", "embed", "form", "input", "textarea", "select", "button", "link", "meta", "base"];
    let mut result = String::with_capacity(html.len());
    let chars: Vec<char> = html.chars().collect();
    let len = chars.len();
    let mut i = 0;

    while i < len {
        if chars[i] == '<' && i + 1 < len {
            if chars[i + 1] == '/' {
                let end = find_char(&chars, i, '>');
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
                i = end;
            } else {
                let end = find_char(&chars, i, '>');
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

fn sanitize_tag_attributes(tag_content: &str) -> String {
    let mut parts = tag_content.splitn(2, |c: char| c.is_whitespace());
    let tag_name = parts.next().unwrap_or("");
    let rest = parts.next().unwrap_or("");

    if rest.is_empty() {
        return tag_content.to_string();
    }

    let mut result = tag_name.to_string();
    for attr in rest.split_whitespace() {
        let attr_lower = attr.to_lowercase();
        if attr_lower.starts_with("on") {
            continue;
        }
        if attr_lower.contains("javascript:") {
            continue;
        }
        result.push(' ');
        result.push_str(attr);
    }
    result
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
async fn fetch_image_as_base64(url: String) -> Result<String, String> {
    let resp = reqwest::get(&url).await.map_err(|e| e.to_string())?;
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
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
        if c.is_ascii_alphanumeric() || c == '-' || c == '_' || c == ' ' || c >= '\u{4e00}' && c <= '\u{9fa5}' {
            if c == ' ' {
                id.push('-');
            } else {
                id.push(c.to_ascii_lowercase());
            }
        }
    }
    id.trim_matches('-').to_string()
}

#[tauri::command]
fn render_markdown(content: String) -> String {
    use pulldown_cmark::{Parser, Options, html};

    let preprocessed = preprocess_markdown(content);

    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
    options.insert(Options::ENABLE_SMART_PUNCTUATION);

    let parser = Parser::new_ext(&preprocessed, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    sanitize_html(&html_output)
}

fn preprocess_markdown(content: String) -> String {
    let lines: Vec<&str> = content.lines().collect();
    let len = lines.len();
    let mut in_code_block = false;
    let mut line_types: Vec<LineType> = Vec::with_capacity(len);

    for idx in 0..len {
        let line = lines[idx];
        if line.trim_start().starts_with("```") {
            in_code_block = !in_code_block;
            line_types.push(LineType::Code);
            continue;
        }
        if in_code_block {
            line_types.push(LineType::Code);
            continue;
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

        if *lt == LineType::Code {
            result.push_str(line);
            result.push('\n');
            i += 1;
            continue;
        }

        if *lt == LineType::Alert {
            if let Some(alert_content) = parse_alert(line) {
                result.push_str(&alert_content);
                i += 1;
                while i < len && (lines[i].starts_with("> ") || lines[i] == ">") {
                    let content_line = if lines[i] == "> " { "" } else { &lines[i][2..] };
                    result.push_str(&escape_html(content_line));
                    result.push('\n');
                    i += 1;
                }
                result.push_str("</div></div>\n");
            }
            continue;
        }

        if *lt == LineType::DefTerm {
            result.push_str("<dl>\n");
            while i < len && line_types[i] == LineType::DefTerm {
                let processed = process_inline_markdown(lines[i]);
                result.push_str(&format!("<dt>{}</dt>\n", escape_html(&processed)));
                i += 1;
                while i < len && line_types[i] == LineType::Def {
                    let def_text = lines[i].strip_prefix(": ").unwrap_or("");
                    let processed_def = process_inline_markdown(def_text);
                    result.push_str(&format!("<dd>{}</dd>\n", escape_html(&processed_def)));
                    i += 1;
                }
            }
            result.push_str("</dl>\n");
            continue;
        }

        let processed = process_inline_markdown(line);
        result.push_str(&processed);
        result.push('\n');
        i += 1;
    }

    result
}

#[derive(PartialEq)]
enum LineType {
    Normal,
    Code,
    Alert,
    Def,
    DefTerm,
}

fn process_inline_markdown(line: &str) -> String {
    let mut result = String::new();
    let chars: Vec<char> = line.chars().collect();
    let len = chars.len();
    let mut i = 0;
    let mut in_code = false;

    while i < len {
        if chars[i] == '`' {
            in_code = !in_code;
            result.push(chars[i]);
            i += 1;
            continue;
        }

        if in_code {
            result.push(chars[i]);
            i += 1;
            continue;
        }

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
                    clean_url = clean_url.trim_end_matches(')');
                    let clean_len = clean_url.len();
                    let actual_url: String = chars[i..i+clean_len].iter().collect();
                    result.push_str(&format!("<a href=\"{}\" target=\"_blank\">{}</a>", escape_html(&actual_url), escape_html(&actual_url)));
                    i += clean_len;
                    continue;
                }
            }
        }

        result.push(chars[i]);
        i += 1;
    }

    result
}

fn parse_alert(line: &str) -> Option<String> {
    if line.starts_with("> [!INFO]") || line.starts_with("> [!NOTE]") {
        Some(r#"<div class="alert alert-note"><div class="alert-title">&#x2139;&#xFE0F; INFO</div><div class="alert-content">"#.to_string())
    } else if line.starts_with("> [!TIP]") {
        Some(r#"<div class="alert alert-tip"><div class="alert-title">&#x1F4A1; Tip</div><div class="alert-content">"#.to_string())
    } else if line.starts_with("> [!IMPORTANT]") {
        Some(r#"<div class="alert alert-important"><div class="alert-title">&#x2757; Important</div><div class="alert-content">"#.to_string())
    } else if line.starts_with("> [!WARNING]") {
        Some(r#"<div class="alert alert-warning"><div class="alert-title">&#x26A0;&#xFE0F; Warning</div><div class="alert-content">"#.to_string())
    } else if line.starts_with("> [!CAUTION]") {
        Some(r#"<div class="alert alert-caution"><div class="alert-title">&#x1F6D1; Caution</div><div class="alert-content">"#.to_string())
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
        .invoke_handler(tauri::generate_handler![
            read_file,
            write_file,
            write_binary_file,
            fetch_image_as_base64,
            render_markdown,
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
        assert!(!result.contains("<script>"));
        assert!(result.contains("&lt;script&gt;"));
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
}
