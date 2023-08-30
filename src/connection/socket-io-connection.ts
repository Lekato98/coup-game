import {Socket} from 'socket.io';
import {UserId} from '../user';
import {ClientToServerEvent, ServerToClientEvent} from '../event';
import {Connection, ConnectionId, ConnectionPayload} from './connection.ts';
import {ServiceEvent} from '../event/service-event.ts';

class SocketIoConnection implements Connection {
    constructor(private readonly userId: UserId, private readonly socket: Socket) {
        console.info(`[${SocketIoConnection.name}] Connection constructed for userId: ${userId}`);
    }

    public send(payload: ConnectionPayload) {
        this.socket.send(payload);
    }

    public getId(): ConnectionId {
        return this.socket.id;
    }

    public getUserId(): UserId {
        return this.userId;
    }

    public onAny(cb: (...args: any[]) => void) {
        console.info(`[${SocketIoConnection.name}#${this.getId()}/${this.getUserId()}] Initializing [${ClientToServerEvent.ANY}] event`);
        // @TODO check why socket.io attach and extra arg [a function being added] at the end of the args
        this.socket.onAny((event, ...args) => cb(event, this.getId(), this.getUserId(), ...args));
        console.info(`[${SocketIoConnection.name}#${this.getId()}/${this.getUserId()}] Is now listening to [${ClientToServerEvent.ANY}] event`);
    }
}

export {
    SocketIoConnection
}