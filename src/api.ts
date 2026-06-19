import { NextFunction, Request, Response } from "express"
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer, MessageToServerType } from "./apiTypes"
import db, { Account, Session } from "./database/database"
import { argon2Verify } from "hash-wasm";

type LoginResult = {
    response: MessageToClient;
    session?: Session | null;
};

async function handleServerMessage(message: MessageToServer, session: Session | null): Promise<LoginResult> {
    function createSession(username: string): Session {
        let ssid = crypto.randomUUID();

        while(db.data.sessions.find(s => s.id === ssid)) {
            ssid = crypto.randomUUID();
        }

        const session = new Session(ssid, Date.now(), username);

        db.data.sessions.push(session);
        db.write();

        return session;
    }

    switch(message.type) {
        case MessageToServerType.ACCOUNT_CHECK_USERNAME: {
            const { username } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            return {
                response: {
                    type: MessageToClientType.SUCCESS,
                    data: account !== undefined
                }
            }
        }

        case MessageToServerType.ACCOUNT_CREATE: {
            const { username, passwordHash, profile } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            if(account) {
                return {
                    response: {
                        type: MessageToClientType.FAIL,
                        data: ErrorToClientType.ACCOUNT_EXISTS
                    }
                }
            }

            const newAccount = new Account(username, passwordHash, profile, Date.now());

            db.data.accounts.push(newAccount);
            db.write();

            return {
                response: {
                    type: MessageToClientType.SUCCESS
                },
                session: createSession(username)
            }
        }

        case MessageToServerType.ACCOUNT_LOGIN: {
            const { username, password } = message.data;

            const account = db.data.accounts.find(a => a.username === username);

            if(!account) {
                return {
                    response: {
                        type: MessageToClientType.FAIL,
                        data: ErrorToClientType.ACCOUNT_DOESNT_EXIST
                    }
                }
            }

            try {
                if(await argon2Verify({
                    hash: account.passwordHash,
                    password: password,
                })) {
                    return {
                        response: {
                            type: MessageToClientType.SUCCESS
                        },
                        session: createSession(username)
                    }
                } else {
                    return {
                        response: {
                            type: MessageToClientType.FAIL,
                            data: ErrorToClientType.ACCOUNT_PASSWORD_INVALID
                        }
                    }
                }
            } catch {}
        }

        case MessageToServerType.ACCOUNT_LOGOUT: {
            if (session) {
                db.data.sessions =
                    db.data.sessions.filter(s => s.id !== session.id);

                db.write();
            }

            return {
                response: {
                    type: MessageToClientType.SUCCESS,
                },
                session: null
            }
        }

        case MessageToServerType.ACCOUNT_GET_CURRENT: {
            const account = db.data.accounts.find(a => a.username === session?.username)

            if(account) {
                const { passwordHash, ...safeAccount } = account; // removes passwordHash from response

                return {
                    response: {
                        type: MessageToClientType.SUCCESS,
                        data: safeAccount
                    }
                }
            } else {
                return {
                    response: {
                        type: MessageToClientType.FAIL,
                        data: ErrorToClientType.ACCOUNT_DOESNT_EXIST
                    }
                }
            }
        }

        case MessageToServerType.GET_TAGS: {
            return {
                response: {
                    type: MessageToClientType.SUCCESS,
                    data: db.data.tags
                }
            }
        }

        default: {
            return {
                response: {
                    type: MessageToClientType.FAIL,
                    data: ErrorToClientType.INTERNAL_ERROR
                }
            }
        }
    }
}

export default async function(req: Request, res: Response, next: NextFunction) {
    if(req.url.startsWith("/api") && req.method === "POST") {
        db.read();

        const result = await handleServerMessage({
            type: req.body.type ?? 0,
            data: req.body.data ?? {},
        }, db.data.sessions.find(s => s.id === req.cookies.session) ?? null)

        if (result.session != undefined) {
            if(result.session === null) {
                res.clearCookie("session");
            } else {
                res.cookie("session", result.session.id, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
            }
        }

        res.json(result.response);
    } else if(req.url.startsWith("/api")) {
        res.json({version: 0.1});
    } else {
        next();
    }
}