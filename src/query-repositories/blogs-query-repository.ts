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
            filter.name = {$regex: searchNameTerm, $options: 'i'}
        }

        const sortOptions: any = []
        sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1

        const totalCount = await blogsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        const scip = (page - 1) * pageSize
        const blogs = await blogsCollection
            .find(filter)
            .sort(sortOptions)
            .limit(pageSize)
            .skip(scip)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: blogs.map(blog => blogMapper(blog))
        }
    },

    async getPostsForBlog(id: string,
                          pageNumber: number,
                          pageSize: number,
                          sortBy: string,
                          sortDirection: string) {
        try {
            if (!ObjectId.isValid(id)) return null
            const sortOptions: any = []
            sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1
            const filter = {blogId: id}

            const totalCount = await postsCollection.countDocuments(filter)
            const pagesCount = Math.ceil(totalCount / pageSize)
            const scip = (pageNumber - 1) * pageSize
            const posts = await postsCollection
                .find(filter)
                .sort(sortOptions)
                .limit(pageSize)
                .skip(scip)
                .toArray()

            return posts ? {
                pagesCount,
                pageNumber,
                pageSize,
                totalCount,
                items: posts.map(postMapper) //posts.map((post) => postMapper(post))
            } : null
        } catch (e) {
            return e
        }
    },

    async findBlogById(id: string): Promise<BlogViewModel | null> {
        if (!ObjectId.isValid(id)) return null
        const blog: WithId<BlogDbModel> | null = await blogsCollection.findOne(
            {_id: new ObjectId(id)})
        return blog ? blogMapper(blog) : null
    },


}