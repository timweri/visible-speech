import "./config/module-alias";
import config from "@config/config";
import createLogger from "@config/logger";
import io from "socket.io-client";

const logger = createLogger(module);

logger.info("Starting client code");

const socket = io.connect("http://vispeech-backend-dev:3456/room");

socket.on('connect', () => {
    logger.info("Successfully connected to server");
});

socket.emit('join', '1234');
