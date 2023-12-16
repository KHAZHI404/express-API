import {body} from "express-validator";

export const validateAuthorization = () => [
    body('loginOrEmail')
        .isString()
        .trim()
        .withMessage('errors in loginOrEmail'),
    body('password')
        .isString()
        .trim()
        .withMessage('errors in password'),
]