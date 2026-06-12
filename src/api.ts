import { NextFunction, Request, Response } from "express"
import db from "./database/database"

export default function(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split("/")

    console.log(url)
}