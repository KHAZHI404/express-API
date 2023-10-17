import {blogsCollection, postsCollection} from "../db/db";
import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRepository = {

    async findBlogs(page: number, pageSize: number, searchNameTerm: string | null,
                    sortBy: string | 'createdAt', sortDirection: string) {
        const filter: any = {}
        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm, options: 'i'}
        }

        const sortOptions: any = []
        sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1

        const totalCount = await blogsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        const scip = (page - 1) * pageSize
        const blogs = await blogsCollection.find(filter).sort(sortOptions).limit(pageSize).skip(scip).toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: blogs.map((blog) => (blog))
        }
    },

    async getPostsForBlog(id: string, page: number, pageSize: number,
                          sortBy: string | 'createdAt', sortDirection: string) {
        try {
            const sortOptions: any = []
            sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1
            const filter = {blogId: id}

            const totalCount = await blogsCollection.countDocuments(filter)
            const pagesCount = Math.ceil(totalCount / pageSize)
            const scip = (page - 1) * pageSize
            const posts = await postsCollection.find(filter).sort(sortOptions).limit(pageSize).toArray()

            return posts ? {
                pagesCount,
                page,
                pageSize,
                totalCount,
                items: posts.map((post) => (post))
            } : null
        } catch (e) {
            return null
        }
    },

    async findPostByBlogId(id: string) {
        const foundPost = postsCollection.find(
            {blogId: id},
            {projection: {_id: false}})
        return foundPost
    },

    async findBlogById(id: string): Promise<h03BlogViewModel | null> {
        const blog: h03BlogViewModel | null = await blogsCollection.findOne(
            {id: id},
            {projection: {_id: false}})
        return blog
    },

    async createBlog(newBlog: h03BlogViewModel): Promise<h03BlogViewModel> {
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