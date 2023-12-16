import bcrypt from 'bcrypt'
import {CreateUserInputModel, UserDbModel, userMapper, UserViewModel} from "../models/users-models/users-models";
import {usersRepository} from "../repositories/users-repository";
import {ObjectId, WithId} from "mongodb";
import {LoginInputModel} from "../models/login-models/login-models";
import {usersCollection} from "../db/db";


export const usersService = {

    async createUser(body: CreateUserInputModel): Promise<UserViewModel> { //тут в видосе нужен юзерДБ тайп, зачем непонятно

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(body.password, passwordSalt)


        const newUser: UserDbModel = {
            login: body.login,
            email: body.email,
            password: passwordHash,
            createdAt: new Date().toISOString(),
        }

        return usersRepository.createUser(newUser)
    },

    async deleteUser(id: string): Promise<boolean> {
        return usersRepository.deleteUser(id)
    },

    async checkCredentials(body: LoginInputModel) {
        const user: WithId<UserDbModel> | null = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return null
        const compare = await bcrypt.compare(body.password, user.password)
        if (compare) {
            return user
        }
        return null
    },

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },

    async findUserById(userId: ObjectId | null) {
        const user = await usersRepository.findUserById(userId!)
        if (!user) return null
        return userMapper(user)

    }
}