import {postsRepository} from "../repositories/posts-repository";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {InputPostType, OutputPostType, PostDbType} from "../input-output-types/posts-types";
import {OutputBlogType} from "../input-output-types/blogs-types";


export const postsService = {

    async createPost(inputData: InputPostType): Promise<OutputPostType | null> {
        const blog: OutputBlogType | null = await blogsQueryRepository.findBlogById(inputData.blogId)
        if (!blog) return null
        const newPost: PostDbType = {
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: blog.id,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost)
    },

    async updatePost(postId: string, body: InputPostType) {
        return postsRepository.updatePost(postId, body)
    },

    async deletePost(id: string) {
        return postsRepository.deletePost(id)
    },

    async deleteAll() {
        return await postsRepository.deleteAll()
    },

}