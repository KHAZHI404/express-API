import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../setting";

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }
    const [authType, authValue] = authHeader.split(' ')
    if(authType !== 'Basic') return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
    const [login, password] = atob(authValue).split(':')
    if(login !== 'admin' || password !== 'qwerty') return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
    return next()

    // authHeader.replace('Basic ', '').split(':', 2)
    //
    // if (authHeader[0] === 'admin' && authHeader[1] === 'qwerty') {
    //     return next()
    // }
}