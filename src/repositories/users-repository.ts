import {UserDbModel} from "../models/users-models/users-models";
import {usersCollection} from "../db/db";
import {ObjectId} from "mongodb";


export const usersRepository = {

    async getAllUsers() {
        return usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    async createUser(user: UserDbModel) {
        const result = await usersCollection.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId): Promise<UserDbModel | null> {
        let product = await usersCollection.findOne({_id: id})
        return product ? product : null
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({ $or: [ { email: loginOrEmail }, { userName: loginOrEmail } ] } )
        return user
    }


}