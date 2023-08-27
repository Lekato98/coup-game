import {Connection, ConnectionId, ConnectionSchema} from './connection.ts';
import {ClientToServerEvent} from './client-to-server-event.ts';
import {EventEmitter} from 'events';
import {Message} from '../app/game-manager.ts';

type ConnectionList = Map<ConnectionId, Connection>;

// @TODO add interface for ConnectionManager, then create class for FpsConnectionManager that implements ConnectionManager
// @TODO maybe change ConnectionSchema to Serializable interface
class FpsConnectionManager<Schema extends ConnectionSchema> {
    constructor(private readonly connectionList: ConnectionList, private readonly eventManager: EventEmitter) {
        // @TODO create interface StateGetter where GameManager implements it, pass this object to connection manager ...
        // connection manger should call getState method every frame and send latest state for all returned user ids
        // @TODO init fps based emitter which will
        this.setupInterval();
    }

    public add(connection: Connection) {
        // broadcast connection events to game manager
        connection.on(ClientToServerEvent.ALL, this.emit.bind(this));
        this.connectionList.set(connection.getId(), connection);
        console.log('Added to connection list', connection.getId());
    }

    public get(connectionId: ConnectionId) {
        return this.connectionList.get(connectionId);
    }

    // @TODO setup interval method which will call emit methods for each connection
    public setupInterval() {
        // @TODO remove the below used for testing only
        setInterval(() => this.connectionList.forEach(connection => connection.send('anything')), 2000)
    }
    public emit(connectionId: ConnectionId, ...args: any) {
        // @TODO pass payload to parser/serializer and implement interface for payload parsing
        const actionPayload = new Message(args)
        // broadcast event to eventManager which will emit event to gameManager
        this.eventManager.emit(ClientToServerEvent.ACTION, actionPayload);
    }
}

export {
    FpsConnectionManager
}