export default class RoomError extends Error {
    status: string;
    
    constructor (status: string) {
        super(status);
        this.name = this.constructor.name;
        this.status = status;
    }

    statusCode() {
        return this.status;
    }
}
