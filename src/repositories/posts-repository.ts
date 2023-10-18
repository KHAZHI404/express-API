import {postsCollection} from "../db/db";
import {PostDbModel, postMapper, PostViewModel, UpdatePostModel} from "../models/posts-models/posts-models";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {Paginator} from "../models/blogs-models/blog-models";


export const postsRepository = {

    async findPosts(page: number,
                    pageSize: number,
                    sortBy: string | 'createdAt',
                    sortDirection: string): Promise<Paginator<PostViewModel>> {
        const filter: any = {}

        const sortOptions: any = []
        sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1

        const totalCount = await postsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        const scip = (page - 1) * pageSize
        const post = await postsCollection.find(filter).sort(sortOptions).limit(pageSize).skip(scip).toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: post.map(post => postMapper(post))
        }
    },
    async findPostById(id: string): Promise<PostViewModel | null> {
        if(!ObjectId.isValid(id)) return null
        const post: WithId<PostDbModel> | null = await postsCollection.findOne(
            {_id: new ObjectId(id)})
        return post ? postMapper(post) : null

    },

    async createPost(newPost: PostDbModel): Promise<PostViewModel> {
        const result: InsertOneResult<PostDbModel> = await postsCollection.insertOne({...newPost})
        return postMapper({_id: result.insertedId, ...newPost})
    },

    async updatePost(postId: string, body: UpdatePostModel) {

        const result = await postsCollection.updateOne({id: postId}, {
            $set: {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,

            }
        })
        return result.matchedCount === 1
    },

    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deleteAll() {
        const result = await postsCollection.deleteMany({})
    },

}