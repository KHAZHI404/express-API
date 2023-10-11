import {blogsCollection, db} from "../db/db";
import {h02dbBlogInputModel, h02dbBlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRepository = {

    async findBlogs(name: string | null | undefined): Promise<h02dbBlogViewModel[]> {
        return name ? blogsCollection.find({name: {$regex: name}}).toArray()
            : blogsCollection.find().toArray()
    },

    async findBlogById(id: string): Promise<h02dbBlogViewModel | null> {
        const blog: h02dbBlogViewModel | null = await blogsCollection.findOne({id: id})
        return blog ? blog : null
    },

    async createBlog(body: h02dbBlogInputModel): Promise<h02dbBlogInputModel> {
        const newBlog: h02dbBlogViewModel = {
            id: new Date().toISOString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
        }
        await blogsCollection.insertOne(newBlog)
        return newBlog
    },

    async updateBlog(id: string, body: h02dbBlogInputModel): Promise<boolean> {

        const result = await blogsCollection.updateOne({id: id}, {
            $set: {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl,
            }
        })
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    deleteAll() {
        db.__blogs.splice(0, db.__blogs.length)
    }

}