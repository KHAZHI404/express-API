import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputCheckErrorsMiddleware} from '../middlewares/input-validation-middleware'
import {blogsService} from "../domain/blogs-service";
import {postsService} from "../domain/posts-service";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {validateBlogs, validatePostsInBlog} from "../models/blogs-models/blog-validate";
import {basicAuth} from "../middlewares/auth-middleware";
import {getPageOptions} from "../types/types";
import {OutputBlogType, Paginator} from "../input-output-types/blogs-types";

export const blogsRouter = Router({})

blogsRouter.get('/',
    async (req: Request, res: Response): Promise<void> => {
    const { pageNumber, pageSize, sortBy, sortDirection } = getPageOptions(req.query);
    const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null

    const foundBlogs: Paginator<OutputBlogType> = await blogsQueryRepository.findBlogs(pageNumber, pageSize,
         sortBy, sortDirection, searchNameTerm)
    res.send(foundBlogs)
})

blogsRouter.get('/:blogId',
    async (req: Request, res: Response): Promise<void> => {
    const foundBlog: OutputBlogType | null = await blogsQueryRepository.findBlogById(req.params.blogId)
    foundBlog ? res.status(HTTP_STATUSES.OK_200).send(foundBlog) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

blogsRouter.get('/:blogId/posts',
    async (req: Request, res: Response): Promise<void> => {
    const foundBlog: OutputBlogType | null = await blogsQueryRepository.findBlogById(req.params.blogId)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const { pageNumber, pageSize, sortBy, sortDirection } = getPageOptions(req.query);

    const posts = await blogsQueryRepository.getPostsForBlog(req.params.blogId, pageNumber, pageSize, sortBy, sortDirection)
    if (!posts) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.OK_200).send(posts)
})

blogsRouter.post('/',
    basicAuth,
    validateBlogs(),
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const newBlog = await blogsService.createBlog(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })

blogsRouter.post('/:blogId/posts',
    basicAuth,
    validatePostsInBlog(),
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response) => {
        const newPost = await postsService.createPost({blogId: req.params.blogId, ...req.body})
        if (!newPost) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        return res.status(HTTP_STATUSES.CREATED_201).send(newPost)
    }
)

blogsRouter.put('/:blogId',
    basicAuth,
    validateBlogs(),
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const blogId = req.params.blogId
        const isUpdated = await blogsService.updateBlog(blogId, req.body)
        isUpdated ? res.status(HTTP_STATUSES.NO_CONTENT_204).send(blogsQueryRepository.findBlogById(blogId)) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

blogsRouter.delete('/:blogId',
    basicAuth,
    async (req: Request, res: Response) => {
        const isDeleted = await blogsService.deleteBlog(req.params.blogId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })