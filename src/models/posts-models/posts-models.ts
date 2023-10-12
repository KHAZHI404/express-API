export type h02dbPostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type h03PostViewModel = {
    id:	string
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
    createdAt: string
}
export type Paginator<h03dbPostViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: h03PostViewModel
}