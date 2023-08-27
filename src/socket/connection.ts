import {ClientToServerEvent} from './client-to-server-event.ts';

type ConnectionId = string;

class ConnectionSchema {
}

interface Connection {
    send(payload: ConnectionSchema): void;
    getId(): ConnectionId;
    on(event: ClientToServerEvent, cb: (...args: any[]) => void): void;
}

export {
    Connection,
    ConnectionId,
    ConnectionSchema
}