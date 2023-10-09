import {raw, Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validatePosts} from '../middlewares/input-validation-middleware'
import {postsRepository} from "../repositories/posts-repository";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";
import {blogsRepository} from "../repositories/blogs-repository";
import {h02dbPostInputModel, h02dbPostViewModel} from "../models/posts-models/posts-models";
import {h02dbBlogViewModel} from "../models/blogs-models/blog-models";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const foundPost: h02dbPostViewModel[] = await postsRepository.findPosts(req.query.title?.toString())
    res.send(foundPost)
})
postsRouter.post('/',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogExist: h02dbBlogViewModel | null = await blogsRepository.findBlogById(req.body.blogId)
        if (blogExist) {
            const newPost: h02dbPostInputModel | undefined = await postsRepository.createPost(blogExist.name, req.body)
            newPost ? res.status(HTTP_STATUSES.CREATED_201).send(newPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })
postsRouter.get('/:postId', async (req: Request, res: Response) => {
    const foundPost: h02dbPostViewModel | null = await postsRepository.findPostById(req.params.postId)
    foundPost ? res.status(HTTP_STATUSES.OK_200).send(foundPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
postsRouter.put('/:postId',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const {name, description, websiteUrl, blogId} = req.body
        const postId = req.params.postId
        const isUpdated = await postsRepository.updatePost(postId, blogId, req.body)
        const blogExist: h02dbBlogViewModel | null = await blogsRepository.findBlogById(blogId)
        if (blogExist) {
            isUpdated ? res.send(postsRepository.findPostById(postId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })
postsRouter.delete('/:postId',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePost(req.params.postId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })