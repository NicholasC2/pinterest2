import { AccountOptions } from "./accountOptions";
import * as argon2 from "argon2";

export class Account {
    username: string;
    passwordHash: string;
    accountOptions: AccountOptions;

    constructor(
        username: string,
        passwordHash: string,
        accountOptions: AccountOptions
    ) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.accountOptions = accountOptions;
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