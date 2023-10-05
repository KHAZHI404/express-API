import {h01Video, h02dbBlogViewModel} from "../types";


export let videos: h01Video[] = [{
    id: 1,
    title: 'Name 1',
    author: 'Author 1',
    canBeDownloaded: true,
    minAgeRestriction: 12,
    createdAt: '12.04.2022',
    publicationDate: '29.09.2023',
    availableResolutions: 'P144'
},
    {
        id: 2,
        title: 'Name 2',
        author: 'Author 2',
        canBeDownloaded: true,
        minAgeRestriction: 12,
        createdAt: '12.04.2022',
        publicationDate: '29.09.2023',
        availableResolutions: 'P144'
    }]
export let db = {
    blogs: [{id: '1', name: 'blog1', description: 'blog1', websiteUrl: 'blog1',},
        {id: '2', name: 'blog2', description: 'blog2', websiteUrl: 'blog2',}],
    posts: [{id:'1',
        title: 'post1',
        shortDescription: 'post1',
        content: 'post1',
        blogId:	'post1',
        blogName: 'post1'},
        {id:'2',
        title: 'post2',
        shortDescription: 'post2',
        content: 'post2',
        blogId:	'post2',
        blogName: 'post2'},],
}


