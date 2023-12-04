import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validatePosts} from '../middlewares/input-validation-middleware'
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";
import {BlogViewModel} from "../models/blogs-models/blog-models";
import {postsService} from "../domain/posts-service";
import {PostViewModel} from "../models/posts-models/posts-models";
import {postsQueryRepository} from "../query-repositories/posts-query-repository";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const foundPosts = await postsQueryRepository.findPosts(page, pageSize, sortBy, sortDirection)
    res.send(foundPosts)
})
postsRouter.get('/:postId', async (req: Request, res: Response) => {
    const foundPost: PostViewModel | null = await postsQueryRepository.findPostById(req.params.postId)
    foundPost ? res.status(HTTP_STATUSES.OK_200).send(foundPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
postsRouter.post('/',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsService.createPost(req.body)
        newPost ? res.status(HTTP_STATUSES.CREATED_201).send(newPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

postsRouter.put('/:postId',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogId = req.body.blogId
        const postId = req.params.postId
        const blogExist: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId)
        const postExist = await postsQueryRepository.findPostById(postId)

        if (!blogExist) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).send("error blog")
            return
        }
        if (!postExist) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).send("error post")
            return
        }
        await postsService.updatePost(postId, req.body)
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('No content')
    })
postsRouter.delete('/:postId',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsService.deletePost(req.params.postId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

