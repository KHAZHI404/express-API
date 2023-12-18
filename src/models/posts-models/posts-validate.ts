import {body} from "express-validator";

export const validatePosts = () => [
    body('title')
        .isString()
        .trim()
        .notEmpty()
        .isLength({max: 30})
        .withMessage('errors in title'),
    body('shortDescription')
        .isString()
        .trim()
        .notEmpty()
        .isLength({max: 100})
        .withMessage('errors in shortDescription'),
    body('content')
        .isString()
        .trim()
        .notEmpty()
        .isLength({max: 1000})
        .withMessage('errors in content'),
    body('blogId')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('errors in blogId'),
]