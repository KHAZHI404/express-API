import * as string_decoder from "string_decoder";

export const h01Resulutions = { 'P144': 'P144', 'P240': 'P240', 'P360': 'P360', 'P480': 'P480',
    'P720': 'P720', 'P1080': 'P1080', 'P1440': 'P1440', 'P2160': 'P2160' }
                       //как сделать это типом?как тербуюется в домашке
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
    availableResolutions?: keyof typeof h01Resulutions // это правильно?
}
export type h01UpdateVideoInputModel = {
    title: string
    author:	string
    availableResolutions?: string
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null
    publicationDate?: string
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

export type h02dbBlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}

export type h02dbBlogViewModel = {
    id:	string
    name: string
    description: string
    websiteUrl: string
}

export type h02dbPostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type h02dbPostViewModel = {
    id:	string
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
}