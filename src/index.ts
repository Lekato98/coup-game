import express from 'express';
import {Server as IOServer} from 'socket.io';
import {createServer as createHttpServer} from 'http';
import config from './config';
import {EventEmitter} from 'events';
import {ConnectionManager} from './connection';
import {GameManager} from './game';
import {SocketManager} from './connection';
import {EventManager} from './event';
import {DefaultEventManager} from './event';

async function bootstrap() {
    // Initiate http & connection server
    const app = express();
    const httpServer = createHttpServer(app);
    const ioServer = new IOServer(httpServer);

    // Build event manager
    const eventEmitter = new EventEmitter();
    const eventManager: EventManager = new DefaultEventManager(eventEmitter);

    // Build connection manager
    const connectionManager = new ConnectionManager(eventManager)

    // Build connection manager
    const socketManager = new SocketManager(ioServer, connectionManager);

    // Build game manager
    const gameManager = new GameManager(eventManager);

    httpServer.listen(config.port, () => console.log('Server started @ port', config.port));
}


void bootstrap()
