import {UserId} from '../user';
import {ServerToClientEvent} from '../event';

type ConnectionId = string;

type ConnectionPayload = any;

interface Connection {
    send(event: ServerToClientEvent, payload: ConnectionPayload): void;

    getId(): ConnectionId;

    getUserId(): UserId;

    onAny(cb: (...args: any[]) => void): void;
}

export {
    Connection,
    ConnectionId,
    ConnectionPayload
}