import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {inputValidationMiddleware, validateBlogs} from '../middlewares/input-validation-middleware'
import {h01Video, h02dbBlogInputModel, h02dbBlogViewModel} from "../types";
import {blogsRepository} from "../repositories/blogs-repository";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";

export const blogsRouter = Router({})


blogsRouter.get('/', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogs(req.query.name?.toString())
    res.send(foundBlog)
})
blogsRouter.post('/',
    authGuardMiddleware,
    validateBlogs(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl} = req.body
        const newBlog: h02dbBlogInputModel = blogsRepository.createBlog(name, description, websiteUrl)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })
blogsRouter.get('/:blogId', (req: Request, res: Response) => {
    const foundBlog : h02dbBlogViewModel | undefined = blogsRepository.findBlogById(req.params.blogId)
    if (foundBlog) {
        res.status(HTTP_STATUSES.OK_200).send(foundBlog)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
blogsRouter.put('/:blogId',
    authGuardMiddleware,
    validateBlogs(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl} = req.body
        const blogId = req.params.blogId
        const isUpdated = blogsRepository.updateBlog(blogId, name, description, websiteUrl)
        isUpdated ? res.send(blogsRepository.findBlogById(blogId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
blogsRouter.delete('/:blogId',
    authGuardMiddleware,
    (req:Request, res:Response) => {
        const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })