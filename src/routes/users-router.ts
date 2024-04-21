import {Request, Response, Router} from "express";
import {HTTP_STATUSES} from "../setting";
import {usersQueryRepository} from "../query-repositories/users-query-repository";
import {inputCheckErrorsMiddleware} from "../middlewares/input-validation-middleware";
import {validateUsers} from "../models/users-models/users-validate";
import {basicAuth} from "../middlewares/auth-middleware";
import {getPageOptions} from "../types/types";
import {userService} from "../domain/user-service";


export const usersRouter = Router({})

usersRouter.get('/',
    basicAuth,
    async (req: Request, res: Response) => {
        const { pageNumber, pageSize, sortBy, sortDirection } = getPageOptions(req.query);
        const searchLoginTerm = req.query.searchLoginTerm ? req.query.searchLoginTerm.toString() : null
        const searchEmailTerm = req.query.searchEmailTerm ? req.query.searchEmailTerm.toString() : null


        const foundUsers = await usersQueryRepository.findUsers(pageNumber, pageSize,
        sortBy, sortDirection, searchLoginTerm, searchEmailTerm)
        return res.send(foundUsers)
})

usersRouter.post('/',
    basicAuth,
    validateUsers(),
    inputCheckErrorsMiddleware,
    async (req: Request, res: Response): Promise<void> => {
    const newUser = await userService.createUser(req.body)
    res.status(HTTP_STATUSES.CREATED_201).send(newUser)
})

usersRouter.delete('/:id',
    basicAuth,
    async (req: Request, res: Response) => {
    const isDeleted = await userService.deleteUser(req.params.id)
        isDeleted ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })