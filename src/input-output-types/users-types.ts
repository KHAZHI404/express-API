import {ObjectId, WithId} from "mongodb";

export type UserDbType = {
    _id: ObjectId,
    accountData: {
        userName: string,
        email: string,
        passwordHash: string,
        createdAt: string,
    },
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date,
        isConfirmed: boolean
    }
}

export type InputUserType = {
    login: string
    email: string
    password: string
}

export type OutputUserType = {
    id: string
    login: string
    email: string
    createdAt: string
}

export type Paginator<OutputUserType> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: [OutputUserType]
}
export const userMapper = (user: WithId<UserDbType>): OutputUserType => {
    return {
        id: user._id.toString(),
        login: user.accountData.userName,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt,
    }
}