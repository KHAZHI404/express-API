import e, {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validatePosts} from '../middlewares/input-validation-middleware'
import {h02dbBlogViewModel, h02dbPostInputModel, h02dbPostViewModel} from "../types";
import {postsRepository} from "../repositories/posts-repository";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";

export const postsRouter = Router({})


postsRouter.get('/', (req: Request, res: Response) => {
    const foundPost = postsRepository.findPosts(req.query.title?.toString())
    res.send(foundPost)
})
postsRouter.post('/',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {title, shortDescription, content, blogId} = req.body
        const newPost: h02dbPostInputModel | undefined = postsRepository.createPost(title, shortDescription, content, blogId)
        if (newPost) {
            res.status(HTTP_STATUSES.CREATED_201).send(newPost)
        } else {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
    })
postsRouter.get('/:postId', (req: Request, res: Response) => {
    const foundPost : h02dbPostViewModel | undefined = postsRepository.findPostById(req.params.postId)
    if (foundPost) {
        res.status(HTTP_STATUSES.OK_200).send(foundPost)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
postsRouter.put('/:postId',
    authGuardMiddleware,
    validatePosts(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl, blogId} = req.body
        const postId = req.params.postId
        const isUpdated = postsRepository.updatePost(postId, name, description, websiteUrl, blogId)
        isUpdated ? res.send(postsRepository.findPostById(postId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
postsRouter.delete('/:postId',
    authGuardMiddleware,
    (req:Request, res:Response) => {
        const isDeleted = postsRepository.deletePost(req.params.postId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })