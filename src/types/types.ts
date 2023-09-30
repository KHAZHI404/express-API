export type h01Resulutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]




export type APIErrorResult = {
    errorsMessages: FieldError
}
export type FieldError = {
    message: string
    field: string
}
export type h01CreateVideoInputModel = {
    title: string
    author:	string
    availableResolutions: h01Resulutions[]
}
export type h01UpdateVideoInputModel = {
    title: string
    author:	string
    availableResolutions: h01Resulutions[]
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
}
export type h01Video = {
    id: number
    title: string
    author:	string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string
}