import { NextFunction, Request, Response } from "express"
import db from "./database/database"
import { ErrorToClientType, MessageToClient, MessageToClientType, MessageToServer, MessageToServerType } from "./apiTypes"

import { writeFileSync } from "fs";

function handleServerMessage(message: MessageToServer): MessageToClient {
    switch(message.type) {
        case MessageToServerType.UPLOAD_IMAGE: {
            const { base64, fileName } = message.data
            
            if(fileName.includes("..")) {
                return {
                    type: MessageToClientType.FAIL,
                    data: ErrorToClientType.UPLOAD_FILENAME_NOT_ALLOWED
                }
            }

            writeFileSync("uploads/"+fileName, atob(base64));

            return {
                type: MessageToClientType.SUCCESS
            }
        }

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