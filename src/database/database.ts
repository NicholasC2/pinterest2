import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

export class Account {
    username: string;
    passwordHash: string;
    profile: Profile;
    createdAt: number;

    constructor(
        username: string,
        passwordHash: string,
        profile: Profile,
        createdAt: number
    ) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.profile = profile;
        this.createdAt = createdAt;
    }
}

export class Profile {
    profileImageURL?: string;

    constructor(profileImageURL: string) {
        this.profileImageURL = profileImageURL;
    }
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
    tags: string[];
}

const adapter = new JSONFileSync<StoreData>('./db.json')
const db = new LowSync(adapter, {accounts: [], sessions: [], images: [], tags: []});

db.read()
db.data.tags = ["test", "test2", "test3"]
db.write()

export default db;