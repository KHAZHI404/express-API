import {postsCollection} from "../db/db";
import {h02dbPostInputModel, h03PostViewModel} from "../models/posts-models/posts-models";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";


export const postsService = {

    async findPosts(title: string | null | undefined): Promise<h03PostViewModel[]> {
        return postsRepository.findPosts(title)
    },

    async findPostById(id: string): Promise<h03PostViewModel | null> {
        return postsRepository.findPostById(id)
    },

    async createPost(name: string, body: h02dbPostInputModel): Promise<h02dbPostInputModel> {
        const newPost: h03PostViewModel = {
            id: new Date().toISOString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: name,
            createdAt: new Date().toISOString()
        }
        await postsRepository.createPost(newPost)
        return newPost
    },

    async updatePost(postId: string, blogId: string, body: h02dbPostInputModel) {
        return postsRepository.updatePost(postId, blogId, body)
    },

    async deletePost(id: string) {
        return postsRepository.deletePost(id)
    },

    async deleteAll() {
        return await postsRepository.deleteAll()
    },

}