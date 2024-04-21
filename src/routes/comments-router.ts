import {Request, Response, Router} from "express";
import {inputCheckErrorsMiddleware} from "../middlewares/input-validation-middleware";
import {commentsService} from "../domain/comments-service";
import {HTTP_STATUSES} from "../setting";
import {commentsQueryRepository} from "../query-repositories/comments-query-repository";
import {bearerAuth} from "../middlewares/auth-middleware";
import {validateComments} from "../models/comments-model/comments-validate";
import {ownerMiddlevare} from "../middlewares/owner-middleware";
import {OutputCommentType} from "../input-output-types/comments-types";

export const commentsRouter = Router({})

commentsRouter.get('/:commentId',
    async (req: Request, res: Response) => {
    const foundComment: OutputCommentType | null = await commentsQueryRepository.getCommentById(req.params.commentId)
    foundComment ? res.status(HTTP_STATUSES.OK_200).send(foundComment) :
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

commentsRouter.put('/:commentId',
    bearerAuth,
    validateComments(),
    inputCheckErrorsMiddleware,
    ownerMiddlevare,
    async (req: Request, res: Response) => {

        const commentId = req.params.commentId
        const isUpdated = await commentsService.updateComment(commentId, req.body)
        isUpdated ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

commentsRouter.delete('/:commentId',
    bearerAuth,
    ownerMiddlevare,
    async (req: Request, res: Response) => {
        const isDeleted = await commentsService.deleteComment(req.params.commentId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })