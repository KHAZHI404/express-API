// import {Request, Response, Router} from "express";
// import {HTTP_STATUSES} from "../setting";
//
//
// export const feedbacksRouter = Router()
//
// feedbacksRouter
//     .post('/',
//         // authMiddleware,
//         async (req: Request, res: Response) => {
//             const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.user!._id) // мы должны создать этот сервис?
//             res.status(HTTP_STATUSES.CREATED_201).send(newProduct)
//         })
//     .get('/', async (req: Request, res: Response)=> {
//         const users = await feedbacksService.allFeedbacks()
//         res.send(users)
//     })
