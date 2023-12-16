import {body} from "express-validator";
import {manual} from "openai/_shims/manual-types";

const loginPattern = '^[a-zA-Z0-9_-]*$'
const emailPattern = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'


export const validateUsers = () => [
    body('login')
        .matches(loginPattern)
        .isString()
        .trim()
        .isLength({min: 3, max: 10})
        .withMessage('errors in login'),
    body('password')
        .isString()
        .trim()
        .isLength({min: 6, max: 20})
        .withMessage('errors in password'),
    body('email')
        .matches(emailPattern)
        .isString()
        .trim()
        .withMessage('errors in email'),
]