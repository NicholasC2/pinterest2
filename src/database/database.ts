import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import * as argon2 from "argon2";

export class Account {
    username: string;
    passwordHash: string;
    accountOptions: Object;
    createdAt: number;

    constructor(
        username: string,
        passwordHash: string,
        accountOptions: Object,
        createdAt: number
    ) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.accountOptions = accountOptions;
        this.createdAt = createdAt;
    }
}

export async function checkPassword(account: Account, password: string): Promise<boolean> {
    return argon2.verify(account.passwordHash, password);
}

export async function  setPassword(account: Account, password: string): Promise<void> {
    account.passwordHash = await argon2.hash(password, {
        type: argon2.argon2id
    });
}

export class Session {
    id: string;
    createdAt: number;
    username: string;

    constructor(id: string, createdAt: number, username: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.username = username;
    }
}

export class ImageStore {
    id: string;
    username: string;
    title: string;
    description: string;
    tags: string[];
    imageURL: string;
    createdAt: number;
    
    constructor(id: string, username: string, title: string, description: string, tags: string[], imageURL: string, createdAt: number) {
        this.id = id;
        this.username = username;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.imageURL = imageURL;
        this.createdAt = createdAt;
    }
}

type StoreData = {
    accounts: Account[];
    sessions: Session[];

    images: ImageStore[];
}

const adapter = new JSONFileSync<StoreData>('db.json')
const db = new LowSync(adapter, {accounts: [], sessions: [], images: []});

export default db;