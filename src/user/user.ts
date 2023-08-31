type UserId = string;

class User {
    constructor(private readonly id: UserId) {
    }

    public getId() {
        return this.id;
    }
}

export {
    User,
    UserId
}