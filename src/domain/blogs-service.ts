import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsService = {

    async findBlogs(page: number, pageSize: number, searchNameTerm: string | null, sortBy: string | 'createdAt', sortDirection: 'asc' | 'desc') {
        return await blogsRepository.findBlogs(page, pageSize, searchNameTerm, sortBy, sortDirection)
    },

    async getPostsForBlog(id: string, page: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc') {
        return await blogsRepository.getPostsForBlog(id, page, pageSize, sortBy, sortDirection)
    },

    async findBlogById(id: string): Promise<h03BlogViewModel | null> {
        return await blogsRepository.findBlogById(id)
    },

    async createBlog(body: h02dbBlogInputModel): Promise<h02dbBlogInputModel> {

        const newBlog: h03BlogViewModel = {
            id: new Date().toISOString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogsRepository.createBlog(newBlog)
        return newBlog
    },

    async updateBlog(id: string, body: h02dbBlogInputModel): Promise<boolean> {
        return await blogsRepository.updateBlog(id, body)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },

    async deleteAll() {
        return await blogsRepository.deleteAll()
    },
}