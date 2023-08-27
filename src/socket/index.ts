import {Server, Socket} from 'socket.io';
import {Connection, ConnectionId} from './connection.ts';
import {SocketIoConnection} from './socket-io-connection.ts';
import {FpsConnectionManager} from './fps-connection-manager.ts';

enum ServerEvents {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    DISCONNECTING = 'disconnecting',
}



class SocketManager {
    public constructor(private ioServer: Server, private connectionManager: FpsConnectionManager<any>) {
        this.ioServer.on(ServerEvents.CONNECTION, this.connectionHandler.bind(this));
        this.ioServer.on(ServerEvents.DISCONNECT, this.disconnectHandler.bind(this));
        this.ioServer.on(ServerEvents.DISCONNECTING, this.disconnectingHandler.bind(this));
    }

    private connectionHandler(ioClient: Socket) {
        const connection: Connection = new SocketIoConnection(ioClient.id, ioClient);
        this.connectionManager.add(connection);
    }

    private disconnectHandler(ioClient: Socket) {

    }

    private disconnectingHandler(ioClient: Socket)  {

    }
}

export {
    SocketManager,
    ServerEvents,
};
