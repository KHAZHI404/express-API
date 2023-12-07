import {Router} from "express";
import {usersService} from "../domain/users-service";


export const authRouter = Router()

authRouter.post('/login',
    async (req: Request, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        // if (checkResult.resultCode === 0) {
        //     res.status(HTTP_STATUSES.CREATED_201).send(checkResult.data)
        // } else {
        //     res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
        // }
}
    )