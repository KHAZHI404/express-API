import {blogsCollection, db, postsCollection} from "../db/db";
import {blogsRepository} from "./blogs-repository";
import {h02dbPostInputModel, h02dbPostViewModel} from "../models/posts-models/posts-models";
import {h02dbBlogViewModel} from "../models/blogs-models/blog-models";


export const postsRepository = {

    async findPosts(title: string | null | undefined): Promise<h02dbPostViewModel[]> {
        return title ? postsCollection.find({title: {$regex: title}}).toArray()
            : postsCollection.find().toArray()
    },

    async findPostById(id: string): Promise<h02dbPostViewModel | null> {
        const post: h02dbPostViewModel | null = await postsCollection.findOne({id: id})
        return post ? post : null
    },

    async createPost(name: string, body: h02dbPostInputModel): Promise<h02dbPostInputModel> {
        const newPost: h02dbPostViewModel = {
            id: new Date().toISOString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: name,
        }
        const result = await postsCollection.insertOne(newPost)
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


    deleteAll() {
        db.__posts.splice(0, db.__posts.length)
    },

}