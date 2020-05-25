import "./config/module-alias";
import config from "@config/config";
import createLogger from "@config/logger";
import io from "socket.io-client";
import prompts from "prompts";

const logger = createLogger(module);

logger.info("Starting client code");

async function harness() {
    function expectNArguments(n: number, array: string[]): Boolean {
        if (array.length - 1 < n) {
            logger.warn('1 argument expected');
            return true;
        }
        return false;
    }

    while(true) {
        let response = await prompts({
            name: 'command',
            type: 'text',
            message: '>',
        });

        if (response === undefined || response.command === undefined) continue;
        const commandParts = response.command.split(' ');

        if (commandParts.length <= 0) continue;

        switch (commandParts[0]) {
            case 'join':
                if (expectNArguments(1, commandParts)) continue;
                logger.info(`socket.emit('join_room', ${commandParts[1]})`);
                socket.emit('join_room', commandParts[1]);
                break;
            case 'create':
                logger.info(`socket.emit('create_room')`);
                socket.emit('create_room');
                break;
            case 'leave':
                logger.info(`socket.emit('leave_room')`)
                socket.emit('leave_room');
                break;
            case 'message':
                commandParts.shift();
                const message = commandParts.join(' ');
                logger.info(`socket.emit('message', ${message})`)
                socket.emit('message', message);
                break;
            case 'exit':
                socket.close();
                process.exit();
            default:
                logger.info(`Command not supported: ${commandParts[0]}`);
        }
    }
}

function connect(): SocketIOClient.Socket {
    const socket = io.connect("http://vispeech-backend-dev:3456/room");

    socket.on('connect', async () => {
        logger.info("Successfully connected to server");
        harness();
    });

    socket.on('already_in_room', () => {
        logger.warn('Cannot join more than one room');
    });

    socket.on('not_in_room',() => {
        logger.warn('Not in any room');
    });

    socket.on('too_many_rooms', () => {
        logger.warn('Unable to create more room');
    });

    socket.on('room_invalid_id', (roomId: string) => {
        logger.warn(`Invalid room ID: ${roomId}`);
    });

    socket.on('room_full', (roomId: string) => {
        logger.warn(`Room ${roomId} is full`);
    });

    socket.on('room_not_found', (roomId: string) => {
        logger.warn(`Room ${roomId} not found`);
    });

    socket.on('room_joined', (roomId: string) => {
        logger.info(`Joined room ${roomId} successfully`);
    });

    socket.on('room_created', (roomId: string) => {
        logger.info(`Room ${roomId} created`);
    });

    socket.on('room_left', (roomId: string) => {
        logger.info(`Left room ${roomId}`);
    });

    socket.on('disconnect', () => {
        logger.warn('Disconnected from server');
        socket.close();
        process.exit();
    });

    setTimeout(() => {
        if (!socket.connected) {
            logger.warn('Server connection timed out');
            process.exit();
        }
    }, 5000);
    
    return socket;
}

const socket = connect();
