import request from "supertest";
import {app, HTTP_STATUSES, SETTINGS} from "../src/setting";
import {CreateBlogInputModel} from "../src/models/blogs-models/blog-models";
import {CreatePostInputModel} from "../src/models/posts-models/posts-models";


type HttpKeys = keyof typeof HTTP_STATUSES
type HttpStatusType = (typeof HTTP_STATUSES)[HttpKeys];

export const blogsTestManager = {
    async createBlog(data: CreateBlogInputModel, expectedStatus: HttpStatusType) {

        const responce = await request(app)
            .post(SETTINGS.PATH.BLOGS)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(expectedStatus)

        let createdBlogManager;
        if (expectedStatus === HTTP_STATUSES.CREATED_201) {
            createdBlogManager = responce.body

            expect(createdBlogManager).toEqual(
                {
                    id: expect.any(String),
                    name: createdBlogManager.name,
                    description: createdBlogManager.description,
                    websiteUrl: createdBlogManager.websiteUrl,
                    createdAt: createdBlogManager.createdAt,
                    isMembership: createdBlogManager.isMembership
                })
        }
        return {responce, createdBlogManager};

    }
}


export const postsTestManager = {
    async createPost(data: CreatePostInputModel, expectedStatus: HttpStatusType) {

        const responce = await request(app)
            .post(SETTINGS.PATH.POSTS)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(expectedStatus)

        let createdPostManager;
        if (expectedStatus === HTTP_STATUSES.CREATED_201) {
            createdPostManager = responce.body

            expect(createdPostManager).toEqual(
                {
                    id: expect.any(String),
                    title: createdPostManager.title,
                    shortDescription: createdPostManager.shortDescription,
                    content: createdPostManager.content,
                    blogId:	createdPostManager.blogId,// как проверить точно?
                    blogName: createdPostManager.blogName,
                    createdAt: createdPostManager.createdAt,
                })
        }
        return {responce, createdPostManager};

    }
}