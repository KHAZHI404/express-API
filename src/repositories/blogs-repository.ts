import {db} from "../db/db";
import {h02dbBlogInputModel, h02dbBlogViewModel} from "../types";


export const blogsRepository = {
    findBlogs(name: string | null | undefined) {
        if (name) {
            return db.blogs.filter(b => b.name.indexOf(name))
        }
        return db.blogs
    },

    createBlog(name: string, description: string, websiteUrl: string): h02dbBlogInputModel  {
         const newBlog: h02dbBlogViewModel = {
            id:	new Date().toISOString(),
            name,
            description,
            websiteUrl,
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    findBlogById(id: string) :h02dbBlogViewModel | undefined {
        return db.blogs.find(b => b.id === id)
    },

    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        const blog: h02dbBlogViewModel | undefined = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        }
        return false
    },

    deleteBlog(id: string) {
        for (let i=0; i < db.blogs.length; i++) {
            if (db.blogs[i].id === id) {
                db.blogs.splice(i, 1);
                return true
            }
        }
        return false
    },

    deleteAll() {
        db.blogs.splice(0, db.blogs.length)
    }

}