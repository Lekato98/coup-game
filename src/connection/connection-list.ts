import {Connection, ConnectionId} from '.';

class ConnectionList {
    private list: Map<ConnectionId, Connection>

    constructor() {
        this.list = new Map<ConnectionId, Connection>();
    }

    public get(connectionId: ConnectionId) {
        return this.list.get(connectionId);
    }

    public set(connectionId: ConnectionId, connection: Connection) {
        this.list.set(connectionId, connection);
    }
}

export {
    ConnectionList
}