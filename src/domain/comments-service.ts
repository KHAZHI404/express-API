import {commentsRepository} from "../repositories/comments-repository";
import {CommentDbModel, CommentViewModel, CommentWidthPostModel} from "../models/comments-model/comments-models";
import {PostViewModel} from "../models/posts-models/posts-models";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";


export const commentsService = {

    async createComment(inputData: CommentWidthPostModel): Promise<CommentViewModel | null> {
        const post: PostViewModel | null = await postsQueryRepository.findPostById(inputData.postId)
        if (!post) return null

        const newComment: CommentDbModel = {
            content: inputData.content,
            commentatorInfo: {
                userId: inputData.commentatorInfo.userId,
                userLogin: inputData.commentatorInfo.userLogin
        },
            createdAt: new Date().toISOString()
        }
        // console.log(newComment, 'its comment')

        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },

}