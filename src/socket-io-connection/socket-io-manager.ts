import {Server, Socket} from 'socket.io';
import {SocketIoConnection} from '.';
import {UserId} from '@user';
import {Connection, ConnectionManager} from '@connection';

enum SocketIoServerEvents {
    CONNECTION = 'connection',
}

class SocketIoManager {
    public constructor(private ioServer: Server, private connectionManager: ConnectionManager) {
        this.ioServer.on(SocketIoServerEvents.CONNECTION, this.connectionHandler.bind(this));
    }

    private connectionHandler(ioClient: Socket) {
        console.info(`[${SocketIoManager.name}] ${SocketIoServerEvents.CONNECTION} event`);
        // @TODO get userId from connection or from header-jwt
        const userId: UserId = ioClient.id;
        const connection: Connection = new SocketIoConnection("userId", ioClient);
        this.connectionManager.add(connection);
    }
}

export {
    SocketIoManager,
};
