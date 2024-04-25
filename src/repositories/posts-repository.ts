import {postsCollection} from "../db/db";
import {InsertOneResult, ObjectId} from "mongodb";
import {InputPostType, OutputPostType, PostDbType, postMapper} from "../input-output-types/posts-types";


export const postsRepository = {

    async createPost(newPost: PostDbType): Promise<OutputPostType> {
        const result: InsertOneResult<PostDbType> = await postsCollection.insertOne({...newPost})
        return postMapper({_id: result.insertedId, ...newPost})
    },

    async updatePost(postId: string, body: InputPostType) {
        if(!ObjectId.isValid(postId)) return false

        const result = await postsCollection.updateOne({_id: new ObjectId(postId)}, {
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
        if(!ObjectId.isValid(id)) return false
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAll() {
        return  await postsCollection.deleteMany({})
    },

}