

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

