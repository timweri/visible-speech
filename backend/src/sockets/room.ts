import createLogger from "@config/logger";
import socketIo from "socket.io";
import RoomManager from "@sockets/room-manager";
import RoomError from "@sockets/errors/room-error";

const logger = createLogger(module);

export default (io: socketIo.Server) => {
    const roomManager = new RoomManager();

    const room = io.of('/room').on('connection', (socket) => {
        logger.info(`${socket.id} connected to /room`);

        socket.on('message', (message: string) => {
            room.emit('message', socket.id, message);
            logger.info(`${socket.id} said ${message}`);
        });

        socket.on('join_room', (roomId: string) => {
            try {
                roomManager.joinRoom(socket.id, roomId);
            } catch (e) {
                if (!(e instanceof RoomError)) throw e;
                switch (e.statusCode()) {
                    case "CLIENT_ALREADY_IN_ROOM":
                        socket.emit('already_in_room');
                        logger.info(`${socket.id} tried to join a second room: ${roomId}`);
                        return;
                    case "ROOM_NOT_EXISTS":
                        socket.emit('room_not_found', roomId);
                        logger.info(`${socket.id} tried to a non-existing room: ${roomId}`);
                        return;
                    case "ROOM_FULL":
                        socket.emit('room_full', roomId);
                        logger.info(`${socket.id} tried to join a full room: ${roomId}`);
                        return;
                    case "INVALID_ROOM_ID":
                        socket.emit('room_invalid_id', roomId);
                        logger.info(`${socket.id} tried to join room with invalid ID: ${roomId}`);
                        return;
                    default:
                        throw e; 
                }
            }
            
            socket.join(roomId);
            socket.emit('room_joined', roomId);
            room.emit('client_joined_room', socket.id, roomId);
            logger.info(`${socket.id} joined room ${roomId}`);
        });

        socket.on('leave_room', () => {
            let roomId: string;
            try {
                roomId = roomManager.leaveRoom(socket.id);
            } catch (e) {
                if (!(e instanceof RoomError)) throw e;
                switch (e.statusCode()) {
                    case "NOT_IN_ROOM":
                        socket.emit('not_in_room');
                        logger.info(`${socket.id} tried to leave room but not in any room`);
                        return;
                    default:
                        throw e;
                }
            }
            socket.leave(roomId);
            socket.emit('room_left', roomId);
            room.emit('client_left_room', socket.id, roomId);
            logger.info(`${socket.id} left room ${roomId}`);
        });

        socket.on('create_room', () => {
            let roomId = roomManager.generateRoomId();
            try {
                roomManager.createRoom(socket.id, roomId);
            } catch (e) {
                if (!(e instanceof RoomError)) throw e;
                switch (e.statusCode()) {
                    case "ROOM_EXISTS":
                        throw e;
                    case "CLIENT_ALREADY_IN_ROOM":
                        socket.emit('already_in_room');
                        logger.info(`${socket.id} is already in a room`);
                        return;
                    case "TOO_MANY_ROOMS":
                        socket.emit('too_many_rooms');
                        logger.info('Unable to create more rooms');
                        return;
                    default:
                        throw e;
                }
            }

            socket.join(roomId);
            socket.emit('room_created', roomId);
            logger.info(`${socket.id} created room ${roomId}`);
        });

        socket.on('disconnect', () => {
            let roomId: string;
            try {
                roomId = roomManager.leaveRoom(socket.id);
                socket.leave(roomId);
                socket.emit('room_left', roomId);
                room.emit('client_left_room', socket.id, roomId);
                logger.info(`${socket.id} left room ${roomId}`);
            } catch (e) {
                if (!(e instanceof RoomError)) throw e;
                switch (e.statusCode()) {
                    case "NOT_IN_ROOM":
                        break;
                    default:
                        throw e;
                }
            }
            logger.info(`${socket.id} disconnected from /room`);
        });
    })

    logger.info('Initialized SocketIO room handler');
};
