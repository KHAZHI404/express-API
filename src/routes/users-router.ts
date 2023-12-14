import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {HTTP_STATUSES} from "../setting";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {inputValidationMiddleware, validateUsers} from "../middlewares/input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/auth-guard-middleware";


export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : 'createdAt'
    const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc'

    const searchLoginTerm = req.query.searchLoginTerm ? req.query.searchLoginTerm.toString() : null
    const searchEmailTerm = req.query.searchEmailTerm ? req.query.searchEmailTerm.toString() : null


    const foundUsers = await usersQueryRepository.findUsers(page, pageSize,
        sortBy, sortDirection, searchLoginTerm, searchEmailTerm)
    return res.send(foundUsers)
})
usersRouter.post('/',
    // authGuardMiddleware,
    validateUsers(),
    inputValidationMiddleware,
    async (req: Request, res: Response): Promise<void> => {
    const newUser = await usersService.createUser(req.body)
    res.status(HTTP_STATUSES.CREATED_201).send(newUser)
})

usersRouter.delete('/id',
    // authGuardMiddleware,
    async (req: Request, res: Response) => {
    const isDeleted = await usersService.deleteUser(req.params.id)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })
