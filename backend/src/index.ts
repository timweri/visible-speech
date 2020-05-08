import "./config/module-alias";
import config from "@config/config";
import createLogger from "@config/logger";
import express from "express";
import http from "http";
import socketIo from "socket.io";

const logger = createLogger(module);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(config.connection.port, () => {
    logger.info(`Listening on port ${config.connection.port}`);
});
