import {BlogDbModel, blogMapper, BlogViewModel, Paginator} from "../models/blogs-models/blog-models";
import {blogsCollection, postsCollection} from "../db/db";
import {ObjectId, WithId} from "mongodb";
import {postMapper} from "../models/posts-models/posts-models";

export const blogsQueryRepository = {

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

    async getPostsForBlog(id: string, // как вернуть посты именно одного блога а не все?
                          page: number,
                          pageSize: number,
                          sortBy: string | 'createdAt',
                          sortDirection: string) {
        try {
            if (!ObjectId.isValid(id)) throw new Error('id not ObjectId')
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
                items: posts.map((post) => postMapper(post))
            } : null
        } catch (e) {
            return null
        }
    },

    async findBlogById(id: string): Promise<BlogViewModel | null> {
        if (!ObjectId.isValid(id)) return null
        const blog: WithId<BlogDbModel> | null = await blogsCollection.findOne(
            {_id: new ObjectId(id)})
        return blog ? blogMapper(blog) : null
    },


}