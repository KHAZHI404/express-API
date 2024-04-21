import {usersCollection} from "../db/db";
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {OutputUserType, UserDbType, userMapper} from "../input-output-types/users-types";


export const usersRepository = {

    async getAllUsers() {
        return usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    // async createUserAccount(user: UserDbModel): Promise<UserViewModel> {
    //     const result: InsertOneResult<UserDbModel> = await usersAccountsCollection.insertOne({...user})
    //     return userAccountMapper({_id: result.insertedId, ...user})
    // },

    async updateConfirmation(id: string) {
        if(!ObjectId.isValid(id)) return false
        const result = await usersCollection.updateOne({_id: new ObjectId(id)},
          {$set: {'emailConfirmation.isConfirmed': true}})
        return result.matchedCount === 1 //modifiedCount === 1
    },

    async updateReqCode(email: string, code: string, data: Date) {
        await usersCollection.updateOne({"accountData.email": email}, {$set: {
            "emailConfirmation.confirmationCode": code,
                "emailConfirmation.experationDate": data,
            }})
    },

    async findUserByConfirmationCode(code: string) {
      const user = await usersCollection.findOne( {'emailConfirmation.confirmationCode': code})
        return user ? user : null
    },

    async createUser(user: UserDbType): Promise<OutputUserType> {
        const result: InsertOneResult<UserDbType> = await usersCollection.insertOne({...user})
        return userMapper({...user})
    },

    async findUserById(id: string) {
        if(!ObjectId.isValid(id)) return false
        let product = await usersCollection.findOne({_id: new ObjectId(id)})
        return product ? product : null
    },

    async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
        const user = await usersCollection.findOne({ $or: [ { "accountData.email": loginOrEmail }, { "accountData.userName": loginOrEmail } ] } )
        return user
    },

    async deleteUser(id: string): Promise<boolean> {
        if(!ObjectId.isValid(id)) return false
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAll() {
        return  usersCollection.deleteMany({})
    },

}