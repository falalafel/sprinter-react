class Auth {
    constructor() {
        this.authenticated = false;
        this.user = null;
    }

    login(user) {
        this.authenticated = true;
        this.user = user;
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
  