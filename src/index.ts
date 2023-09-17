import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
// import cors from 'CORS'

const app = express()

// const corsMiddleware = cors();
// app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 3000


let videos = [{id: '1', title: 'Name 1', author: 'Author 1'}, {id: '2', title: 'Name 2', author: 'Author 2'}]


app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
        res.status(400).send({
            errorsMessages: [{
                "message": "title",
                "field": "errors in title"
            }]
        })
        return
    }

    const newVideo = {
        id: new Date().toISOString(),
        title: title,
        author: 'Leonardo'
    }

    videos.push(newVideo)

    res.status(201).send(newVideo)
})
app.put('/videos:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || !title.trim() || title.length > 40 || typeof title !== "string") {
        res.status(400).send({
            errorsMessages: [{
                "message": "title",
                "field": "errors in title"
            }]
        })
        return
    }

    const id = req.params.videoId;
    const video= videos.find(v => v.id === id)
    if (video) {
        video.title = title;
        res.status(204).send(video)
    } else {
        res.send(404)
    }


})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
