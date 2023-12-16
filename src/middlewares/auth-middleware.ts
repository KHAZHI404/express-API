import {NextFunction, Response, Request} from "express";
import {HTTP_STATUSES} from "../setting";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const auth = req.headers['authorization']

    if (!auth) {
        res.send(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }

    const token = auth.split(' ')[1]  //bearer fasdfasdfasdf

    const userId = await jwtService.getUserIdByToken(token)
    const user = await usersService.findUserById(userId)
    if (user) {
        req.user = user
        return  next()
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
}