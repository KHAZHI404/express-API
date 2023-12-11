import {NextFunction} from "express";
import {HTTP_STATUSES} from "../setting";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(HTTP_STATUSES.NOT_AUTHORIZED_401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersService.findUserById(userId)
        next()
    }
    res.send(HTTP_STATUSES.NOT_AUTHORIZED_401)
}