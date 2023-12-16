import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {jwtService} from "../application/jwt-service";
import {bearerAuth} from "../middlewares/auth-middleware";
import {WithId} from "mongodb";
import {UserDbModel} from "../models/users-models/users-models";
import {validateAuthorization} from "../models/auth-models/auth-validate";

export const authRouter = Router()

authRouter.post('/login',
    validateAuthorization(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void>  => {
    const user: WithId<UserDbModel> | null  = await usersService.checkCredentials(req.body)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(HTTP_STATUSES.OK_200).send({accessToken: token})
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }

        authRouter.get('/me' ,
            bearerAuth,
            async (req: Request, res: Response) => {
                //some code
        })
})
