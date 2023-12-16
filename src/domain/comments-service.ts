import {commentsRepository} from "../repositories/comments-repository";
import {CommentDbModel} from "../models/comments-model/comments-models";
import {PostViewModel} from "../models/posts-models/posts-models";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";


export const commentsService = {

    async createComment(inputData: any) {
        const post: PostViewModel | null = await postsQueryRepository.findPostById(inputData.postId)
        if (!post) return null

        const newComment: CommentDbModel = {
            content: inputData.content,
            commentatorInfo: {
                userId: inputData.userId,
                userLogin: inputData.userLogin
        },
            createdAt: new Date().toISOString()
        }
        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },

}