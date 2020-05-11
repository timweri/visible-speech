import "./config/module-alias";
import config from "@config/config";
import createLogger from "@config/logger";
import express from "express";
import http from "http";
import socketIoServer from "socket.io";
import setUpRoomSocket from "@sockets/room";

import mainRouter from "@routes/main";

const logger = createLogger(module);

const app = express();
const server = http.createServer(app);
const io = socketIoServer(server);

app.use('/api/v1', mainRouter);

setUpRoomSocket(io);

server.listen(config.connection.port, () => {
    logger.info(`Listening on port ${config.connection.port}`);
});
