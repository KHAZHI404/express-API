import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../index";

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }
    authHeader.replace('Basic ', '').split(':', 2)

    if (authHeader[0] === 'admin' && authHeader[1] === 'qwerty') {
        return next()
    }
}