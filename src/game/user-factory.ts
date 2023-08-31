import {User, UserId, Role, Player, Spectator} from '.';

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