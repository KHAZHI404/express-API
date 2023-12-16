import {NextFunction, Response, Request} from "express";
import {HTTP_STATUSES} from "../setting";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";
import {UserViewModel} from "../models/users-models/users-models";


export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }
    const [authType, authValue] = authHeader.split(' ')
    if (authType !== 'Basic') return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
    const [login, password] = atob(authValue).split(':')
    if (login !== 'admin' || password !== 'qwerty') return res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
    return next()
}

export const bearerAuth = async (req: Request, res: Response, next: NextFunction) => {

    const auth = req.headers['authorization']

    if (!auth) {
        res.send(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }

    const token = auth.split(' ')[1]  //bearer fasdfasdfasdf

    const userId = await jwtService.getUserIdByToken(token)
    const user: UserViewModel | null = await usersService.findUserById(userId)
    if (user) {
        req.user = user
        return next()
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
}