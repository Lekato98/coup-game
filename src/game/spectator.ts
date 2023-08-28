import {User, UserId} from './user.ts';

class Spectator extends User {
    constructor(id: UserId) {
        super(id);
    }
}

export {
    Spectator
}