import {body} from "express-validator";

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

export const validatePostsInBlog = () => [
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
        .withMessage('errors in content')

]