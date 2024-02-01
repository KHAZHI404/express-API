import {NextFunction, Request, Response} from "express";
import {commentsQueryRepository} from "../query-repositories/comments-query-repository";
import {HTTP_STATUSES} from "../setting";

export const ownerMiddlevare = async (req: Request, res: Response, next: NextFunction)=> {

    const commentId = req.params.commentId
    const comment = await commentsQueryRepository.getCommentById(commentId)

    if (!comment) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    if (comment?.commentatorInfo.userId !== req.user?.id) {
        return res.sendStatus(403)
    }
    if (comment?.commentatorInfo.userLogin !== req.user?.login) {

        return res.sendStatus(403)
    }
    next()
}