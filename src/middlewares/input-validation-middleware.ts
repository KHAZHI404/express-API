import e, {NextFunction, Request, Response} from "express";
import {body, ValidationError, validationResult} from "express-validator";
import {FieldError} from "../types";
import {HTTP_STATUSES} from "../setting";

export const validateVideos = () => [
    body('title')
        .isString()
        .trim()
        .isLength({max: 4})
        .withMessage('errors in title'),
    body('author')
        .isString()
        .trim()
        .isLength({max: 2})
        .withMessage('errors in author')
]

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsMessages = errors
            .array({onlyFirstError: true})
            .map((error: ValidationError) => errorsFormatter(error))
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errorsMessages})
        return
    }
    next()
}

const errorsFormatter = (error: ValidationError) : FieldError => {
    switch (error.type){
        case "field":
            return {
                message: error.msg,
                field: error.path,
            }
        default:
            return {
                message: error.msg,
                field: 'unknown',
            }
    }
}