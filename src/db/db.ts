import {BlogDbType} from "../input-output-types/blogs-types";
import {MongoClient} from "mongodb";
import {config} from 'dotenv'
import {PostDbType} from "../input-output-types/posts-types";
import {UserDbType} from "../input-output-types/users-types";
import {CommentDbType} from "../input-output-types/comments-types";
import {TokenDbType} from "../middlewares/token-validation";

config()

const url = process.env.MONGO_URL as string

if (!url) {
    console.error('URI-строка подключения к MongoDB не определена.');
    process.exit(1);
  }

const client = new MongoClient(url);


const mongoDb = client.db('social-network')
export const blogsCollection = mongoDb.collection<BlogDbType>('blogs')
export const postsCollection = mongoDb.collection<PostDbType>('posts')
export const usersCollection = mongoDb.collection<UserDbType>('users')
export const commentsCollection = mongoDb.collection<CommentDbType>('comments')
export const blacklistTokens = mongoDb.collection<TokenDbType>('tokens')


export async function runDb () {
    try {
        await client.connect()
        console.log('Connected successfully to mongoserver')
    } catch (e) {
        console.log(`Don't connected`)
        await client.close()
    }
}