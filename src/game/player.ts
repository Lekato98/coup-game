import {User, UserId} from '.';

class Player extends User {
    constructor(id: UserId) {
        super(id);
    }
}

export {
    Player
}