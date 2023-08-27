import {Connection, ConnectionId, ConnectionSchema} from './connection.ts';
import {Socket} from 'socket.io';
import {ClientToServerEvent} from './client-to-server-event.ts';

class SocketIoConnection implements Connection {
    constructor(private readonly id: ConnectionId, private readonly socket: Socket) {
    }

    send(payload: ConnectionSchema): void {
        this.socket.emit('event', payload);
    }

    getId(): ConnectionId {
        return this.id;
    }

    on(event: ClientToServerEvent, cb: (...args: any[]) => void): void {
        this.socket.on(event, (...args) => cb(this.id, ...args));
    }
}

export {
    SocketIoConnection
}