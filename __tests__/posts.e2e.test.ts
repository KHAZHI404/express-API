import {blogsTestManager, postsTestManager, req} from './test-helpers'
import {HTTP_STATUSES, SETTINGS,} from "../src/setting";
import {InputPostType} from "../src/input-output-types/posts-types";
import {InputBlogType} from "../src/input-output-types/blogs-types";



describe('test for /posts', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('should return 200 and empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: [] })

        console.log(res.body)
    });

    it('should return 404 for not existing post', async () => {
        await req
            .get(`${SETTINGS.PATH.POSTS}/123`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it(`shouldn't create post with incorrect input data`, async () => {
        const data: InputPostType = {
            title: "string",
            shortDescription: "string",
            content: "",
            blogId: "string",
        }

        await postsTestManager.createPost(data, HTTP_STATUSES.BAD_REQUEST_400)


        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(HTTP_STATUSES.OK_200, { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] })
    });

    let createdPost: any = null;
    it('should create post with correct input data', async () => {
        const blogExist: InputBlogType = {
            name: 'Title name',
            description: 'description test',
            websiteUrl: 'https://website.com'
        }
        const {createdBlogManager} = await blogsTestManager.createBlog(blogExist, HTTP_STATUSES.CREATED_201)

        const data: InputPostType = {
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: createdBlogManager.id,
        }

        const {createdPostManager} = await postsTestManager.createPost(data, HTTP_STATUSES.CREATED_201)
        createdPost = createdPostManager

        // const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
        // const codedAuth = buff2.toString('base64')

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            // .set({'Authorization': 'Basic ' + codedAuth})
            expect(res.body).toEqual({
                pagesCount: expect.any(Number),
                page: expect.any(Number),
                pageSize: expect.any(Number),
                totalCount: expect.any(Number),
                items: [createdPost]})


    });

    it(`shouldn't update post with incorrect input data`, async () => {
        const data: InputPostType = {
            title: "",
            shortDescription: "string",
            content: "string",
            blogId: "",
        }

        await req
            .put(`${SETTINGS.PATH.BLOGS}/${createdPost.id}`)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)


        // await request(app)
        //     .get(`${RouterPaths.blogs}/${createdPost.Id}`)
        //     .expect(HTTP_STATUSES.OK_200, createdPost)

    });

        it('shouldnt update blog that not exist', async () => {
            const data: InputPostType = {
                title: "string",
                shortDescription: "string",
                content: "string",
                blogId: "string",
            }

            await req
                .put(`${SETTINGS.PATH.POSTS}/-1`)
                .auth('admin', 'qwerty')
                .send(data)
                .expect(HTTP_STATUSES.NOT_FOUND_404)
        });

        it(`shouldn update blog with correct input data`, async () => {
            const data: InputPostType = {
                title: "string",
                shortDescription: "string",
                content: "string",
                blogId: createdPost.blogId,
            }

            // await request(app)
            //     .put(`${RouterPaths.posts}/${createdPost.id}`)
            //     .auth('admin', 'qwerty')
            //     .send(data)
            //     .expect(HTTP_STATUSES.OK_200)


            await req
                .get(`${SETTINGS.PATH.POSTS}/${createdPost.id}`)
                .expect(HTTP_STATUSES.OK_200, {
                    ...createdPost,
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId,
                })

        });

        it('should delete both post', async () => {
            await req
                .delete(`${SETTINGS.PATH.POSTS}/${createdPost.id}`)
                .auth('admin', 'qwerty')
                .expect(HTTP_STATUSES.NO_CONTENT_204)

            await req
                .delete(`${SETTINGS.PATH.POSTS}/${createdPost.id}`)
                .auth('admin', 'qwerty')
                .expect(HTTP_STATUSES.NOT_FOUND_404)

            await req
                .get(SETTINGS.PATH.POSTS)
                .expect(HTTP_STATUSES.OK_200,  {
                    pagesCount: 0,
                    page: 1,
                    pageSize: 10,
                    totalCount: 0,
                    items: []
                })


        })

    afterAll(done => {
        done()
    })
})
