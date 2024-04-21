import express from "express";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import {usersRouter} from "./routes/users-router";
import {commentsRouter} from "./routes/comments-router";
import {authRouter} from "./routes/auth-router";
import {emailRouter} from "./routes/email-router";
import cookieParser from "cookie-parser";

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    MONGO_URI: process.env.MONGO_URL || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || "123",
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
        USERS: '/users',
        COMMENTS: '/comments',
        AUTH: '/auth',
        EMAIL: '/email',

    }
}
export const app = express()

const bodyParser = express.json()
app.use(cookieParser())
app.use(bodyParser)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.USERS, usersRouter)
app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.EMAIL, emailRouter)


export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    NOT_AUTHORIZED_401: 401,
}

