export const h01Resulutions = {
    'P144': 'P144', 'P240': 'P240', 'P360': 'P360', 'P480': 'P480',
    'P720': 'P720', 'P1080': 'P1080', 'P1440': 'P1440', 'P2160': 'P2160'
}

export type h01CreateVideoInputModel = {
    title: string
    author: string
    availableResolutions: keyof typeof h01Resulutions
}
export type h01UpdateVideoInputModel = {
    title: string
    author: string
    availableResolutions?: keyof typeof h01Resulutions
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null
    publicationDate?: string
}
export type h01Video = {
    id: string
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: keyof typeof h01Resulutions
}