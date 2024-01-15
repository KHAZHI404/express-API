import {Request, Response, Router} from "express";
import {emailService} from "../domain/email-service";

export const emailRouter = Router({})

emailRouter.post('/send', async (req: Request, res: Response) => {
    const user = req.body
    await emailService.sendLetter(user)

    res.send({
        email: req.body.email,
        message: req.body.message,
        subject: req.body.subject,
    })
})