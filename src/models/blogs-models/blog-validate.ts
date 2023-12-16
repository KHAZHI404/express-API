import {body} from "express-validator";

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