import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validateBlogs} from '../middlewares/input-validation-middleware'
import {blogsService} from "../domain/blogs-service";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";
import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRouter = Router({})


blogsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const foundBlogs = await blogsService.findBlogs(page, pageSize, searchNameTerm, sortBy, sortDirection)
    res.send(foundBlogs)
})

blogsRouter.get('/:blogId/posts', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: h03BlogViewModel | null = await blogsService.findBlogById(req.params.blogId)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const posts = await blogsService.getPostsForBlog(req.params.id, page, pageSize, sortBy, sortDirection)
    res.send(posts)
})

blogsRouter.get('/:blogId', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: h03BlogViewModel | null = await blogsService.findBlogById(req.params.blogId)
    foundBlog ? res.status(HTTP_STATUSES.OK_200).send(foundBlog) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

blogsRouter.post('/',
    authGuardMiddleware,
    validateBlogs(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const newBlog: h02dbBlogInputModel = await blogsService.createBlog(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })

blogsRouter.put('/:blogId',
    authGuardMiddleware,
    validateBlogs(),
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogId = req.params.blogId
        const isUpdated = await blogsService.updateBlog(blogId, req.body)
        isUpdated ? res.send(blogsService.findBlogById(blogId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
blogsRouter.delete('/:blogId',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await blogsService.deleteBlog(req.params.blogId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

