import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {videosRepository} from "../repositories/videos-repository";
import {inputValidationMiddleware, validateVideos} from '../middlewares/input-validation-middleware'
import {h01Video, h02dbBlogViewModel} from "../types";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})


blogsRouter.get('/', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogs(req.query.name?.toString())
    res.send(foundBlog)
})
blogsRouter.post('/',
    validateVideos(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl} = req.body
        const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
    })
blogsRouter.get('/:blogId', (req: Request, res: Response) => {
    const foundBlog : h01Video | undefined = blogsRepository.findBlogById(+req.params.blogId)
    if (foundBlog) {
        res.status(HTTP_STATUSES.OK_200).send(foundBlog)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
blogsRouter.put('/:blogId',
    validateVideos(),
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const { title, author} = req.body
        const blogId = +req.params.blogId
        const isUpdated = blogsRepository.updateBlog(blogId, title, author)
        isUpdated ? res.send(blogsRepository.findBlogById(blogId)) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
blogsRouter.delete('/:blogId',
    (req:Request, res:Response) => {
        const isDeleted = blogsRepository.deleteBlog(+req.params.videoId)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })