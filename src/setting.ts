import express from "express";
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos-router";
import {videosRepository} from "./repositories/videos-repository";
import {Request, Response} from "express";
export const app = express()
export const RouterPaths = {
    videos: '/videos',
}

app.use(bodyParser.json())
app.use(RouterPaths.videos, videosRouter)
app.delete('/testing/all-data', (req: Request, res: Response) => {
    videosRepository.deleteAll()
    res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
})

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    NOT_AUTHORIZED_401: 401,
}