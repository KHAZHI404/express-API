import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validateBlogs} from '../middlewares/input-validation-middleware'
import {blogsService} from "../domain/blogs-service";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";
import {h02dbBlogInputModel, h03BlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRouter = Router({})


blogsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const foundBlogs: h03BlogViewModel[] = await blogsService.findBlogs(req.query.name?.toString())
    res.send(foundBlogs)
})
blogsRouter.post('/',
    authGuardMiddleware,
    validateBlogs(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
        const newBlog: h02dbBlogInputModel = await blogsService.createBlog(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })
blogsRouter.get('/:blogId', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: h03BlogViewModel | null = await blogsService.findBlogById(req.params.blogId)
    foundBlog ? res.status(HTTP_STATUSES.OK_200).send(foundBlog) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
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

blogsRouter.get('/:blogId', async (req: Request, res: Response): Promise<void> => {
    const foundBlog: h03BlogViewModel | null = await blogsService.findBlogById(req.params.blogId)
    if (foundBlog) {
        
    }
})