import {body} from "express-validator";

const websiteUrlPattern = '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'

export const validateBlogs = () => [
    body('name')
        .isString()
        .trim()
        .isLength({max: 15})
        .withMessage('errors in name'),
    body('description')
        .isString()
        .trim()
        .isLength({max: 500})
        .withMessage('errors in description'),
    body('websiteUrl')
        .matches(websiteUrlPattern)
        .isString()
        .trim()
        .isLength({max: 100})
        .withMessage('errors in websiteUrl')
]

export const validatePostsInBlog = () => [
    body('title')
        .isString()
        .trim()
        .isLength({max: 30})
        .withMessage('errors in title'),
    body('shortDescription')
        .isString()
        .trim()
        .isLength({max: 100})
        .withMessage('errors in shortDescription'),
    body('content')
        .isString()
        .trim()
        .isLength({max: 1000})
        .withMessage('errors in content')

]