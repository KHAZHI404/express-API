import {NextFunction, Request, Response, Router} from "express";
import { HTTP_STATUSES} from "../index";
import {videos, videosRepository} from "../repositories/videos-repository";
import * as http from "http";
import {body, validationResult} from "express-validator";
export const videosRouter = Router({})
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.login === 'admin' && req.query.password === 'qwerty') {
        next()
    }
    res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZED_401)
}
const titleValidation = body('title').isLength({max: 4}).withMessage('title length must be less than 40')
videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.post('/',
    authGuardMiddleware,
    titleValidation,

    (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
    // if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
    //     res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
    //         errorsMessages: [{
    //             "message": "errors in title",
    //             "field": "title"
    //         }],
    //         resultCode: 1
    //     })
    //     return
    // }
    // if (!author || !author.trim() || author.length > 40 || typeof author !== "string") {
    //     res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
    //         errorsMessages: [{
    //             "message": "errors in author",
    //             "field": "author"
    //         }],
    //         resultCode: 1
    //     })
    //     return
    // }

    const newVideo = videosRepository.createVideo(title, author)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})
videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideoById(+req.params.id)
    if (foundVideo) {
        res.status(HTTP_STATUSES.OK_200).send(foundVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
videosRouter.put('/:videoId', (req: Request, res: Response) => {
    let id = +req.params.id
    let title = req.body.title
    let author = req.body.author
    if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                "message": "errors in title",
                "field": "title"
            }],
            resultCode: 1
        })
        return
    }

    if (!author || !author.trim() || author.length > 20 || typeof author !== "string") {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                "message": "errors in author",
                "field": "author"
            }],
            resultCode: 1
        })
        return
    }

    const isUpdated = videosRepository.updateVideo(id, title, author)
    isUpdated ? res.send(videosRepository.findVideoById(id)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
videosRouter.delete('/:videoId', (req:Request, res:Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.videoId)
    isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})