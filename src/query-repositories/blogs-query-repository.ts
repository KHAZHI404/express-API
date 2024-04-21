import {blogsCollection, postsCollection} from "../db/db";
import {ObjectId, WithId} from "mongodb";
import {BlogDbType, blogMapper, OutputBlogType, Paginator} from "../input-output-types/blogs-types";
import {postMapper} from "../input-output-types/posts-types";

export const blogsQueryRepository = {

    async findBlogs(page: number,
                    pageSize: number,
                    sortBy: string,
                    sortDirection: string,
                    searchNameTerm: string | null,): Promise<Paginator<OutputBlogType>> {

        let searchNameFilter = {}
        if (searchNameTerm) {
            searchNameFilter = {name: {$regex: searchNameTerm, $options: 'i'}}
        }
        let sortOptions: { [key: string]: 1 | -1}  = {
            [sortBy]: -1
        }
        if (sortDirection === "asc") {
            sortOptions[sortBy] = 1
        }
        const totalCount = await blogsCollection.countDocuments(searchNameFilter)
        const pagesCount = Math.ceil(totalCount / +pageSize)
        const scip = (+page - 1) * +pageSize
        const blogs = await blogsCollection
            .find(searchNameFilter)
            .sort(sortOptions)
            .skip(scip)
            .limit(+pageSize)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: blogs.map(blogMapper)
        }
    },

    async getPostsForBlog(id: string,
                          pageNumber: number,
                          pageSize: number,
                          sortBy: string,
                          sortDirection: string) {
        try {
            if (!ObjectId.isValid(id)) return null
            let sortOptions: { [key: string]: 1 | -1}  = {
                [sortBy]: -1
            }
            if (sortDirection === "asc") {
                sortOptions[sortBy] = 1
            }
            const filter = {blogId: id}

            const totalCount = await postsCollection.countDocuments(filter)
            const pagesCount = Math.ceil(+totalCount / +pageSize)
            const scip = (+pageNumber - 1) * +pageSize
            const posts = await postsCollection
                .find(filter)
                .sort(sortOptions)
                .skip(scip)
                .limit(+pageSize)
                .toArray()

            return posts ? {
                pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: posts.map(postMapper)
            } : null
        } catch (e) {
            return e
        }
    },

    async findBlogById(id: string): Promise<OutputBlogType | null> {
        if (!ObjectId.isValid(id)) return null
        const blog: WithId<BlogDbType> | null = await blogsCollection.findOne(
            {_id: new ObjectId(id)})
        return blog ? blogMapper(blog) : null
    },


}