import {User, UserId} from './user.ts';
import {Role} from './role.ts';
import {Player} from './player.ts';
import {Spectator} from './spectator.ts';

class UserFactory {
    public getUser(userId: UserId, role: Role): User {
        switch (role) {
            case Role.PLAYER:
                return new Player(userId);
            case Role.SPECTATOR:
                return new Spectator(userId);
            default:
                // @TODO
                throw new Error('');
        }
    }
}

export {
    UserFactory
}