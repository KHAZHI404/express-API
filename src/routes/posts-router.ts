import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validatePosts} from '../middlewares/input-validation-middleware'
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";
import {blogsRepository} from "../repositories/blogs-repository";
import {h02dbPostInputModel, h03PostViewModel} from "../models/posts-models/posts-models";
import {h03BlogViewModel} from "../models/blogs-models/blog-models";
import {postsService} from "../domain/posts-service";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const foundPost: h03PostViewModel[] = await postsService.findPosts(req.query.title?.toString())
    res.send(foundPost)
})
postsRouter.post('/',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogExist: h03BlogViewModel | null = await blogsRepository.findBlogById(req.body.blogId)
        if (blogExist) {
            const newPost: h02dbPostInputModel | undefined = await postsService.createPost(blogExist.name, req.body)
            newPost ? res.status(HTTP_STATUSES.CREATED_201).send(newPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })
postsRouter.get('/:postId', async (req: Request, res: Response) => {
    const foundPost: h03PostViewModel | null = await postsService.findPostById(req.params.postId)
    foundPost ? res.status(HTTP_STATUSES.OK_200).send(foundPost) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})
postsRouter.put('/:postId',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const blogId = req.body
        const postId = req.params.postId
        const isUpdated = await postsService.updatePost(postId, blogId, req.body)
        const blogExist: h03BlogViewModel | null = await blogsRepository.findBlogById(blogId)
        if (blogExist) {
            isUpdated ? res.send(postsService.findPostById(postId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    })
postsRouter.delete('/:postId',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsService.deletePost(req.params.postId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })