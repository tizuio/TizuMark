// Persistent test server: serves src/ with the exact CSP from tauri.conf.json,
// injects tauri-mock.js before app.js, and serves a plaintext-http test image.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PORT = 8080;
const IMG_PORT = 8081;
const CSP = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: http: https:; font-src 'self' data: blob:; media-src 'self' blob: https: data:; frame-src 'self'; connect-src 'self' ipc: tauri: http: https:; worker-src 'self' blob:";

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json', '.woff2':'font/woff2', '.ttf':'font/ttf', '.map':'application/json' };

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({ 'Access-Control-Allow-Origin': '*' }, headers || {}));
  res.end(body);
}
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  if (urlPath === '/index.html') {
    let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
    html = html.replace('<script src="app.js"></script>', '<script src="tauri-mock.js"></script>\n<script src="app.js"></script>');
    return send(res, 200, html, { 'Content-Type': 'text/html', 'Content-Security-Policy': CSP });
  }
  const filePath = path.join(SRC, urlPath);
  if (!filePath.startsWith(SRC) || !fs.existsSync(filePath)) return send(res, 404, 'not found: ' + urlPath);
  const ext = path.extname(filePath).toLowerCase();
  return send(res, 200, fs.readFileSync(filePath), { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Security-Policy': CSP });
});
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMBAQDJ/pLvAAAAAElFTkSuQmCC', 'base64');
const imgServer = http.createServer((req, res) => send(res, 200, PNG, { 'Content-Type': 'image/png' }));

server.listen(PORT, () => console.log('APP on http://127.0.0.1:' + PORT + ' (CSP applied)'));
imgServer.listen(IMG_PORT, () => console.log('IMG on http://127.0.0.1:' + IMG_PORT + '/test.png'));
