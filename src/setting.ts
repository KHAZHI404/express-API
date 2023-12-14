import express from "express";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import {usersRouter} from "./routes/users-router";
import {commentsRouter} from "./routes/comments-router";

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
    testing: '/testing',
    users: '/users',
    comments: '/comments',
}
export const app = express()

const bodyParser = express.json()
app.use(bodyParser)
app.use(RouterPaths.blogs, blogsRouter)
app.use(RouterPaths.posts, postsRouter)
app.use(RouterPaths.testing, testingRouter)
app.use(RouterPaths.users, usersRouter)
app.use(RouterPaths.comments, commentsRouter)

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    NOT_AUTHORIZED_401: 401,
}

export const settings = {
    MONGO_URI: process.env.MONGO_URL || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || "123"
}