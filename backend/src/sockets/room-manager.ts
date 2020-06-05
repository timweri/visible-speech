import createLogger from "@config/logger";
import config from "@config/config";
import RoomError from "@sockets/errors/room-error"; 

export default class RoomManager {
    private clientRoomMap: Map<string, string>;
    private roomClientsMap: Map<string, Set<string>>;
    private roomOwnerMap: Map<string, string>;
    private static roomIdRegexp: RegExp = new RegExp('^[A-Z]$');

    constructor() {
        this.clientRoomMap = new Map<string, string>();
        this.roomClientsMap = new Map<string, Set<string>>();
        this.roomOwnerMap = new Map<string, string>();
    }

    static validateRoomId(roomId: string, throwError: Boolean = false): Boolean {
        // Only allow 4 capital letter room codes for security reasons.
        const result = RoomManager.roomIdRegexp.test(roomId);
        if (result && throwError) throw new RoomError('INVALID_ROOM_ID');
        return result;
    }

    generateRoomId(): string {
        const included = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'.split('');

        // Since room count cap is small, this will terminate
        while (true) {
            let roomId = "";
            for (let i = 0; i < 4; ++i) {
                let index = Math.floor(Math.random() * Math.floor(included.length));
                roomId += included[index];
            }
            if (this.roomClientsMap.has(roomId)) continue;
            return roomId;
        }
    }

    createRoom(owner: string, roomId: string) {
        if (this.roomClientsMap.has(roomId)) throw new RoomError("ROOM_EXISTS");
        if (this.clientRoomMap.has(owner)) throw new RoomError("CLIENT_ALREADY_IN_ROOM");
        if (this.roomClientsMap.size >= config.maxRoom) return new RoomError("TOO_MANY_ROOMS");

        this.clientRoomMap.set(owner, roomId);
        this.roomClientsMap.set(roomId, new Set<string>([owner]));
        this.roomOwnerMap.set(roomId, owner);
    }

    joinRoom(client: string, roomId: string) {
        RoomManager.validateRoomId(roomId, true);

        if (this.clientRoomMap.has(client)) throw new RoomError("CLIENT_ALREADY_IN_ROOM");
        if (!this.roomClientsMap.has(roomId)) throw new RoomError("ROOM_NOT_EXISTS");

        const clients = this.roomClientsMap.get(roomId);
        if (clients === undefined ) throw Error('Expected array of clients');

        // Check if room is full
        if (clients.size >= config.roomCapacity) throw new RoomError("ROOM_FULL");

        // Add client to room
        clients.add(client);
        this.clientRoomMap.set(client, roomId);
    }

    leaveRoom(client: string): string {
        const roomId = this.clientRoomMap.get(client);
        if (roomId === undefined) throw new RoomError('NOT_IN_ROOM');

        const roomOwner = this.roomOwnerMap.get(roomId);
        if (roomOwner === undefined) throw Error('Room without an owner');

        if (roomOwner == client) {
            this.destroyRoom(roomId);    
        } else {
            const clients = this.roomClientsMap.get(roomId);
            if (clients === undefined) throw Error('Expected array of clients');
            clients.delete(client);
            this.clientRoomMap.delete(client);
        }
        return roomId;
    }

    destroyRoom(roomId: string) {
        RoomManager.validateRoomId(roomId, true);

        const clients = this.roomClientsMap.get(roomId);
        if (clients === undefined) throw Error('Expected array of clients');

        this.roomOwnerMap.delete(roomId);
        clients.forEach((value, index) => {
            this.clientRoomMap.delete(value);
        });
        this.roomClientsMap.delete(roomId);
    }

    getClientRoomId(client: string) {

    }

    roomCount() {
        return this.roomClientsMap.size;
    }

    clientCount() {
        return this.clientRoomMap.size;
    }
}
