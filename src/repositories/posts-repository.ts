import {db} from "../db/db";
import {blogsRepository} from "./blogs-repository";
import {h02dbPostInputModel, h02dbPostViewModel} from "../models/posts-models/posts-models";


export const postsRepository = {
    findPosts(title: string | null | undefined) {
        if (title) {
            return db.posts.filter(p => p.title.indexOf(title))
        }
        return db.posts
    },

    findPostById(id: string): h02dbPostViewModel | undefined {
        return db.posts.find(b => b.id === id)
    },

    createPost(name: string, body: h02dbPostInputModel): h02dbPostInputModel | undefined {
        const newPost = {
            id: new Date().toISOString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: name,
        }
        db.posts.push(newPost)
        return newPost
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const post: h02dbPostViewModel | undefined = db.posts.find(b => b.id === id)
        const blogExist = blogsRepository.findBlogById(blogId)

        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        }
        return false
    },

    deletePost(id: string) {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1);
                return true
            }
        }
        return false
    },

    deleteAll() {
        db.posts.splice(0, db.posts.length)
    }

}