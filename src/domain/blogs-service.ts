import { BlogDbModel, BlogViewModel, CreateBlogInputModel, UpdateBlogModel } from "../models/blogs-models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";


export const blogsService = {

    async findBlogs(page: number, pageSize: number, searchNameTerm: string | null, sortBy: string | 'createdAt', sortDirection: 'asc' | 'desc') {
        return await blogsRepository.findBlogs(page, pageSize, searchNameTerm, sortBy, sortDirection)
    },

    // async getPostsForBlog(id: string, page: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc') {
    //     return await blogsRepository.getPostsForBlog(id, page, pageSize, sortBy, sortDirection)
    // },

    async findBlogById(id: string): Promise<BlogViewModel | null> {
        return await blogsRepository.findBlogById(id)
    },

    async createBlog(body: CreateBlogInputModel): Promise<BlogViewModel> {

        const newBlog: BlogDbModel = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return blogsRepository.createBlog(newBlog)
    },

    async updateBlog(body: UpdateBlogModel): Promise<boolean> {
        return await blogsRepository.updateBlog(body)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },

    async deleteAll() {
        return await blogsRepository.deleteAll()
    },
}