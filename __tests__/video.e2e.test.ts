import request from "supertest";
import {app, HTTP_STATUSES, RouterPaths} from "../src/setting";
import express from "express";
import {h01CreateVideoInputModel} from "../src/types";

describe('test for /videos', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })

    it('should return 200 and array', async () => {
        await request(app)
            .get(RouterPaths.videos)
            .expect(HTTP_STATUSES.OK_200, [])
    });

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/videos/123')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('shouldnt return 404 for not existing course', async () => {
        const data: h01CreateVideoInputModel = {title: 'Title 1', author: '',}
        await request(app)
            .post(RouterPaths.videos)
            .send({ title: 'something', author: 42 })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    });

    // it('shouldnt create video with incorrect input data', async () => {
    //     const createResponce = await request(app)
    //         .post('/videos')
    //         .send({ title: 'something', author: '' })
    //         .expect(HTTP_STATUSES.BAD_REQUEST_400)
    //
    //     const createdVideo = createResponce.body
    //
    //     expect(createdVideo).toEqual({
    //         id: expect.any(Number),
    //         title: 'something',
    //         author: 'sdgsdfg'
    //     })
    //
    //     await request(app)
    //         .get('/videos')
    //         .expect(HTTP_STATUSES.OK_200, [createdVideo])
    //
    // });


})