import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import * as argon2 from "argon2";

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

export class Session {
    id: string;
    createdAt: number;

    constructor(id: string, createdAt: number) {
        this.id = id;
        this.createdAt = createdAt;
    }
}

type StoreData = {
    accounts: Account[];
}

const adapter = new JSONFileSync<StoreData>('db.json')
const db = new LowSync(adapter, {accounts: []});

export default db;