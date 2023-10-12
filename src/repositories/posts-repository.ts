import {postsCollection} from "../db/db";
import {h02dbPostInputModel, h03PostViewModel} from "../models/posts-models/posts-models";


export const postsRepository = {

    async findPosts(title: string | null | undefined): Promise<h03PostViewModel[]> {
        return title ? postsCollection.find({title: {$regex: title}}).toArray()
            : postsCollection.find().toArray()
    },

    async findPostById(id: string): Promise<h03PostViewModel | null> {
        const post: h03PostViewModel | null = await postsCollection.findOne({id: id})
        return post ? post : null
    },

    async createPost(newPost: h03PostViewModel): Promise<h02dbPostInputModel> {

        await postsCollection.insertOne(newPost)
        return newPost
    },

    async updatePost(postId: string, blogId: string, body: h02dbPostInputModel) {

        const result = await postsCollection.updateOne({id: postId}, {
            $set: {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: blogId,

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