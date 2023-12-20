import {WithId} from "mongodb";


export type CommentsInputModel = {
    content: string
}

export type CommentatorInfo = {
    userId: string
    userLogin: string
}

export type CommentDbModel = {
    content: CommentsInputModel
    commentatorInfo: CommentatorInfo
    createdAt: string
}

export type CommentWidthPostModel = {
    postId: string
    content: CommentsInputModel
    commentatorInfo: CommentatorInfo
    createdAt: string
}

export type CommentViewModel = {
    id: string
    content: CommentsInputModel
    commentatorInfo: CommentatorInfo
    createdAt: string
}
export const commentMapper = (comment: WithId<CommentDbModel>): CommentViewModel => {
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
