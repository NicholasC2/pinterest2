import { NextFunction, Request, Response } from "express"
import db from "./database/database"
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer } from "./apiTypes"

function handleServerMessage(path: string, message: MessageToServer): MessageToClient {
    return {
        type: MessageToClientType.FAIL,
        data: ErrorToClientType.INTERNAL_ERROR
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    if(req.url.startsWith("/api/") && req.method === "POST") {
        const response = handleServerMessage( req.url.replace("/api/", ""), {
            type: req.body.type ?? 0,
            data: req.body.data ?? {},
        })

        if(response.type == MessageToClientType.FAIL) {
            res.sendStatus(418);
        } else {
            res.send(response.data);
        }
    } else {
        next();
    }
}