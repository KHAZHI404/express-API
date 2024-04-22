import {WithId} from "mongodb";

export type BlogDbType = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type InputBlogType = {
    name: string
    description: string
    websiteUrl: string
}

export type OutputBlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type Paginator<OutputBlogsType> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items:	OutputBlogsType[]
}

export const blogMapper = (blog: WithId<BlogDbType>): OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}

export class inputBlogType {
}