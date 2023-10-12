import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsCollection} from "../db/db";

export const blogsService = {

    async findBlogs(name: string | null | undefined): Promise<h03BlogViewModel[]> {
        return blogsRepository.findBlogs(name)
    },

    async findBlogById(id: string): Promise<h03BlogViewModel | null> {
        return blogsRepository.findBlogById(id)
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
    return blogsRepository.updateBlog(id, body)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return blogsRepository.deleteBlog(id)
    },

    async deleteAll() {
        return await blogsRepository.deleteAll()
    },
}