// import request from "supertest";
// import {app, HTTP_STATUSES, RouterPaths} from "../src/setting";
// import express from "express";
// import {h01UpdateVideoInputModel, h01Video, h01CreateVideoInputModel} from "../src/types";
//
// describe('test for /blogs', () => {
//
//     beforeAll(async () => {
//         await request(app)
//             .delete('/testing/all-data')
//     })
//
//     it('should return 200 and empty array', async () => {
//         await request(app)
//             .get(RouterPaths.blogs)
//             .expect(HTTP_STATUSES.OK_200, [])
//     });
//
//     it('should return 404 for not existing blog', async () => {
//         await request(app)
//             .get(`${RouterPaths.blogs}/123`)
//             .expect(HTTP_STATUSES.NOT_FOUND_404)
//     });
//
//     it(`shouldn't return 404 for not existing blog`, async () => {
//         const data = {title: 'Title 1', author: '',}
//
//         await request(app)
//             .post(RouterPaths.blogs)
//             .send(data)
//             .expect(HTTP_STATUSES.BAD_REQUEST_400)
//
//         await request(app)
//             .get(RouterPaths.blogs)
//             .expect(HTTP_STATUSES.OK_200, [])
//     });
//
//     let createdBlog :any = null;
//     it('should create blog with correct input data', async () => {
//         const data: h01CreateVideoInputModel = {title: 'Title test', author: 'Author test',}
//
//         const createResponce = await request(app)
//             .post(RouterPaths.blogs)
//             .send(data)
//             .expect(HTTP_STATUSES.CREATED_201)
//
//         createdBlog = createResponce.body
//
//         expect(createdBlog).toEqual({
//             id: expect.any(Number),
//             title: 'Title test',
//             author: 'Author test',
//             availableResolutions: expect.any(String), //как сюда добавить енам?
//             canBeDownloaded: createdBlog.canBeDownloaded, // как добавить ани булевое значение?
//             createdAt: expect.any(String),
//             minAgeRestriction: expect.any(Number),
//             publicationDate: expect.any(String),
//         })
//
//         await request(app)
//             .get(RouterPaths.blogs)
//             .expect(HTTP_STATUSES.OK_200, [createdBlog])
//
//     });
//
//     it(`shouldn't update blog with incorrect input data`, async () => {
//         const data :h01CreateVideoInputModel = {title: '', author: 'Author test',}
//
//         await request(app)
//             .put(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .send(data)
//             .expect(HTTP_STATUSES.BAD_REQUEST_400)
//
//
//         await request(app)
//             .get(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .expect(HTTP_STATUSES.OK_200, createdBlog)
//
//     });
//     it('shouldnt update blog that not exist', async () => {
//         const data :h01UpdateVideoInputModel = {title: 'Title test', author: 'Author test',}
//
//         await request(app)
//             .put(`${RouterPaths.blogs}/${-100}`)
//             .send(data)
//             .expect(HTTP_STATUSES.NOT_FOUND_404)
//     });
//     it(`shouldn update blog with correct input data`, async () => {
//         const data :h01CreateVideoInputModel = {title: 'Title test', author: 'Author test',}
//
//         await request(app)
//             .put(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .send(data)
//             .expect(HTTP_STATUSES.OK_200)
//
//
//         await request(app)
//             .get(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .expect(HTTP_STATUSES.OK_200, {
//                 ...createdBlog,
//                 title: data.title,
//                 author: data.author
//             })
//
//     });
//
//     it('should delete both blog', async () => {
//         await request(app)
//             .delete(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .expect(HTTP_STATUSES.NO_CONTENT_204)
//
//         await request(app)
//             .delete(`${RouterPaths.blogs}/${createdBlog.id}`)
//             .expect(HTTP_STATUSES.NOT_FOUND_404)
//
//         await request(app)
//             .get(RouterPaths.blogs)
//             .expect(HTTP_STATUSES.OK_200, [])
//     })
//     afterAll(done => {
//         done()
//     })
// })