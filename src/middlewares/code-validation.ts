import { body } from "express-validator";

export const codeValidation = body('code')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('errors in code');
