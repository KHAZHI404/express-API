import {commentsRepository} from "../repositories/comments-repository";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";
import {OutputPostType} from "../input-output-types/posts-types";
import {CommentDbType, OutputCommentType} from "../input-output-types/comments-types";


export const commentsService = {

    async createComment(userData: {userId: string, userLogin: string}, postId: string, content: string): Promise<OutputCommentType | null> {

        const post: OutputPostType | null = await postsQueryRepository.findPostById(postId)
        if (!post) return null
        const newComment: CommentDbType = {
            postId: postId,
            content: content,
            commentatorInfo: {
                userId: userData.userId,
                userLogin: userData.userLogin
        },
            createdAt: new Date().toISOString()
        }

        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, body: CommentDbType) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    },

}