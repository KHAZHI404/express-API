import {usersCollection} from "../db/db";
import {UserDbModel, userMapper, UserViewModel} from "../models/users-models/users-models";
import {ObjectId, WithId} from "mongodb";


export const usersQueryRepository = {

    async findUsers(page: number,
                     pageSize: number,
                     sortBy: string | 'createdAt',
                     sortDirection: string,
                     searchLoginTerm: string | null,
                     searchEmailTerm: string | null,
    ) {
        const filter: any = {}
        if (searchLoginTerm) {
            filter.name = {$regex: searchLoginTerm, $options: 'i'}
        }
        if (searchEmailTerm) {
            filter.name = {$regex: searchEmailTerm, $options: 'i'}
        }
        const sortOptions: any = []
        sortOptions[sortBy] = sortDirection === 'asc' ? 1 : -1

        const totalCount = await usersCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)
        const scip = (page - 1) * pageSize
        const users = await usersCollection
            .find(filter)
            .sort(sortOptions)
            .limit(pageSize)
            .skip(scip)
            .toArray()

        return {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items: users.map(user => userMapper(user))
        }
    },

    async findCurrentUser(userId: string): Promise<UserViewModel | null> {

            if (!ObjectId.isValid(userId)) return null

        const currentUser: WithId<UserDbModel> | null = await usersCollection.findOne({_id: new ObjectId(userId)})

        return currentUser ? userMapper(currentUser) : null
    },
}
