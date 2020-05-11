import createLogger from "@config/logger";
import socketIo from "socket.io";

const logger = createLogger(module);

export default (io: socketIo.Server) => {
    const room = io.of('/room').on('connection', (socket) => {
        socket.emit('message', 'Connected');
        logger.info(`${socket.id} connected to /room`);
        socket.on('join', (roomId) => {
            socket.join(roomId);
            socket.emit('message', `Joined room ${roomId}`);
            logger.info(`${socket.id} joined room ${roomId}`);
        });
        socket.on('disconnect', () => {
            logger.info(`${socket.id} disconnected from /room`);
        });
    })
    logger.info('Initialized SocketIO room handler');
};