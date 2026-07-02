// Tauri API Mock for browser testing
window.__testErrors = [];
window.addEventListener('error', function(e) {
  window.__testErrors.push({msg: e.message, file: (e.filename||'').split('/').pop(), line: e.lineno, col: e.colno});
  console.error('[TEST ERROR]', e.message, 'at', e.filename, e.lineno);
});
window.addEventListener('unhandledrejection', function(e) {
  window.__testErrors.push({msg: 'Rejection: ' + String(e.reason), stack: (e.reason?.stack||'').substring(0, 300)});
  console.error('[TEST REJECTION]', e.reason);
});

(function() {
  'use strict';

  // In-memory file system simulation
  const vfs = new Map();

  // Load demo.md into VFS
  function initVFS() {
    // Will be populated when demo.md is loaded
  }

  // Mock invoke
  const mockInvoke = async function(cmd, args) {
    console.log('[TAURI MOCK] invoke:', cmd, args);

    switch (cmd) {
      case 'read_file': {
        const path = args.path;
        // Check virtual filesystem first
        if (vfs.has(path)) {
          return vfs.get(path);
        }
        // Try to fetch relative paths
        if (path.endsWith('.md') || path.endsWith('.markdown') || path.endsWith('.txt')) {
          try {
            const resp = await fetch(path);
            if (resp.ok) return await resp.text();
          } catch(e) {
            console.warn('[TAURI MOCK] Cannot fetch:', path);
          }
        }
        throw new Error('File not found: ' + path);
      }

      case 'write_file': {
        vfs.set(args.path, args.content);
        console.log('[TAURI MOCK] wrote:', args.path, '(' + args.content.length + ' bytes)');
        return null;
      }

      case 'write_binary_file': {
        vfs.set(args.path, new Uint8Array(args.contents));
        console.log('[TAURI MOCK] wrote binary:', args.path, '(' + args.contents.length + ' bytes)');
        return null;
      }

      case 'generate_toc': {
        // Simple TOC generation
        const content = args.content;
        const lines = content.split('\n');
        let toc = '<ul class="toc-list">\n';
        let inCode = false;
        for (const line of lines) {
          if (line.trim().startsWith('```')) { inCode = !inCode; continue; }
          if (inCode) continue;
          const m = line.match(/^(#{1,6})\s+(.+)$/);
          if (m) {
            const level = m[1].length;
            const title = m[2].replace(/<[^>]*>/g, '');
            let anch = '';
            for (const ch of title) {
              if (/[\p{L}\p{N}]/u.test(ch)) {
                anch += ch.toLowerCase();
              } else if (ch === ' ' || ch === '-' || ch === '_') {
                anch += '-';
              }
            }
            const anchor = anch.replace(/-+/g, '-').replace(/^-|-$/g, '');
            toc += `  <li class="toc-level-${level}"><a href="#${anchor}">${title}</a></li>\n`;
          }
        }
        toc += '</ul>';
        return toc;
      }

      case 'fetch_image_as_base64': {
        // Can't fetch external images in browser without CORS
        // Return a placeholder image
        return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#ddd" width="100" height="100"/><text x="10" y="55" fill="#999" font-size="12">Image</text></svg>');
      }

      case 'get_cli_args': {
        return []; // No CLI args in browser
      }

      // Dialog mocks
      case 'plugin:dialog|open': {
        return new Promise((resolve) => {
          // Create a hidden file input
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.md,.markdown,.txt';
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const text = await file.text();
              resolve({
                path: file.name,
                content: text
              });
            } else {
              resolve(null);
            }
          };
          input.click();
        });
      }

      case 'plugin:dialog|save': {
        // Browser doesn't support native save dialogs well
        // Trigger download instead
        return new Promise((resolve) => {
          const path = prompt('[Mock] Save as filename:', args?.options?.defaultPath || 'document.md');
          resolve(path || null);
        });
      }

      default:
        console.warn('[TAURI MOCK] Unknown command:', cmd);
        return null;
    }
  };

  // Mock window API
  const mockWindow = {
    getCurrentWindow: function() {
      return {
        minimize: async () => {
          console.log('[TAURI MOCK] minimize');
        },
        maximize: async () => {
          console.log('[TAURI MOCK] maximize');
        },
        unmaximize: async () => {
          console.log('[TAURI MOCK] unmaximize');
        },
        isMaximized: async () => {
          return document.fullscreenElement !== null;
        },
        destroy: async () => {
          console.log('[TAURI MOCK] destroy (window close)');
        },
        setFocus: async () => {
          console.log('[TAURI MOCK] setFocus');
        }
      };
    }
  };

  // Mock event system
  const listeners = {};
  const mockEvent = {
    listen: function(event, handler) {
      console.log('[TAURI MOCK] event listen:', event);
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
      // Return unlisten function
      return () => {
        const idx = listeners[event].indexOf(handler);
        if (idx >= 0) listeners[event].splice(idx, 1);
      };
    },
    emit: function(event, payload) {
      console.log('[TAURI MOCK] event emit:', event, payload);
      if (listeners[event]) {
        listeners[event].forEach(h => h({ payload: payload }));
      }
    }
  };

  // Mock shell
  const mockShell = {
    open: async function(path) {
      console.log('[TAURI MOCK] shell open:', path);
      window.open(path, '_blank');
    }
  };

  // Install mock
  window.__TAURI__ = {
    core: {
      invoke: mockInvoke
    },
    window: mockWindow,
    event: mockEvent,
    shell: mockShell
  };

  // Mock the dialog functions used globally
  window.dialogOpen = async function(options = {}) {
    return await mockInvoke('plugin:dialog|open', { options });
  };
  window.dialogSave = async function(options = {}) {
    return await mockInvoke('plugin:dialog|save', { options });
  };

  console.log('[TAURI MOCK] Installed. All Tauri APIs are mocked for browser testing.');
  console.log('[TAURI MOCK] VFS initialized. Use mockEvent.emit("file-open", {path: "demo.md"}) to simulate file open.');
})();
