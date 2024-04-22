// @ts-ignore
import {req} from './test-helpers'
import {HTTP_STATUSES, SETTINGS} from "../src/setting";
import {inputBlogType} from "../src/input-output-types/blogs-types";
// @ts-ignore
import {blogsTestManager} from "./blogsTestManager";
// ...

// // база данных для тестов
// import { MongoMemoryServer } from 'mongodb-memory-server'
//
// // запуск виртуального сервера с временной бд
// const server = await MongoMemoryServer.create()
//
// const uri = server.getUri()
// const client: MongoClient = new MongoClient(uri)
//
// // ...
//
// // остановка виртуально сервера с бд после выполнения тестов
// await server.stop()

describe('test for /blogs', () => {
    beforeAll(async () => {
        await req.delete('/testing/all-data')
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: [] })

        console.log(res.body)
    });

    it('should return 404 for not existing blog', async () => {
        await req
            .get(`${SETTINGS.PATH.BLOGS}/123`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it(`shouldn't create blog with incorrect input data`, async () => {
        const data: inputBlogType = {
            name: 'Title name',
            description: 'description test',
            websiteUrl: ''
        }

        await blogsTestManager.createBlog(data, HTTP_STATUSES.BAD_REQUEST_400)


        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200, { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] })
    });

    let createdBlog: any = null;
    it('should create blog with correct input data', async () => {
        const data: inputBlogType = {
            name: 'Title name',
            description: 'description test',
            websiteUrl: 'https://website.com'
        }

        const {createdBlogManager} = await blogsTestManager.createBlog(data, HTTP_STATUSES.CREATED_201)
        createdBlog = createdBlogManager
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 1, // захардкодил, как сделать правильно?
                page: 1,
                pageSize: 10,
                totalCount: 1,
                items: [createdBlog]
            })

    });

    it(`shouldn't update blog with incorrect input data`, async () => {
        const data: inputBlogType = {
            name: '',
            description: 'Author test',
            websiteUrl: 'https://website.com'
        }

        await req
            .put(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
            .auth('admin', 'qwerty')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)


        await req
            .get(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
            .expect(HTTP_STATUSES.OK_200, createdBlog)

    });

    it('shouldnt update blog that not exist', async () => {
            const data: inputBlogType = {
                name: 'Title test',
                description: 'Author test',
                websiteUrl: 'https://website.com'
            }

            await req
                .put(`${SETTINGS.PATH.BLOGS}/-1`)
                .auth('admin', 'qwerty')
                .send(data)
                .expect(HTTP_STATUSES.NOT_FOUND_404)
        });

    it(`shouldn update blog with correct input data`, async () => {
                const data: inputBlogType = {
                    name: 'Title test',
                    description: 'Author test',
                    websiteUrl: 'https://website.com'
                }

                await req
                    .put(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
                    // .auth('admin', 'qwerty')
                    .send(data)
                    .expect(HTTP_STATUSES.OK_200)


                await req
                    .get(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
                    .expect(HTTP_STATUSES.OK_200, {
                        ...createdBlog,
                        name: data.name,
                        description: data.description,
                        websiteUrl: data.websiteUrl
                    })

            });

    it('should delete both blog', async () => {
        await req
            .delete(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
            .auth('admin', 'qwerty')
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await req
            .delete(`${SETTINGS.PATH.BLOGS}/${createdBlog.id}`)
            .auth('admin', 'qwerty')
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(HTTP_STATUSES.OK_200, {
                pagesCount: 0,
                page: 1,
                pageSize: 10,
                totalCount: 0,
                items: []
            })
    });

    // it('should create post width blog Id', async () => {
    //     await request(app)
    // });

    afterAll(done => {
        done()
    })
})
