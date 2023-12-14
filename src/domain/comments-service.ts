import {UpdateBlogModel} from "../models/blogs-models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";
import {commentsRepository} from "../repositories/comments-repository";
import {CommentDbModel} from "../models/comments-model/comments-models";


export const commentsService = {

    async updateComment(id: string, body: CommentDbModel) {
        return await commentsRepository.updateComment(id, body)
    },

    async deleteComment(id: string) {
        return await commentsRepository.deleteComment(id)
    }





}