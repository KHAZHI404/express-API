import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware'
import {blogsService} from "../domain/blogs-service";
import {BlogViewModel, Paginator} from "../models/blogs-models/blog-models";
import {postsService} from "../domain/posts-service";
import {blogsQueryRepository} from "../query-repositories/blogs-query-repository";
import {validateBlogs} from "../models/blogs-models/blog-validate";
import {validatePostsInBlog} from "../models/posts-models/posts-validate";
import {basicAuth} from "../middlewares/auth-middleware";

export const blogsRouter = Router({})


blogsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null

    const foundBlogs: Paginator<BlogViewModel> = await blogsQueryRepository.findBlogs(page, pageSize,
         sortBy, sortDirection, searchNameTerm)
    res.send(foundBlogs)
})

blogsRouter.get('/:blogId', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(req.params.blogId)
    foundBlog ? res.status(HTTP_STATUSES.OK_200).send(foundBlog) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

blogsRouter.get('/:blogId/posts', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(req.params.blogId)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const posts = await blogsQueryRepository.getPostsForBlog(req.params.blogId, pageNumber, pageSize, sortBy, sortDirection)
    if (!posts) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.send(posts)
})

blogsRouter.post('/',
    basicAuth,
    validateBlogs(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const newBlog = await blogsService.createBlog(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })

blogsRouter.post('/:blogId/posts',
    basicAuth,
    validatePostsInBlog(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPost: any = await postsService.createPost({blogId: req.params.blogId, ...req.body})
        if (!newPost) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
        return res.status(HTTP_STATUSES.CREATED_201).send(newPost)
    }
)

blogsRouter.put('/:blogId',
    basicAuth,
    validateBlogs(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const blogId = req.params.blogId
        const isUpdated = await blogsService.updateBlog(blogId, req.body)
        isUpdated ? res.send(blogsQueryRepository.findBlogById(blogId)) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

blogsRouter.delete('/:blogId',
    basicAuth,
    async (req: Request, res: Response) => {
        const isDeleted = await blogsService.deleteBlog(req.params.blogId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })