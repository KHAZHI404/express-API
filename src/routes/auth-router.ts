import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {HTTP_STATUSES} from "../setting";
import {inputCheckErrorsMiddleware} from "../middlewares/input-validation-middleware";
import {jwtService} from "../application/jwt-service";
import {bearerAuth} from "../middlewares/auth-middleware";
import {validateAuthorization} from "../models/auth-models/auth-validate";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {authRegistrationValidation, emailResendingValidation} from "../middlewares/userAlreadyExist";
import { confirmationValidation } from "../middlewares/code-validation";
import { blacklistTokens } from "../db/db";
import { verifyTokenInCookie } from "../middlewares/verifyTokenInCookie";


export const authRouter = Router()

authRouter.post('/login',
    validateAuthorization(),
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response): Promise<void>  => {

        const user: any  = await authService.checkCredentials(req.body)
        if (user) {
            console.log(user._id, 'first')
            const accessToken = await jwtService.generateToken( user._id.toString(), '10s'); 
            const refreshToken = await jwtService.generateToken( user._id.toString(), '20s');

            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true});
            res.status(HTTP_STATUSES.OK_200).send({accessToken: accessToken})
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
    }
)


authRouter.post('/refresh-token', 
    verifyTokenInCookie,
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        const decodedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);
        if (decodedRefreshToken) {
          const newAccessToken = await jwtService.generateToken( decodedRefreshToken, '10s');
          const newRefreshToken = await jwtService.generateToken( decodedRefreshToken , '20s');
          res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true});
          res.send({ accessToken: newAccessToken });

        } else {
          res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
      });
 
authRouter.post('/auth/logout', 
    verifyTokenInCookie,
    inputCheckErrorsMiddleware,
        async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        const decodedRefreshToken = await jwtService.verifyRefreshToken(refreshToken);

        if (decodedRefreshToken) {
          await blacklistTokens.insertOne({...refreshToken})      
          res.send(HTTP_STATUSES.OK_200);
        } else {
          res.status(HTTP_STATUSES.NOT_AUTHORIZED_401)
        }
      });
 
authRouter.post('/registration-confirmation',
    confirmationValidation(),
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
    emailResendingValidation(),
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
        if (!currentUser)  {return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)}
        return res.send({
            email: currentUser.email,
            login: currentUser.login,
            userId: currentUser.id
        })
     }
)
