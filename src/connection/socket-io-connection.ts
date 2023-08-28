import {Connection, ConnectionId, ConnectionPayload} from './connection.ts';
import {Socket} from 'socket.io';
import {UserId} from '../user';
import {ClientToServerEvent, ServerToClientEvent} from '../event';

class SocketIoConnection implements Connection {
    constructor(private readonly userId: UserId, private readonly socket: Socket) {
    }

    public send(event: ServerToClientEvent, payload: ConnectionPayload) {
        this.socket.emit(event, payload);
    }

    public getId(): ConnectionId {
        return this.socket.id;
    }

    public getUserId(): UserId {
        return this.userId;
    }

    public onAny(cb: (...args: any[]) => void) {
        console.info(`Received ${ClientToServerEvent.ANY} event`);
        this.socket.onAny((event, ...args) => cb(event, this.getId(), this.getUserId(), ...args));
    }
}

export {
    SocketIoConnection
}