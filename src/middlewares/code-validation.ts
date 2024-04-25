import { body } from "express-validator";
import { usersRepository } from "../repositories/users-repository";
import { inputCheckErrorsMiddleware } from "./input-validation-middleware";

export const alreadyConfirm = body('code').custom(async (code) => {
        const userByCode = await usersRepository.findUserByConfirmationCode(code);
        if (userByCode?.emailConfirmation.isConfirmed) {
            throw new Error('Code already confirmed');
        }
        return true;
    });

    export const codeDoesntExist = body('code').custom(async (code) => {
        const userByCode = await usersRepository.findUserByConfirmationCode(code);
        if (!userByCode) {
            throw new Error('Code doesnt exist');
        }
        return true;
    });

export const codeValidation = body('code')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('errors in code');


        export const confirmationValidation = () => [codeDoesntExist, alreadyConfirm, codeValidation, inputCheckErrorsMiddleware];
