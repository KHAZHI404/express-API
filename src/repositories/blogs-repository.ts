import {db, videos} from "../db/db";
import {h01Video, h02dbBlogInputModel, h02dbBlogViewModel} from "../types";


export const blogsRepository = {
    findBlogs(name: string | null | undefined) {
        if (name) {
            return db.blogs.filter(b => b.name.indexOf(name))
        }
        return videos
    },

    createBlog(name: string, description: string, websiteUrl: string): h02dbBlogInputModel  {
         const newBlog: h02dbBlogViewModel = {
            id:	'12',
            name:	'string',
            description:	'string',
            websiteUrl:	'string',
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    findBlogById(id: number) :h01Video | undefined {
        return videos.find(v => v.id === id)
    },

    updateBlog(id: number, title: string, author: string, ) {
        const video: h01Video | undefined = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            video.author = author
            return true
        }
        return false
    },

    deleteBlog(id: number) {
        for (let i=0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    },

    deleteAll() {
        db.blogs.splice(0, db.blogs.length)
    }

}