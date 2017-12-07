class AvatarService {
    constructor() {
        this._users = {};
    }

    getByName(userName) {
        if (!this._users[userName]) {
            this._users[userName] = `https://unsplash.it/200/200/?random=${Math.random() * 1000}`;
        }

        return this._users[userName];
    }
}

export const avatarService = new AvatarService();
