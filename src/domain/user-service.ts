import {usersRepository} from "../repositories/users-repository";
import bcrypt from "bcryptjs";
import {ObjectId} from "mongodb";
import {add} from "date-fns/add";
import {v4 as uuidv4} from "uuid"
import {InputUserType, OutputUserType, UserDbType, userMapper} from "../input-output-types/users-types";

export const userService = {

    async findUserById(userId: string | null) {
        const user = await usersRepository.findUserById(userId!)
        if (!user) return null
        return userMapper(user)
    },

    async createUser(body: InputUserType): Promise<OutputUserType> {
        const passwordHash = await bcrypt.hash(body.password, 10)
        const newUser: UserDbType = {
            _id: new ObjectId(),
            accountData: {
                "userName": body.login,
                "email": body.email,
                "passwordHash": passwordHash,
                "createdAt": new Date().toISOString(),
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }

        };

        return usersRepository.createUser(newUser)
    },

    async deleteUser(id: string): Promise<boolean> {
        return usersRepository.deleteUser(id)
    },

}