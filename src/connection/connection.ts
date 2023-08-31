import {UserId} from '../user';

type ConnectionId = string;
type ConnectionPayload = any;
type Listener = (...args: any[]) => void;

interface Connection {
    send(payload: ConnectionPayload): void;

    getId(): ConnectionId;

    getUserId(): UserId;

    onAny(listener: Listener): void;
}

export {
    Connection,
    ConnectionId,
    ConnectionPayload
}