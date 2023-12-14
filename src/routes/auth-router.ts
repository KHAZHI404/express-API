import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validateAuthorization} from "../middlewares/input-validation-middleware";
import {jwtService} from "../application/jwt-service";

export const authRouter = Router()

// authRouter.post('/auth/login',
//     validateAuthorization(),
//     inputValidationMiddleware,
//     async (req: Request, res: Response): Promise<void>  => {
//     const user  = await usersService.checkCredentials(req.body) // он же возвращает булевое значение, как мы передадим его в кратеДЖВТ
//         if (user) {
//             const token = await jwtService.createJWT(user)
//             res.status(HTTP_STATUSES.CREATED_201).send(token)
//         } else {
//             res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
//         }
// })