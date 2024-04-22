import {BlogDbType} from "../input-output-types/blogs-types";
import {MongoClient} from "mongodb";
import {config} from 'dotenv'
import {PostDbType} from "../input-output-types/posts-types";
import {UserDbType} from "../input-output-types/users-types";
import {CommentDbType} from "../input-output-types/comments-types";
import {TokenDbType} from "../middlewares/token-validation";
import {SETTINGS} from "../setting";

config()

// const url = process.env.MONGO_URL as string
//
// if (!url) {
//     console.error('URI-строка подключения к MongoDB не определена.');
//     process.exit(1);
//   }

const client = new MongoClient(SETTINGS.MONGO_URI);


export const mongoDb = client.db(SETTINGS.DB_NAME)
export const blogsCollection = mongoDb.collection<BlogDbType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postsCollection = mongoDb.collection<PostDbType>(SETTINGS.POST_COLLECTION_NAME)
export const usersCollection = mongoDb.collection<UserDbType>(SETTINGS.USER_COLLECTION_NAME)
export const commentsCollection = mongoDb.collection<CommentDbType>(SETTINGS.COMMENT_COLLECTION_NAME)
export const blacklistTokens = mongoDb.collection<TokenDbType>(SETTINGS.TOKEN_COLLECTION_NAME)


export async function connectToDB () {
    try {
        await client.connect()
        console.log('Connected successfully to db')
        return true
    } catch (e) {
        console.log(`Don't connected`)
        await client.close()
        return false
    }
}