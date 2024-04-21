import {ObjectId} from "mongodb";

export type UserAccountModel = {
    _id: ObjectId;
    accountData: AccountDataType
    emailConfirmation: EmailConfirmationType
}

export type EmailConfirmationType = {
    confirmationCode: string
    expiretionDate: Date;
    isConfirmed: boolean
}

export type AccountDataType = {
    login: string
    email: string
    passwordHash: string
    createdAt: string
}
