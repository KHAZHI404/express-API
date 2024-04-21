import {blogsRepository} from "../repositories/blogs-repository";
import {BlogDbType, InputBlogType, OutputBlogType} from "../input-output-types/blogs-types";


export const blogsService = {

    async createBlog(body: InputBlogType): Promise<OutputBlogType> {

        const newBlog: BlogDbType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return blogsRepository.createBlog(newBlog)
    },

    async updateBlog(id: string, body: InputBlogType): Promise<boolean> {
        return await blogsRepository.updateBlog(id, body)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },

    async deleteAll() {
        return await blogsRepository.deleteAll()
    },
}