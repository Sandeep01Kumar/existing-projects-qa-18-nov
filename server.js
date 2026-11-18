const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express()
  .get('/', (req, res) => res.setHeader('Content-Type', 'text/plain').end('Hello, World!\n'))
  .get('/good-evening', (req, res) => res.setHeader('Content-Type', 'text/plain').end('Good evening\n'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
