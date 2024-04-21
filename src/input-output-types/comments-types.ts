import {ObjectId, WithId} from "mongodb";

export type CommentatorInfo = {
    userId: string
    userLogin: string
}

export type CommentDbType = {
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string
}

export type CommentWidthPostModel = {
    postId: string
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
}

export type OutputCommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
}
export const commentMapper = (comment: WithId<CommentDbType>): OutputCommentType => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt
    }
}
