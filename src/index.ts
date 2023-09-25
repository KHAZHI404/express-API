import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-router";
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
    NOT_AUTHORIZED_401: 401,
}

app.use('/videos', videosRouter)


app.delete('/testing/all-data', (req: Request, res: Response) => {
     //videos = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
