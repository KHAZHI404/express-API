import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt-ts'
import {UserDbModel, UserViewModel} from "../models/users-models/users-models";
import {usersRepository} from "../repositories/users-repository";


export const usersService = {
    async createUser(user: UserDbModel) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(user.password, passwordSalt)

        const newUser: UserViewModel = {
            _id: new ObjectId(),
            userName: user.login,
            email: user.email,
            passwordHash,
            passwordSalt,
            createdAt: new Date(),
        }
        return usersRepository.createUser(newUser)
    },


    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        console.log('hash', hash)
        return hash
    },



    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    },
}