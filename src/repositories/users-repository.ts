import {UserDbModel, userMapper, UserViewModel} from "../models/users-models/users-models";
import {postsCollection, usersCollection} from "../db/db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";


export const usersRepository = {

    async getAllUsers() {
        return usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    async createUser(user: UserDbModel): Promise<UserViewModel> {
        const result: InsertOneResult<UserDbModel> = await usersCollection.insertOne({...user})
        return userMapper({_id: result.insertedId, ...user})
    },

    async findUserById(id: ObjectId) {
        let product = await usersCollection.findOne({_id: id})
        return product ? product : null
    },

    async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbModel> | null> {
        return await usersCollection.findOne({ $or: [ { email: loginOrEmail },
                { userName: loginOrEmail } ] } )
    },

    async deleteAll() {
        const result = await usersCollection.deleteMany({})
    },


}