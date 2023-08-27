import {User, UserId} from './user.ts';
import {Role} from './role.ts';
import {Player} from './player.ts';

class UserFactory {
    public getUser(userId: UserId, role: Role): User {
        switch (role) {
            case Role.PLAYER:
                return new Player(userId);
            case Role.SPECTATOR:
            default:
                // @TODO
                throw new Error('');
        }
    }
}