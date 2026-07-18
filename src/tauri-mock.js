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

  // In-memory directory tree simulation (for list_dir / file explorer tests)
  const dirTree = new Map();

  // Controllable file metadata store (for external-change tests)
  const metaStore = new Map();

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

      case 'open_devtools': {
        console.log('[TAURI MOCK] open_devtools');
        return null;
      }

      case 'app_data_dir': {
        return 'C:/mock-app-data';
      }

      case 'file_meta': {
        const path = args.path;
        if (metaStore.has(path)) return metaStore.get(path);
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
        // Return a real, atob-decodable tiny PNG base64 so downstream
        // Uint8Array.from(atob(...)) logic works in the browser harness.
        // 1x1 transparent PNG.
        return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      }

      case 'get_cli_args': {
        return []; // No CLI args in browser
      }

      case 'ensure_dir': {
        // No-op: directory creation is simulated
        return null;
      }

      case 'list_dir': {
        const p = args.path;
        if (dirTree.has(p)) return dirTree.get(p);
        // Derive from VFS keys that start with path + '/'
        const prefix = p.endsWith('/') ? p : p + '/';
        const entries = [];
        const seen = new Set();
        for (const key of vfs.keys()) {
          if (key.startsWith(prefix)) {
            const rest = key.slice(prefix.length);
            const slash = rest.indexOf('/');
            if (slash === -1) {
              if (!seen.has(rest)) { seen.add(rest); entries.push({ path: key, is_dir: false }); }
            } else {
              const dirName = rest.slice(0, slash);
              if (!seen.has(dirName)) { seen.add(dirName); entries.push({ path: prefix + dirName, is_dir: true }); }
            }
          }
        }
        return entries;
      }

      case 'watch_folder': {
        // No-op: folder watching is simulated via mockEvent.emit('folder-changed')
        console.log('[TAURI MOCK] watch_folder:', args.path);
        return null;
      }

      case 'stop_watch': {
        console.log('[TAURI MOCK] stop_watch');
        return null;
      }

      case 'save_image_to_assets': {
        // bytes: number[] ; ext: string ; assetsDir: string
        const ext = args.ext || 'png';
        const assetsDir = args.assetsDir || 'assets';
        const fileName = 'mock-img-' + (Date.now() % 100000) + '.' + ext;
        const fullPath = assetsDir + '/' + fileName;
        try { vfs.set(fullPath, new Uint8Array(args.bytes || [])); } catch (e) { /* ignore */ }
        return { filename: fileName, width: 100, height: 100 };
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

  // Mock Channel (used by updater progress callbacks)
  function MockChannel() {
    this.id = 'mock-channel-' + (++mockChannelSeq);
    this.onmessage = null;
    this._send = (data) => { if (this.onmessage) this.onmessage(data); };
  }
  let mockChannelSeq = 0;

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
      invoke: mockInvoke,
      Channel: MockChannel
    },
    window: mockWindow,
    event: mockEvent,
    shell: mockShell,
    app: {
      getVersion: async function() { return '1.0.4'; }
    }
  };

  // Test helpers for simulating external file changes
  window.__mockSetMeta = function(path, mtime, size) {
    metaStore.set(path, { mtime: mtime, size: size });
  };
  window.__mockClearMeta = function(path) {
    if (path === undefined) metaStore.clear();
    else metaStore.delete(path);
  };
  window.__mockSetContent = function(path, content) {
    vfs.set(path, content);
  };
  // Set a directory listing returned by list_dir (array of {path, is_dir})
  window.__mockSetDir = function(path, entries) {
    dirTree.set(path, entries);
  };
  // Clear all mock state
  window.__mockReset = function() {
    vfs.clear(); dirTree.clear(); metaStore.clear();
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
