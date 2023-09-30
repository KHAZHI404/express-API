import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {FieldError} from "../types/types";
import {HTTP_STATUSES} from "../index";

export const titleValidation = () => {
    body('title')
        .isString()
        .trim()
        .isLength({max: 40})
        .withMessage('errors in title');


    body('author')
        .isString()
        .trim()
        .isLength({max: 20})
        .withMessage('errors in author')
}


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMesssage = errors.array({onlyFirstError: true}).map(error => errorsFormatter)
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorMesssage)
        return
    }
    next()
}

const errorsFormatter = (error: FieldError) => {
    return {
        message: error.message,
        field: error.field,
    }


}