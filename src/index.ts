import express from 'express';
import {Server as IOServer} from 'socket.io';
import {createServer as createHttpServer} from 'http';
import {EventEmitter} from 'events';
import config from './config';
import {ConnectionManager} from './connection';
import {SocketManager} from './socket-connection';
import {GameManager} from './game';
import {DefaultEventManager} from './event';

async function bootstrap() {
    // Initialize express app
    const app = express();

    // Create http server connection with express app
    const httpServer = createHttpServer(app);

    // Create Socket IO Server over the http server
    const ioServer = new IOServer(httpServer);

    // Build event manager
    const eventEmitter = new EventEmitter();
    const eventManager = new DefaultEventManager(eventEmitter);

    // Build connection manager
    const connectionManager = new ConnectionManager(eventManager)

    // Build game manager
    const gamaManager = new GameManager(eventManager);

    // Build socket-connection manager
    const socketManager = new SocketManager(ioServer, connectionManager);

    // Start listening to http server
    httpServer.listen(config.port, () => console.log('Server started @ port', config.port));
}

void bootstrap();
