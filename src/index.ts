import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

export const app = express()

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 5000
export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

let videos = [{id: '1', title: 'Name 1', author: 'Author 1'}, {id: '2', title: 'Name 2', author: 'Author 2'}]

app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
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

    const newVideo = {
        id: new Date().toISOString(),
        title: title,
        author: author
    }

    videos.push(newVideo)

    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = req.params.videoId
    const foundVideo = videos.find(v => v.id === id)
    if (foundVideo) {
        res.status(HTTP_STATUSES.OK_200).send(foundVideo)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
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

    const id = req.params.videoId;
    const foundVideo= videos.find(v => v.id === id)
    if (foundVideo) {
        foundVideo.title = title;
        foundVideo.author = author
        res.status(HTTP_STATUSES.CREATED_201).send(foundVideo)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }

})
app.delete('/videos/:videoId', (req:Request, res:Response) => {
    const id = req.params.videoId
    const newVideos = videos.filter(v => v.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.send(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
