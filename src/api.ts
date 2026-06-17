import { NextFunction, Request, Response } from "express"
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer } from "./apiTypes"

function handleServerMessage(message: MessageToServer): MessageToClient {
    switch(message.type) {

        default: {
            return {
                type: MessageToClientType.FAIL,
                data: ErrorToClientType.INTERNAL_ERROR
            }
        }
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    if(req.url.startsWith("/api") && req.method === "POST") {
        const response = handleServerMessage({
            type: req.body.type ?? 0,
            data: req.body.data ?? {},
        })

        if(response.type == MessageToClientType.FAIL) {
            res.sendStatus(418);
        } else {
            res.send(response.data);
        }
    } else if(req.url.startsWith("/api")) {
        res.send({version: 0.1});
    } else {
        next();
    }
}