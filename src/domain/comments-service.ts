import {commentsRepository} from "../repositories/comments-repository";
import {CommentDbModel, CommentViewModel, CommentWidthPostModel} from "../models/comments-model/comments-models";
import {PostViewModel} from "../models/posts-models/posts-models";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";
import {userInfo} from "os";
import {ObjectId} from "mongodb";


export const commentsService = {

    async createComment(userData: {userId: string, userLogin: string}, postId: string, content: string): Promise<CommentViewModel | null> {

        const post: PostViewModel | null = await postsQueryRepository.findPostById(postId)
        // console.log(post, 'its post')
        if (!post) return null
        const newComment: CommentDbModel = {
            content: content,
            commentatorInfo: {
                userId: userData.userId,
                userLogin: userData.userLogin
        },
            createdAt: new Date().toISOString()
        }
        // console.log(newComment, 'its comment 2 ')

        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },

}