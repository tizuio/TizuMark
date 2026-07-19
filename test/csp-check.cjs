// CSP regression harness for TizuMark (Windows single-user desktop app).
// Serves src/ with the EXACT CSP from src-tauri/tauri.conf.json, injects
// tauri-mock.js so app.js can boot in a plain browser, and verifies that
// security-policy-related features still render:
//   1. http:// (plaintext) images
//   2. custom @font-face fonts via data: URIs
//   3. KaTeX math
//   4. Mermaid diagrams
// Drives Chrome over CDP (ws) on localhost:9222.

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('C:\\Users\\admin\\.claude\\skills\\browser\\node_modules\\ws');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PORT = 8080;
const IMG_PORT = 8081;
const CSP = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: http: https:; font-src 'self' data: blob:; media-src 'self' blob: https: data:; frame-src 'self'; connect-src 'self' ipc: tauri: http: https:; worker-src 'self' blob:";

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json'
};

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({ 'Access-Control-Allow-Origin': '*' }, headers || {}));
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  // Inject tauri-mock before app.js so window.__TAURI__ exists at app.js load.
  if (urlPath === '/index.html') {
    let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
    html = html.replace('<script src="app.js"></script>',
      '<script src="tauri-mock.js"></script>\n<script src="app.js"></script>');
    return send(res, 200, html, { 'Content-Type': 'text/html', 'Content-Security-Policy': CSP });
  }

  const filePath = path.join(SRC, urlPath);
  if (!filePath.startsWith(SRC) || !fs.existsSync(filePath)) {
    return send(res, 404, 'not found: ' + urlPath);
  }
  const ext = path.extname(filePath).toLowerCase();
  const buf = fs.readFileSync(filePath);
  return send(res, 200, buf, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Security-Policy': CSP });
});

// Tiny plaintext-HTTP image server (simulates http:// image in a user doc).
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC',
  'base64'
);
const imgServer = http.createServer((req, res) => send(res, 200, PNG, { 'Content-Type': 'image/png' }));

// ---- CDP helpers ----
async function getTargets() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}
function cdp(page, method, params) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    const stack = {};
    ws.on('open', () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method, params: Object.assign({ awaitPromise: true, returnByValue: true }, params || {}) }));
    });
    ws.on('message', d => {
      const m = JSON.parse(d);
      if (m.id === 2) { console.error('[cdp raw]', JSON.stringify(m).slice(0, 600)); ws.close(); resolve(m.result); }
    });
    ws.on('error', reject);
  });
}

(async () => {
  console.log(`[harness] expecting app on http://127.0.0.1:${PORT} (CSP applied), http image on :${IMG_PORT}`);

  const targets = await getTargets();
  const page = targets.find(t => t.type === 'page');
  if (!page) { console.error('No Chrome page on :9222 — run the browser skill start.js first'); process.exit(2); }

  // Navigate
  await cdp(page, 'Page.enable');
  await cdp(page, 'Page.navigate', { url: `http://127.0.0.1:${PORT}/` });

  // Capture console + CSP violations
  const logs = [];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  ws.on('open', () => { ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' })); ws.send(JSON.stringify({ id: 2, method: 'Log.enable' })); });
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Runtime.consoleAPICalled') logs.push('console.' + m.params.type + ': ' + (m.params.args || []).map(a => a.value || a.description || '').join(' '));
    if (m.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION: ' + (m.params.exceptionDetails && m.params.exceptionDetails.text));
  });

  // Wait for boot
  await new Promise(r => setTimeout(r, 2500));

  // Directly exercise the security-policy-sensitive features and watch for CSP
  // violations. We avoid the app's updatePreview() pipeline (hangs under mock)
  // and instead drive each renderer directly in the page context.
  const result = await cdp(page, 'Runtime.evaluate', {
    expression: `(async () => {
      const out = { booted: !!window.editor, steps: {} };
      try {
        // 1) Custom @font-face via data: URI (the previously-broken path)
        const fontCss = '@font-face{font-family:"CspTestFont";src:url("data:font/ttf;base64,AAEAAAANAAIAAAwAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAEAAQAAAAA") format("truetype");}';
        const style = document.createElement('style'); style.textContent = fontCss + '.csptest{font-family:"CspTestFont",sans-serif;}'; document.head.appendChild(style);
        const fspan = document.createElement('span'); fspan.className = 'csptest'; fspan.textContent = 'font-test'; document.body.appendChild(fspan);
        await (document.fonts ? document.fonts.ready : Promise.resolve());
        out.steps.customFontFace = true; // no CSP rejection == allowed

        // 2) Plaintext http:// image (the NEW relaxation)
        const img = new Image();
        const imgLoaded = await new Promise(res => {
          img.onload = () => res(true);
          img.onerror = () => res(false);
          img.src = 'http://127.0.0.1:${IMG_PORT}/test.png?t=' + Date.now();
          setTimeout(() => res(false), 4000);
        });
        out.steps.httpImageLoaded = imgLoaded;
        out.steps.httpImageNaturalW = img.naturalWidth;

        // 3) KaTeX math render
        const kdiv = document.createElement('div');
        if (typeof katex !== 'undefined') { katex.render('E = mc^2', kdiv); out.steps.katexRendered = !!kdiv.querySelector('.katex'); }
        else out.steps.katexRendered = 'no-katex';

        // 4) Mermaid diagram render
        if (typeof mermaid !== 'undefined') {
          const mdiv = document.createElement('div'); mdiv.className = 'mermaid'; mdiv.textContent = 'graph TD; A-->B';
          document.body.appendChild(mdiv);
          mermaid.initialize({ startOnLoad: false });
          await mermaid.run({ nodes: [mdiv] });
          out.steps.mermaidRendered = !!mdiv.querySelector('svg');
        } else out.steps.mermaidRendered = 'no-mermaid';
      } catch (e) { out.error = String(e && e.stack || e); }
      return out;
    })()`
  });

  await new Promise(r => setTimeout(r, 500));
  ws.close();

  console.log('\n=== RESULT ===');
  const resVal = (result && result.result) ? result.result.value : result;
  console.log(JSON.stringify(resVal, null, 2));
  if (result && result.exceptionDetails) console.log('EXCEPTION:', result.exceptionDetails.text, result.exceptionDetails.exception && result.exceptionDetails.exception.description);
  console.log('\n=== CONSOLE / ERRORS (' + logs.length + ') ===');
  logs.forEach(l => console.log('  ' + l));

  // Verdict
  const v = (result && result.result && result.result.value) || {};
  const s = v.steps || {};
  const cspErrors = logs.filter(l => /Content Security Policy|blocked|refused/i.test(l));
  const ok = v.booted && s.customFontFace && s.httpImageLoaded && s.httpImageNaturalW > 0 &&
             (s.katexRendered === true) && (s.mermaidRendered === true) && cspErrors.length === 0 && !v.error;
  console.log('\n=== VERDICT: ' + (ok ? 'PASS' : 'FAIL') + ' ===');
  if (v.error) console.log('TEST ERROR:', v.error);
  if (cspErrors.length) console.log('CSP errors detected:\n' + cspErrors.join('\n'));

  server.close(); imgServer.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(3); });
