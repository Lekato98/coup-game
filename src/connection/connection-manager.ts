import {ClientToServerEvent, EventManager} from '../event';
import {UserId} from '../user';
import {Connection, ConnectionId} from './connection.ts';
import {ConnectionList} from './connection-list.ts';
import {ServiceEvent} from '../event/service-event.ts';

type UserToConnectionIdMapper = Map<UserId, ConnectionId>;

class ConnectionManager {
    private readonly connectionList: ConnectionList;
    private readonly userToConnectionIdMapper: UserToConnectionIdMapper;

    constructor(private readonly eventManager: EventManager) {
        this.connectionList = new ConnectionList();
        this.userToConnectionIdMapper = new Map<UserId, ConnectionId>();
        this.eventManager.on(ServiceEvent.SEND_MESSAGE_TO_CLIENT, this.send.bind(this));
    }

    public add(connection: Connection) {
        // extract required information
        const connectionId: ConnectionId = connection.getId();
        const userId: UserId = connection.getUserId();

        console.info(`[${ConnectionManager.name}] Adding ${connectionId}/${userId} to connection list`);

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
     * @param connectionId
     * @param userId
     * @param args
     */
    public emit(event: ClientToServerEvent, connectionId: ConnectionId, userId: UserId, ...args: any) {
        console.info(`[${ConnectionManager.name}] Received [${connectionId}/${userId}/${event}] event`);

        // @TODO create ClientToServerEvent to ServiceEvent mapper class to handle this logic
        const serviceEvent = ServiceEvent.GAME_ACTION;
        console.debug(`[ClientToServerEventToServiceEventMapper] Mapped ${event} event to ${serviceEvent} service-event`);

        console.info(`[${ConnectionManager.name}] Broadcasting [${connectionId}/${userId}/${event}] event to event-manager`);
        this.eventManager.emit(serviceEvent, userId, event, ...args);
    }

    /**
     * Sending event means that we're sending a message from service level to client
     * @param userId
     * @param args
     */
    public send(userId: UserId, ...args: any) {
        try {
            console.debug(userId, args);
            const connectionId = this.userToConnectionIdMapper.get(userId)!!;
            const connection = this.connectionList.get(connectionId)!!;
            connection.send(args);
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