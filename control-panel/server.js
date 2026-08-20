const http = require('node:http');
const { execFile } = require('node:child_process');

function kubectl(args, callback) {
  execFile('kubectl', ['-n', 'deployment-engine', ...args], (error, stdout, stderr) => {
    if (error) return callback(error, stderr || error.message);
    callback(null, stdout.trim());
  });
}

const page = `<!doctype html><html><head><meta charset="utf-8"><title>Deployment Control</title>
<style>body{font:18px sans-serif;max-width:600px;margin:50px auto}button{padding:14px 24px;margin:8px;font-size:17px}.status{padding:15px;background:#eee;margin:15px 0}</style></head>
<body><h1>Zero-Downtime Deployment</h1><div class="status" id="status">Loading...</div>
<button onclick="change('green')">Update → v2</button><button onclick="change('blue')">Rollback → v1</button>
<script>async function status(){let r=await fetch('/status');document.querySelector('#status').textContent='Active version: '+await r.text()}async function change(c){let r=await fetch('/switch/'+c,{method:'POST'});alert(await r.text());status()}status()</script></body></html>`;

http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') { res.writeHead(200, {'content-type':'text/html'}); return res.end(page); }
  if (req.url === '/status') return kubectl(['get','service','active','-o','jsonpath={.spec.selector.color}'], (e, out) => { res.writeHead(e ? 500 : 200); res.end(e ? out : out === 'green' ? 'v2 (green)' : 'v1 (blue)'); });
  const match = req.url.match(/^\/switch\/(blue|green)$/);
  if (req.method === 'POST' && match) {
    const color = match[1]; const patch = `{"spec":{"selector":{"app":"deployment-engine","color":"${color}"}}}`;
    return kubectl(['patch', 'service', 'active', '--type=merge', '-p', patch], (e) => {
  if (e) {
    res.writeHead(500);
    return res.end('Switch failed: ' + e.message);
  }

  execFile('sudo', ['systemctl', 'restart', 'deployment-active'], (restartError) => {
    res.writeHead(restartError ? 500 : 200);
    res.end(
      restartError
        ? 'Traffic switched, but port refresh failed: ' + restartError.message
        : `Traffic switched to ${color === 'green' ? 'v2' : 'v1'}`
    );
  });
});
  }
  res.writeHead(404); res.end('not found');
}).listen(process.env.CONTROL_PORT || 8081, '0.0.0.0', () => console.log('control panel on port 8081'));
