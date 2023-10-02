import { Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {videosRepository} from "../repositories/videos-repository";
import {inputValidationMiddleware, validateVideos} from '../middlewares/input-validation-middleware'
import {h01Video} from "../types";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.post('/',
    authGuardMiddleware, // не останавливается сендинг
    validateVideos(),
    inputValidationMiddleware, // тут ошибки
    (req: Request, res: Response) => {
    const {title, author} = req.body
    const newVideo: h01Video = videosRepository.createVideo(title, author)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})
videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const foundVideo = videosRepository.findVideoById(+req.params.videoId)
    if (foundVideo) {
        res.status(HTTP_STATUSES.OK_200).send(foundVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
videosRouter.put('/:videoId',
    // authGuardMiddleware,
    // validateVideos(),
    // inputValidationMiddleware, // тут какие то ошибочки
    (req: Request, res: Response) => {
    const { title, author} = req.body
    const videoId = +req.params.videoId
    const isUpdated = videosRepository.updateVideo(videoId, title, author)
    isUpdated ? res.send(videosRepository.findVideoById(videoId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
videosRouter.delete('/:videoId',
    // authGuardMiddleware, // dont work auth guard
    (req:Request, res:Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.videoId)
    isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})