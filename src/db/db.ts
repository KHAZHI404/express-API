import {h03BlogViewModel} from "../models/blogs-models/blog-models";
import {h03PostViewModel} from "../models/posts-models/posts-models";

import 'dotenv/config'
import {MongoClient} from "mongodb";

import * as dotenv from 'dotenv'
dotenv.config()
// const url = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
const url = "mongodb+srv://admin404:qwerty707@data.xwatlof.mongodb.net/?retryWrites=true&w=majority"

console.log(url, 'its url')
const client = new MongoClient(url);
const mongoDb = client.db('social-network')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully to server')
    } catch (e) {
        console.log(`Don't connected`)
        await client.close()
    }
}

export const blogsCollection = mongoDb.collection<h03BlogViewModel>('blogs')
export const postsCollection = mongoDb.collection<h03PostViewModel>('posts')

