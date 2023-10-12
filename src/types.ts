export type APIErrorResult = {
    errorsMessages: FieldError
}
export type FieldError = {
    message: string
    field: string
}
export type h04SortDirections = {
    enum: "asc" | "desc"
}