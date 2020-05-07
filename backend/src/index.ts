import config from "config/config";
import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(config.connection.port, () => {
    
});
