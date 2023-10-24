import {postsRepository} from "../repositories/posts-repository";
import {BlogViewModel} from "../models/blogs-models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";
import {PostDbModel, PostViewModel, UpdatePostModel} from "../models/posts-models/posts-models";

export type CreatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export const postsService = {

    async findPosts(page: number, pageSize: number, sortBy: string | 'createdAt', sortDirection: 'asc' | 'desc') {
        return await postsRepository.findPosts(page, pageSize, sortBy, sortDirection)
    },

    async findPostById(id: string): Promise<PostViewModel | null> {
        return postsRepository.findPostById(id)
    },

    async createPost(inputData: CreatePostType): Promise<PostViewModel | null> {
        const blog: BlogViewModel | null = await blogsRepository.findBlogById(inputData.blogId)
        if (!blog) return null
        const newPost: PostDbModel = {
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost)
    },

    async updatePost(postId: string, body: UpdatePostModel) {
        return postsRepository.updatePost(postId, body)
    },

    async deletePost(id: string) {
        return postsRepository.deletePost(id)
    },

    async deleteAll() {
        return await postsRepository.deleteAll()
    },

}