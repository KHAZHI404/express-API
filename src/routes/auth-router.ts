import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {jwtService} from "../application/jwt-service";
import {bearerAuth} from "../middlewares/auth-middleware";
import {validateAuthorization} from "../models/auth-models/auth-validate";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {authRegistrationValidation, emailValidation} from "../middlewares/userAlreadyExist";
import { codeValidation } from "../middlewares/code-validation";

export const authRouter = Router()

authRouter.post('/login',
    validateAuthorization(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void>  => {
        const user  = await authService.checkCredentials(req.body)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(HTTP_STATUSES.OK_200).send({accessToken: token})
            console.log(token)
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
    }
)

authRouter.post('/registration-confirmation',
    codeValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response)  => {
        const result  = await authService.confirmEmail(req.body.code)
        if (!result) return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400) // 474?
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return
    }
)

authRouter.post('/registration',
    authRegistrationValidation(),
    async (req: Request, res: Response): Promise<void>  => {
        const user  = await authService.createUserAccount(req.body)
        if (!user) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return
        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return
    }
)

authRouter.post('/registration-email-resending',
    emailValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response)  => {
        const user  = await authService.resendCode(req.body.email)
        if (!user) return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return
    }
)

authRouter.get('/me' ,
    bearerAuth,
    async (req: Request, res: Response) => {
    const userId = req.user!.id
        const currentUser = await usersQueryRepository.findCurrentUser(userId)
        console.log(currentUser)
        if (!currentUser) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        res.send({
            email: currentUser.email,
            login: currentUser.login,
            userId: currentUser.id
        })
     }
)
