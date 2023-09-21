import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 5000


let videos = [{id: '1', title: 'Name 1', author: 'Author 1'}, {id: '2', title: 'Name 2', author: 'Author 2'}]


app.delete('/', (req: Request, res: Response) => {
    videos = []
    res.send(204)
})
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author

    if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
        res.status(400).send({
            errorsMessages: [{
                "message": "errors in title",
                "field": "title"
            }],
            resultCode: 1
        })
        return
    }
    if (!author || !author.trim() || author.length > 40 || typeof author !== "string") {
        res.status(400).send({
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

    res.status(201).send(newVideo)
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = req.params.videoId
    const foundVideo = videos.find(v => v.id === id)
    if (foundVideo) {
        res.status(200).send(foundVideo)
    } else {
        res.send(404)
    }
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author
    if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
        res.status(400).send({
            errorsMessages: [{
                "message": "errors in title",
                "field": "title"
            }],
            resultCode: 1
        })
        return
    }

    if (!author || !author.trim() || author.length > 20 || typeof author !== "string") {
        res.status(400).send({
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
        res.status(204).send(foundVideo)
    } else {
        res.send(404)
    }

})
app.delete('/videos/:videoId', (req:Request, res:Response) => {
    const id = req.params.videoId
    const newVideos = videos.filter(v => v.id !== id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    } else {
        res.send(404)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
