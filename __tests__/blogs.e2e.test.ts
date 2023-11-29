import request from "supertest";
import {app, HTTP_STATUSES, RouterPaths} from "../src/setting";
import {CreateBlogInputModel} from "../src/models/blogs-models/blog-models";

describe('test for /blogs', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPaths.blogs)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: [] })
    });

    it('should return 404 for not existing blog', async () => {
        await request(app)
            .get(`${RouterPaths.blogs}/123`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it(`shouldn't return 400`, async () => {
        const data = {title: 'Title 1', author: '',}

        await request(app)
            .post(RouterPaths.blogs)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get(RouterPaths.blogs)
            .expect(HTTP_STATUSES.OK_200, { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] })
    });

    let createdBlog: any = null;
    it('should create blog with correct input data', async () => {
        const data: CreateBlogInputModel = {
            name: 'Title name',
            description: 'description test',
            websiteUrl: 'https://website.com'
        }

        const createResponce = await request(app)
            .post(RouterPaths.blogs)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createdBlog = createResponce.body

        expect(createdBlog).toEqual(
                {
                    id: expect.any(String),
                    name: createdBlog.name,
                    description: createdBlog.description,
                    websiteUrl: createdBlog.websiteUrl,
                    createdAt: createdBlog.createdAt,
                    isMembership: createdBlog.isMembership
        }
        );


        await request(app)
            .get(RouterPaths.blogs)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 1, // захардкодил, как сделать правильно?
                page: 1,
                pageSize: 10,
                totalCount: 1,
                items: [createdBlog]
            })

    });

    it(`shouldn't update blog with incorrect input data`, async () => {
        const data: CreateBlogInputModel = {name: '', description: 'Author test', websiteUrl: 'https://website.com'}

        await request(app)
            .put(`${RouterPaths.blogs}/${createdBlog.id}`)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)


        await request(app)
            .get(`${RouterPaths.blogs}/${createdBlog.id}`)
            .expect(HTTP_STATUSES.OK_200, createdBlog)

    });

        it('shouldnt update blog that not exist', async () => {
            const data: CreateBlogInputModel = {
                name: 'Title test',
                description: 'Author test',
                websiteUrl: 'https://website.com'}

            await request(app)
                .put(`${RouterPaths.blogs}/-1`)
                .auth('admin', 'qwerty')
                .send(data)
                .expect(HTTP_STATUSES.NOT_FOUND_404)
        });

            it(`shouldn update blog with correct input data`, async () => {
                const data = {name: 'Title test', description: 'Author test', websiteUrl: 'https://website.com'}

                await request(app)
                    .put(`${RouterPaths.blogs}/${createdBlog.id}`)
                    .auth('admin', 'qwerty')
                    .send(data)
                    .expect(HTTP_STATUSES.OK_200)


                await request(app)
                    .get(`${RouterPaths.blogs}/${createdBlog.id}`)
                    .expect(HTTP_STATUSES.OK_200, {
                        ...createdBlog,
                        name: data.name,
                        description: data.description,
                        websiteUrl: data.websiteUrl
                    })

            });

                it('should delete both blog', async () => {
                    await request(app)
                        .delete(`${RouterPaths.blogs}/${createdBlog.id}`)
                        .auth('admin', 'qwerty')
                        .expect(HTTP_STATUSES.NO_CONTENT_204)

                    await request(app)
                        .delete(`${RouterPaths.blogs}/${createdBlog.id}`)
                        .auth('admin', 'qwerty')
                        .expect(HTTP_STATUSES.NOT_FOUND_404)

                    await request(app)
                        .get(RouterPaths.blogs)
                        .expect(HTTP_STATUSES.OK_200,  { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] })
                })


    afterAll(done => {
        done()
    })
})
