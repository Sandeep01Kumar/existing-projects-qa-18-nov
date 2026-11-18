const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

// setHeader, not res.set: Express appends "; charset=utf-8" through res.set, and the contract is the bare text/plain.
const app = express()
  .get('/', (req, res) => res.setHeader('Content-Type', 'text/plain').end('Hello, World!\n'))
  .get('/good-evening', (req, res) => res.setHeader('Content-Type', 'text/plain').end('Good evening\n'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
