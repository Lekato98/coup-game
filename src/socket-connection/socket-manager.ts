import {Server, Socket} from 'socket.io';
import {SocketIoConnection} from '.';
import {UserId} from '../user';
import {Connection, ConnectionManager} from '../connection';

enum ServerEvents {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    DISCONNECTING = 'disconnecting',
}

class SocketManager {
    public constructor(private ioServer: Server, private connectionManager: ConnectionManager) {
        this.ioServer.on(ServerEvents.CONNECTION, this.connectionHandler.bind(this));
        this.ioServer.on(ServerEvents.DISCONNECT, this.disconnectHandler.bind(this));
        this.ioServer.on(ServerEvents.DISCONNECTING, this.disconnectingHandler.bind(this));
    }

    private connectionHandler(ioClient: Socket) {
        // @TODO get userId from connection or from header-jwt
        const userId: UserId = ioClient.id;
        const connection: Connection = new SocketIoConnection("userId", ioClient);
        this.connectionManager.add(connection);
    }

    private disconnectHandler(ioClient: Socket) {
    }

    private disconnectingHandler(ioClient: Socket) {
    }
}

export {
    SocketManager,
    ServerEvents,
};
