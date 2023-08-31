import {User, type UserId} from '.';

// @ts-ignore
class Spectator extends User {
    constructor(id: UserId) {
        super(id);
    }
}

export {
    Spectator
}