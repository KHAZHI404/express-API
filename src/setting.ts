import express from "express";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {postsRepository} from "./repositories/posts-repository";
import {testingRouter} from "./routes/testing-router";

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
    testing: '/testing'
}
export const app = express()

const bodyParser = express.json()
app.use(bodyParser)
app.use(RouterPaths.blogs, blogsRouter)
app.use(RouterPaths.posts, postsRouter)
app.use(RouterPaths.testing, testingRouter)

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    NOT_AUTHORIZED_401: 401,
}