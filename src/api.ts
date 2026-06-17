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

        res.setHeader("content-type", "application/json")
        res.end(JSON.stringify(response, null, 4));
    } else if(req.url.startsWith("/api")) {
        res.end({version: 0.1});
    } else {
        next();
    }
}