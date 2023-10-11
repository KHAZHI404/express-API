import {h01Video} from "../videos/videos-models/videos-models";
import {MongoClient} from "mongodb";
import {h02dbBlogViewModel} from "../models/blogs-models/blog-models";
import {h02dbPostViewModel} from "../models/posts-models/posts-models";
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

export const blogsCollection = mongoDb.collection<h02dbBlogViewModel>('blogs')
export const postsCollection = mongoDb.collection<h02dbPostViewModel>('posts')
export let videos: h01Video[] = [{
    id: '1', title: 'Name 1', author: 'Author 1', canBeDownloaded: true, minAgeRestriction: 12,
    createdAt: '12.04.2022', publicationDate: '29.09.2023', availableResolutions: 'P144'
},
    {
        id: '2', title: 'Name 2', author: 'Author 2', canBeDownloaded: true, minAgeRestriction: 12,
        createdAt: '12.04.2022', publicationDate: '29.09.2023', availableResolutions: 'P144'
    }]
export let db = {
    __blogs: [{id: '1', name: 'blog1', description: 'blog1', websiteUrl: 'blog1',},
        {id: '2', name: 'blog2', description: 'blog2', websiteUrl: 'blog2',}],
    __posts: [{id: '1', title: 'post1', shortDescription: 'post1', content: 'post1', blogId: 'post1', blogName: 'post1'},
        {id: '2', title: 'post2', shortDescription: 'post2', content: 'post2', blogId: 'post2', blogName: 'post2'},],
}
