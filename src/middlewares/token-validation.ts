import { body } from "express-validator";
import { usersRepository } from "../repositories/users-repository";
import { inputValidationMiddleware } from "./input-validation-middleware";

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



    
    export const validateToken = () => [
        body('accessToken')
            .isString()
            .trim()
            .notEmpty()
            .withMessage('errors in accessToken')
    ]


        // export const tokenValidation = () => [codeDoesntExist, alreadyConfirm, validateToken, inputValidationMiddleware];





        export type TokenDbModel = {
            accessToken: string
        }
