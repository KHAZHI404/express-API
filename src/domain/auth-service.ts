import bcrypt from 'bcryptjs'
// import bcrypt from 'bcrypt' //ошибка на bcrypt
import {CreateUserInputModel, UserDbModel, UserViewModel} from "../models/users-models/users-models";
import {usersRepository} from "../repositories/users-repository";
import {ObjectId} from "mongodb";
import {LoginInputModel} from "../models/auth-models/auth-models";
import {v4 as uuidv4} from 'uuid'
import {add} from 'date-fns/add'
import {emailManager} from "../managers/email-manager";


export const authService = {

    async resendCode(email: string) {
      const user = await usersRepository.findByLoginOrEmail(email)
        if (!user) return null
        if (user.emailConfirmation.isConfirmed) return false
        const newCode = uuidv4()
        const expirationDate = add(new Date(), {
            hours: 1
        })
        await usersRepository.updateReqCode(email, newCode, expirationDate)
        const emailData = {
            email: email,
            subject: 'email confirmation',
            message:`
        <h1>Thanks for your registration</h1>
        <p>
            To finish registration, please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${newCode}'>
                complete registration
            </a>
        </p>
        <p>Код поддверждения для тестов</p>
        <p>${newCode}</p>
    `
        }
        try {
            await emailManager.sendEmailRecoveryMessage(emailData)
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    },

    async createUserAccount(inputData: CreateUserInputModel): Promise<null | boolean> {
        const userByEmail = await usersRepository.findByLoginOrEmail(inputData.login)
        if (userByEmail) return false
        const passwordHash = await bcrypt.hash(inputData.password, 10)
        const user: UserDbModel = {
            _id: new ObjectId(),
            accountData: {
                userName: inputData.login,
                email: inputData.email,
                passwordHash,
                createdAt: new Date().toISOString(),
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }
        
        const emailData = {
            email: inputData.email,
            subject: 'email confirmation',
            message:`
        <h1>Thanks for your registration</h1>
        <p>To finish registration, please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${passwordHash}'>
                complete registration
            </a>
        </p>
        <p>Код поддверждения для тестов</p>
        <p>${passwordHash}</p>
    `
        }

        const createResult= await usersRepository.createUser(user) 

        try {
            await emailManager.sendEmailRecoveryMessage(emailData)
            console.log('письмо отправлено')
            return true
        } catch (error) {
            console.error(error)
            await usersRepository.deleteUser(user._id.toString())
            return null
        }
        
        // return createResult
    },

    async checkCredentials(body: LoginInputModel) {
        const user = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return null
        if (!user.emailConfirmation.isConfirmed) return null
        const compare = await bcrypt.compare(body.password, user.accountData.passwordHash)
        if (compare) {
            return user
        }
        return null
    },

    async confirmEmail(code: string) {
        const user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false

        let result = await usersRepository.updateConfirmation(user._id.toString())
        return result
    },
}