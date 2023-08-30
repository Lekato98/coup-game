import {User, UserId} from '../user';
import {EventManager} from '../event';
import {Game} from './game.ts';
import {Role} from './role.ts';
import {ServiceEvent} from '../event/service-event.ts';

class Message<BodySchema> {
    public userId: UserId;
    public gameId: GameId;
    public body: BodySchema;

    // @TODO update args
    constructor(...args: any) {
        console.debug(`Message`, ...args);
        this.userId = args[0];
        this.gameId = args[1];
        this.body = args[2];
    }
}

type GameList = Map<GameId, Game>;
type UserList = Map<UserId, User>;
type GameId = string;
// @TODO check if we need to add proxy event handler for the game manager, which will also handle message parsing for GAME_ACTION event
class GameManager {
    constructor(private eventManager: EventManager) {
        // @TODO in case there are no games listed remove the listener, once a new game gets created re-listen to the event back
        this.eventManager.on(ServiceEvent.GAME_ACTION, this.action.bind(this));
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

    public emit(gameId: GameId) {
        // @TODO loop over all active games and send game state
        this.eventManager.emit(ServiceEvent.SEND_MESSAGE_TO_CLIENT, "userId", {
            round: 1,
            cards: [1, 2, 3]
        });
    }

    public action(userId: UserId, ...args: any[]) {
        console.info('Received action with args', userId, ...args);
        this.emit("gameId");
    }
}

export {
    GameManager,
    Message
}