const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use("peerjs", peerServer);

app.get('', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});
