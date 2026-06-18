import { NextFunction, Request, Response } from "express"
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer, MessageToServerType } from "./apiTypes"
import db, { Account, Session } from "./database/database"
import { argon2Verify } from "hash-wasm";

async function handleServerMessage(message: MessageToServer): Promise<MessageToClient> {
    db.read();

    function createSession(username: string): Session {
        let ssid = crypto.randomUUID();

        while(db.data.sessions.find(s => s.id === ssid)) {
            ssid = crypto.randomUUID();
        }

        return new Session(ssid, Date.now(), username);
    }

    switch(message.type) {
        case MessageToServerType.ACCOUNT_CHECK_USERNAME: {
            const { username } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            return {
                type: MessageToClientType.SUCCESS,
                data: account !== undefined
            }
        }

        case MessageToServerType.ACCOUNT_CREATE: {
            const { username, passwordHash, profile } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            if(account) {
                return {
                    type: MessageToClientType.FAIL,
                    data: ErrorToClientType.ACCOUNT_EXISTS
                }
            }

            const newAccount = new Account(username, passwordHash, profile, Date.now());

            db.data.accounts.push(newAccount);

            return {
                type: MessageToClientType.SUCCESS,
                data: createSession(username)
            }
        }

        case MessageToServerType.ACCOUNT_LOGIN: {
            const { username, password } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            if(!account) {
                return {
                    type: MessageToClientType.FAIL,
                    data: ErrorToClientType.ACCOUNT_DOESNT_EXIST
                }
            }

            if(await argon2Verify({
                password: password,
                hash: account.passwordHash
            })) {
                return {
                    type: MessageToClientType.SUCCESS,
                    data: createSession(username)
                }
            } else {
                return {
                    type: MessageToClientType.FAIL,
                    data: ErrorToClientType.ACCOUNT_PASSWORD_INVALID
                }
            }
        }

        default: {
            return {
                type: MessageToClientType.FAIL,
                data: ErrorToClientType.INTERNAL_ERROR
            }
        }
    }

    db.write();
}

export default async function(req: Request, res: Response, next: NextFunction) {
    if(req.url.startsWith("/api") && req.method === "POST") {
        const response = await handleServerMessage({
            type: req.body.type ?? 0,
            data: req.body.data ?? {},
        })

        res.setHeader("content-type", "application/json")
        res.end(JSON.stringify(response, null, 4));
    } else if(req.url.startsWith("/api")) {
        res.end({version: 0.1});
    } else {
        next();
    }
}