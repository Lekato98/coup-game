import {Connection, ConnectionId} from './connection.ts';
import {ClientToServerEvent, EventManager, ServerToClientEvent} from '../event';
import {ConnectionList} from './connection-list.ts';
import {UserId} from '../user';

type UserToConnectionIdMapper = Map<UserId, ConnectionId>;

class ConnectionManager {
    private readonly connectionList: ConnectionList;
    private readonly userToConnectionIdMapper: UserToConnectionIdMapper;

    constructor(private readonly eventManager: EventManager) {
        this.connectionList = new ConnectionList();
        this.userToConnectionIdMapper = new Map<UserId, ConnectionId>();
    }

    public add(connection: Connection) {
        console.log('Adding to connection list', connection.getId());
        // extract required information
        const connectionId: ConnectionId = connection.getId();
        const userId: UserId = connection.getUserId();

        // attach user and connection
        this.connectionList.set(connectionId, connection);
        this.userToConnectionIdMapper.set(userId, connectionId);

        // start listening on connection events
        connection.onAny(this.emit.bind(this));
    }

    /**
     *
     * @param connectionId
     */
    public get(connectionId: ConnectionId) {
        return this.connectionList.get(connectionId);
    }

    /**
     * Emitting an event means that we're sending an event on the service level
     * @param event
     * @param userId
     * @param connectionId
     * @param args
     */
    public emit(event: ClientToServerEvent, userId: UserId, connectionId: ConnectionId, ...args: any) {
        console.info('Broadcasting events to all listeners');
        this.eventManager.emit(event, connectionId, args);
    }

    /**
     * Sending event means that we're sending an event from service level to client
     * @param event
     * @param userId
     * @param args
     */
    public send(event: ServerToClientEvent, userId: UserId, ...args: any) {
        try {
            const connectionId = this.userToConnectionIdMapper.get(userId)!!;
            const connection = this.connectionList.get(connectionId)!!;
            connection.send(event, args);
        } catch (e) {
            // @TODO create new Error class
            // @TODO check if it's retryable or not so we can handle retries in case of transient issue
            // decorate error message
            if (e instanceof Error) {
                e.message = `Sending message to client failed with errorMessage: ${e.message}`;
            }

            throw e;
        }
    }
}

export {
    ConnectionManager
}