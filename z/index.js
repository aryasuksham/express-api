const express = require('express');
const app = express();
const WebSocket = require('ws');
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => {
    console.log('A new client connected!');
    ws.send("Welcome new client")

    ws.on('message', (message) => {
        console.log(`Recieved a message:%s `, message);
        // ws.send(`Got your message. It says: `+message)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    })
})

app.get('/', (req, res) => {
    res.send("Hello there...")
})

server.listen(4000, () => {
    console.log("Server is listening on port 3000");
})