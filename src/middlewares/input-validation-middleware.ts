import {NextFunction, Request, Response} from "express";
import {body, ValidationError, validationResult} from "express-validator";
import {FieldError} from "../types";
import {HTTP_STATUSES} from "../setting";

const websiteUrlPattern = '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'
export const validateBlogs = () => [
    body('name')
        .isString()
        .trim()
        .isLength({min: 3, max: 15})
        .withMessage('errors in name'),
    body('description')
        .isString()
        .trim()
        .isLength({min: 3, max: 500})
        .withMessage('errors in description'),
    body('websiteUrl')
        .matches(websiteUrlPattern)
        .isString()
        .trim()
        .isLength({min: 3, max: 100})
        .withMessage('errors in websiteUrl')
]
export const validatePosts = () => [
    body('title')
        .isString()
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage('errors in title'),
    body('shortDescription')
        .isString()
        .trim()
        .isLength({min: 3, max: 100})
        .withMessage('errors in shortDescription'),
    body('content')
        .isString()
        .trim()
        .isLength({min: 3, max: 1000})
        .withMessage('errors in content'),
    body('blogId')
        .isString()
        .trim()
        .withMessage('errors in blogId'),
]

// const isblogExist = (value: string) => {
//     const blogIndex = db.blogs.findIndex(el => el.id === value)
//     if (blogIndex === -1) throw new Error(errorsMessages.b)
// }
export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsMessages: FieldError[] = errors
            .array({onlyFirstError: true})
            .map((error: ValidationError) => errorsFormatter(error))
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errorsMessages})
        return
    }
    next()
}

const errorsFormatter = (error: ValidationError): FieldError => {
    switch (error.type) {
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