import {db} from "../db/db";
import {h02dbBlogInputModel, h02dbBlogViewModel} from "../models/blogs-models/blog-models";

export const blogsRepository = {
    findBlogs(name: string | null | undefined) {
        if (name) {
            return db.blogs.filter(b => b.name.indexOf(name))
        }
        return db.blogs
    },

    findBlogById(id: string): h02dbBlogViewModel | undefined {
        return db.blogs.find(b => b.id === id)
    },

    createBlog(body: h02dbBlogInputModel): h02dbBlogInputModel {
        const newBlog: h02dbBlogViewModel = {
            id: new Date().toISOString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id: string, body: h02dbBlogInputModel) {
        const blog: h02dbBlogViewModel | undefined = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = body.name
            blog.description = body.description
            blog.websiteUrl = body.websiteUrl
            return true
        }
        return false
    },

    deleteBlog(id: string) {
        for (let i = 0; i < db.blogs.length; i++) {
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