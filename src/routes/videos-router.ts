import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {videosRepository} from "../repositories/videos-repository";
import {inputValidationMiddleware, validateVideos} from '../middlewares/input-validation-middleware'
import {h01Video} from "../models/videos-models/videos-models";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos: h01Video[] = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.post('/',
    validateVideos(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {title, author} = req.body
        const newVideo = videosRepository.createVideo(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
    })
videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const foundVideo: h01Video | undefined = videosRepository.findVideoById(req.params.videoId)
    if (foundVideo) {
        res.status(HTTP_STATUSES.OK_200).send(foundVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
videosRouter.put('/:videoId',
    validateVideos(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const videoId = req.params.videoId
        const isUpdated = videosRepository.updateVideo(videoId, req.body)
        isUpdated ? res.send(videosRepository.findVideoById(videoId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
videosRouter.delete('/:videoId',
    (req: Request, res: Response) => {
        const isDeleted = videosRepository.deleteVideo(req.params.videoId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })