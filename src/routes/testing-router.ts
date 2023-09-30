import {Request, Response, Router} from "express";
import {app} from "../index";
import {HTTP_STATUSES} from "../index";
import {videos} from "../db/db";

export const testingRouter = Router({})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.length = 0
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})