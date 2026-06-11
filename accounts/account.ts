import * as argon2 from "argon2";
import { Session } from "./session";

export class Account {
    username: string;
    passwordHash: string;
    accountOptions: Object;

    sessions: Session[];

    constructor(
        username: string,
        passwordHash: string,
        accountOptions: Object,
        sessions: Session[]
    ) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.accountOptions = accountOptions;
        this.sessions = sessions;
    }

    async checkPassword(password: string): Promise<boolean> {
        return argon2.verify(this.passwordHash, password);
    }

    async setPassword(password: string): Promise<void> {
        this.passwordHash = await argon2.hash(password, {
            type: argon2.argon2id
        });
    }
}