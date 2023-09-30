import { Request, Response, Router} from "express";
import { HTTP_STATUSES} from "../index";
import { videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware, titleValidation} from '../middlewares/input-validation-middleware'
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.post('/',
    authGuardMiddleware,
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const {title, author} = req.body

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

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
videosRouter.put('/:videoId',
    // authGuardMiddleware,
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const {id, title, author} = req.body

    const isUpdated = videosRepository.updateVideo(id, title, author)
    isUpdated ? res.send(videosRepository.findVideoById(id)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
videosRouter.delete('/:videoId', (req:Request, res:Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.videoId)
    isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})