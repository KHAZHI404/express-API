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