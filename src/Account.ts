export class Account {
    name: string;
    passwordHash: string;

    constructor(name: string, passwordHash: string) {
        this.name = name;
        this.passwordHash = passwordHash;
    }
}