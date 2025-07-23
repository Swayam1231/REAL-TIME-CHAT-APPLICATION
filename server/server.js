// /server/server.js
const WebSocket = require('ws');
const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on('connection', (ws) => {
  console.log('🟢 New client connected');

  clients.push(ws);

  ws.on('message', (message) => {
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
    clients = clients.filter((client) => client !== ws);
  });
});

console.log(`✅ WebSocket server is running on ws://localhost:${PORT}`);
