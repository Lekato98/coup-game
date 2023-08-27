import express from 'express';
import {Server as IOServer} from 'socket.io';
import {createServer as createHttpServer} from 'http';
import config from './config';
import {EventEmitter} from 'events';
import {FpsConnectionManager} from './socket/fps-connection-manager.ts';
import {Connection, ConnectionId} from './socket/connection.ts';
import {GameManager} from './app/game-manager.ts';
import {ClientToServerEvent} from './socket/client-to-server-event.ts';
import {SocketManager} from './socket';

const app = express();
const httpServer = createHttpServer(app);
const ioServer = new IOServer(httpServer);

app.get('/', (req, res) => {
    res.status(201).json({message: 'accepted'})
})

// bootstrap sample, you can test over postman by navigating to [postman -> new -> socket.io]
const eventEmitter = new EventEmitter();
const gameManager = new GameManager();
eventEmitter.on(ClientToServerEvent.ACTION, gameManager.action.bind(gameManager));
const connectionList = new Map<ConnectionId, Connection>();
const connectionManager = new FpsConnectionManager(connectionList, eventEmitter)
const socketManager = new SocketManager(ioServer, connectionManager);

httpServer.listen(config.port, () => console.log('Server started @ port', config.port));
