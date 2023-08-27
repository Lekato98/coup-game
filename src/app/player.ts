import {User, UserId} from './user.ts';

class Player extends User {
    constructor(id: UserId) {
        super(id);
    }
}

export {
    Player
}