export class Account {
    name: string;
    passwordHash: string;
    createdAt: Date;

    constructor(name: string, passwordHash: string, createdAt: Date) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }
}