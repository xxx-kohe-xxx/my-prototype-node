const http = require('http');

const server = http.createServer(
  (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write('<!DOCTYPE html><html lang="jp">');
    response.write('<head><meta charset="utf-8">');
    response.write('<title>Hello Node.js!</title></head>');
    response.write('<body><h1>Hello Node.js</h1>');
    response.write('<p>this is node.js sample page.</p>');
    response.write('<p>これはNode.jsのサンプルページです。</p>');
    response.write('</body></html>');
    response.end();
  }
);

server.listen(3000);
console.log('Server Start!');