#!/usr/bin/env node

const net = require('net');
const hexy = require('hexy');

const server = net.createServer();
server.on('connection', handleConnection);

server.listen(9000, () => {
  console.log('Server listening to %j', server.address())
});

function handleConnection(conn) {
  const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
  console.log(`> new client connection ${remoteAddress}`);

  conn.on('data', (data) => {
    console.log(`>> connection data from ${remoteAddress}`);
    console.log('---- RAW ----');
    console.log(hexy.hexy(data));
    console.log('---- MESSAGE ----');
    console.log(data.toString());
  });

  conn.once('close', () => {
    console.log(`< connection closed ${remoteAddress}`);
  });

  conn.on('error', (e) => {
    console.log(`!! connection error from ${remoteAddress}`, e);
  });
}
