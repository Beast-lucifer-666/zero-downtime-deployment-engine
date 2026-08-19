const http = require('node:http');
const version = process.env.APP_VERSION || 'v1';
let requests = 0;
let errors = 0;

const server = http.createServer((req, res) => {
  requests++;
  if (req.url === '/health' || req.url === '/ready') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', version }));
  }
  if (req.url === '/metrics') {
    res.writeHead(200, { 'content-type': 'text/plain; version=0.0.4' });
    return res.end(`deployment_requests_total ${requests}\ndeployment_errors_total ${errors}\n`);
  }
  if (req.url === '/fail') { errors++; res.writeHead(500); return res.end('intentional failure'); }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'zero-downtime deployment engine', version }));
});

server.listen(process.env.PORT || 8080, '0.0.0.0', () => console.log(`service ${version} listening`));
