import libsql from "@libsql/sqlite3";
import { Session } from "../accounts/session";
import { Account } from "../accounts/account";

export class Database {
    db: libsql.Database;

    private saveUserStmt!: libsql.Statement;
    private getUserStmt!: libsql.Statement;
    private deleteUserStmt!: libsql.Statement;
    
    private saveSettingStmt!: libsql.Statement;
    private getSettingsForUserStmt!: libsql.Statement;
    private deleteSettingStmt!: libsql.Statement;

    private saveSessionStmt!: libsql.Statement;
    private getSessionsForUserStmt!: libsql.Statement;
    private getSessionByIDStmt!: libsql.Statement;
    private deleteSessionStmt!: libsql.Statement;

    constructor(url: string) {
        this.db = new libsql.Database(url);
        this.db.exec("PRAGMA foreign_keys = ON;");

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                passwordHash TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL,
                createdAt NUMBER NOT NULL,
                FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS userSettings (
                username TEXT NOT NULL,
                settingKey TEXT NOT NULL,
                settingValue TEXT NOT NULL,
                PRIMARY KEY(username, settingKey),
                FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
            );
        `);

        this.prepareStatements();
    }

    private prepareStatements() {
        this.saveUserStmt = this.db.prepare(`
            INSERT INTO users (username, passwordHash) VALUES (?, ?)
            ON CONFLICT(username) DO UPDATE SET
                passwordHash = excluded.passwordHash
        `);
        this.getUserStmt = this.db.prepare("SELECT * FROM users WHERE username = ?");
        this.deleteUserStmt = this.db.prepare("DELETE FROM users WHERE username = ?");

        // Sessions
        this.saveSessionStmt = this.db.prepare(`
            INSERT INTO sessions (id, username, createdAt) VALUES (?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET username = excluded.username
        `);
        this.getSessionsForUserStmt = this.db.prepare("SELECT * FROM sessions WHERE username = ?");
        this.getSessionByIDStmt = this.db.prepare("SELECT * FROM sessions WHERE id = ?");
        this.deleteSessionStmt = this.db.prepare("DELETE FROM sessions WHERE id = ?");

        // User Settings
        this.saveSettingStmt = this.db.prepare(`
            INSERT INTO userSettings (username, settingKey, settingValue) VALUES (?, ?, ?)
            ON CONFLICT(username, settingKey) DO UPDATE SET settingValue = excluded.settingValue
        `);
        this.getSettingsForUserStmt = this.db.prepare("SELECT * FROM userSettings WHERE username = ?");
        this.deleteSettingStmt = this.db.prepare("DELETE FROM userSettings WHERE username = ? AND settingKey = ?");
    }

    /* --- Sessions --- */
    saveSession(session: Session, account: Account) { this.saveSessionStmt.run(session.id, account.username, session.createdAt); }
    getSessionsByUsername(username: string): Session[] {
        const rows = this.getSessionsForUserStmt.all(username) as unknown as any[];
        return rows.map(r => new Session(r.id, r.createdAt));
    }
    getSessionsByID(id: string): Session | null {
        const r = this.getSessionByIDStmt.get(id) as unknown as any;
        return r ? new Session(r.id, r.createdAt) : null;
    }
    deleteSession(sessionId: string) { this.deleteSessionStmt.run(sessionId); }

    /* --- Settings --- */

    saveSetting(account: Account, key: string, value: string) {
        this.saveSettingStmt.run(account.username, key, value);
    }
    getSettings(account: Account): Account | null {
        const r = this.getSettingsForUserStmt.get(account.username) as unknown as any;
        if (!r) return null;
        return r;
    }
    deleteSetting(account: Account, key: string) { this.deleteSettingStmt.run(account.username, key) }

    /* --- Users --- */
    saveUser(account: Account) {
        this.saveUserStmt.run(account.username, account.passwordHash);
        if (account.sessions) account.sessions.forEach((session)=>{
            this.saveSession(session, account);
        })
    }
    getUser(username: string): Account | null {
        const r = this.getUserStmt.get(username) as unknown as any;
        if (!r) return null;
        return new Account(r.username, r.passwordHash, {  }, this.getSessionsByUsername(username));
    }
    deleteUser(username: string) { this.deleteUserStmt.run(username); }
}