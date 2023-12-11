import {WithId} from "mongodb";
import {UserDbModel} from "../models/users-models/users-models";

export type APIErrorResult = {
    errorsMessages: FieldError
}
export type FieldError = {
    message: string
    field: string
}
export type SortDirections = {
    enum: "asc" | "desc"
}
