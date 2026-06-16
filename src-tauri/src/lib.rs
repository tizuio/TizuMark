use std::fs;

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, &content).map_err(|e| e.to_string())
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
        let item = format!(r#"<li><a href="{}">{}</a></li>"#, href, text);
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
    html_output
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
            if next.starts_with(": ") || next == ":"
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
                    result.push_str(content_line);
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
                result.push_str(&format!("<mark>{}</mark>", inner));
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
                    result.push_str(&format!("<a href=\"{}\" target=\"_blank\">{}</a>", actual_url, actual_url));
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
            render_markdown,
            generate_toc
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
