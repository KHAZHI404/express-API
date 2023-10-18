import {blogsCollection, postsCollection} from "../db/db";
import {BlogDbModel, blogMapper, BlogViewModel, Paginator, UpdateBlogModel} from "../models/blogs-models/blog-models";
import {InsertOneResult, ObjectId, WithId} from "mongodb";

export const blogsRepository = {

    async findBlogs(page: number,
                    pageSize: number,
                    searchNameTerm: string | null,
                    sortBy: string | 'createdAt',
                    sortDirection: string): Promise<Paginator<BlogViewModel>> {
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
            items: blogs.map(blog => blogMapper(blog))
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
            const posts = await postsCollection.find(filter).sort(sortOptions).limit(pageSize).skip(scip).toArray()

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

    async findBlogById(id: string): Promise<BlogViewModel | null> {
        if(!ObjectId.isValid(id)) return null
        const blog: WithId<BlogDbModel> | null = await blogsCollection.findOne(
            {_id: new ObjectId(id)})
        return blog ? blogMapper(blog) : null
    },

    async createBlog(newBlog: BlogDbModel): Promise<BlogViewModel> {
        const result: InsertOneResult<BlogDbModel> = await blogsCollection.insertOne({...newBlog})
        return blogMapper({_id: result.insertedId, ...newBlog})
    },

    async updateBlog(body: UpdateBlogModel ): Promise<boolean> {

        const result = await blogsCollection.updateOne({id: body.id}, {
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