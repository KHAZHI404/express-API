import {body} from "express-validator";

export const validateUsers = () => [
    body('login')
        .isString()
        .trim()
        .withMessage('errors in login'),
    body('email')
        .isString()
        .trim()
        // .matches(websiteUrlPattern) // Проверяем email на паттерн
        .withMessage('errors in email'),
]