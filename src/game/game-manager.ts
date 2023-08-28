import {Game} from './game.ts';
import {User, UserId} from '../user';
import {Role} from './role.ts';
import {ClientToServerEvent, EventManager, ServerToClientEvent} from '../event';

class Message<BodySchema> {
    public userId: UserId;
    public gameId: GameId;
    public body: BodySchema;

    // @TODO update args
    constructor(...args: any) {
        this.userId = args[0];
        this.gameId = args[1];
        this.body = args[2];
    }
}

type GameList = Map<GameId, Game>;
type UserList = Map<UserId, User>;
type GameId = string;

class GameManager {
    constructor(private eventManager: EventManager) {
        this.eventManager.on(ClientToServerEvent.GAME_ACTION, this.action.bind(this));
    }

    public create(userId: UserId) {
        // validate ...
        // user can join one game at a time only
        // reserve place for the player
        // @TODO const gameId = crypto.randomUUID()
    }

    public join(userId: UserId, gameId: GameId, role: Role) {
    }

    public leave(userId: UserId) {
    }

    public send(gameId: GameId) {
        this.eventManager.emit(ServerToClientEvent.GAME_MESSAGE,)
    }

    public action(message: Message<any>) {
        console.info('Received action with message', message);
    }
}

export {
    GameManager,
    Message
}