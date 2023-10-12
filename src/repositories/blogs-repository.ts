import {blogsCollection} from "../db/db";
import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRepository = {

    async findBlogs(name: string | null | undefined): Promise<h03BlogViewModel[]> {
        return name ? blogsCollection.find({name: {$regex: name}}).toArray()
            : blogsCollection.find().toArray()
    },

    async findBlogById(id: string): Promise<h03BlogViewModel | null> {
        const blog: h03BlogViewModel | null = await blogsCollection.findOne({id: id})
        return blog
    },

    async createBlog(newBlog: h03BlogViewModel): Promise<h02dbBlogInputModel> {
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

    async deleteAll() {
        const result = await blogsCollection.deleteMany({})
    }

}