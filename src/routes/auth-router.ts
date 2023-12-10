import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validateAuthorization} from "../middlewares/input-validation-middleware";

export const authRouter = Router()

authRouter.post('/auth/login',
    validateAuthorization(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void>  => {
    const correctData = await usersService.checkCredentials(req.body)
        correctData ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
})