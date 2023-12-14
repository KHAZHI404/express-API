import bcrypt from 'bcrypt'
import {CreateUserInputModel, LoginInputModel, UserDbModel, UserViewModel} from "../models/users-models/users-models";
import {usersRepository} from "../repositories/users-repository";
import {ObjectId, WithId} from "mongodb";
import {usersCollection} from "../db/db";


export const usersService = {

    async createUser(body: CreateUserInputModel): Promise<UserViewModel> {

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
        if(!ObjectId.isValid(id)) return false
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async checkCredentials(body: LoginInputModel) {
        const user: WithId<UserDbModel> | null = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) return false

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(body.password, passwordSalt)

        return user.password !== passwordHash
    },

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },
}