import config from "@config/config";
import createLogger from "@config/logger";
import io from "socket.io-client";

const logger = createLogger(module);

const socket = io(
    `${config.server.host}:${config.server.port}${config.server.apiPath}`,
    {
        path: config.server.roomSocketPath,
    },
)

socket.on('connect', () => {
    logger.info("Successfully connected to server");
});
