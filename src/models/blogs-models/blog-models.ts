export type h02dbBlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}
export type h02dbBlogPostInputModel = {
    title: string
    shortDescription: string
    content: string
}
export type h03BlogViewModel = {
    id:	string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
export type Paginator<h03BlogViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	h03BlogViewModel
}