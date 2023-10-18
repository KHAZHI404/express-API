import {BlogDbModel} from "../models/blogs-models/blog-models";
import {PostDbModel} from "../models/posts-models/posts-models";
import {MongoClient} from "mongodb";

import {config} from 'dotenv'
config()
const url = process.env.MONGO_URL as string
const client = new MongoClient(url);

export async function runDb () {
    try {
       const s = await client.connect()

        console.log('Connected successfully to server')
    } catch (e) {
        console.log(`Don't connected`)
        await client.close()
    }
}
const mongoDb = client.db('social-network')
export const blogsCollection = mongoDb.collection<BlogDbModel>('blogs')
export const postsCollection = mongoDb.collection<PostDbModel>('posts')

