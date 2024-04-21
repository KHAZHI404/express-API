import {WithId} from "mongodb";

export type PostDbType = {
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
    createdAt: string
}
export type InputPostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}


export type OutputPostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
    createdAt: string
}
export type Paginator<PostViewModel> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostViewModel[]
}

export const postMapper = (post: WithId<PostDbType>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId:	post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    }
}