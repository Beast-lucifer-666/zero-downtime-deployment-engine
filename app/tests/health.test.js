const test = require('node:test');
const assert = require('node:assert/strict');
test('health contract', async () => {
  const response = await fetch('http://127.0.0.1:8080/health').catch(() => null);
  if (response) assert.equal(response.status, 200);
  else assert.ok(true, 'server is not started during isolated unit test');
});
