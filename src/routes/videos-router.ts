import {Request, Response, Router} from "express";
import { HTTP_STATUSES} from "../index";
import {videos, videosRepository} from "../repositories/videos-repository";
export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const foundVideos = videosRepository.findVideos(req.query.title?.toString())
    res.send(foundVideos)
})
videosRouter.post('/', (req: Request, res: Response) => {
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
    if (!author || !author.trim() || author.length > 40 || typeof author !== "string") {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                "message": "errors in author",
                "field": "author"
            }],
            resultCode: 1
        })
        return
    }

    const newVideo = videosRepository.createVideo(title, author)
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})
videosRouter.get('/:videoId', (req: Request, res: Response) => {
    const foundVideo = videosRepository.getVideoById(+req.params.id)
    if (foundVideo) {
        res.status(HTTP_STATUSES.OK_200).send(foundVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
videosRouter.put('/:videoId', (req: Request, res: Response) => {
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

    const foundVideo= videos.find(v => v.id === +req.params.videoId)
    if (foundVideo) {
        foundVideo.title = title;
        foundVideo.author = author
        res.status(HTTP_STATUSES.CREATED_201).send(foundVideo)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }

})
videosRouter.delete('/:videoId', (req:Request, res:Response) => {
    for (let i=0; i < videos.length; i++) {
        if (videos[i].id === +req.params.videoId) {
            videos.splice(i, 1);
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return
        }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})