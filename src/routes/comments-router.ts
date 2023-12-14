import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {inputValidationMiddleware, validateComments} from "../middlewares/input-validation-middleware";
import {commentsService} from "../domain/comments-service";
import {HTTP_STATUSES} from "../setting";


export const commentsRouter = Router({})

commentsRouter.put('/:commentId',
    authMiddleware,
    validateComments(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const commentId = req.params.commentId
        const isUpdated = await commentsService.updateComment(commentId, req.body)
        isUpdated ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
)
.delete('/:commentId',
    authMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await commentsService.deleteComment(req.params.commentId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    )