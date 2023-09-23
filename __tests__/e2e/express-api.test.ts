import request from "supertest";
import {app, HTTP_STATUSES} from "../../src";
import express from "express";

describe('test for /videos', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })

    it('should return 200 and array', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [])
    });

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/videos/123123241233')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('shouldnt return 404 for not existing course', async () => {
        await request(app)
            .post('/videos')
            .send({ title: 'something', author: '' })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    });

    it('should return 404 for not existing course', async () => {
        const createRespnce = await request(app)
            .post('/videos')
            .send({ title: 'something', author: 'sdgsdfg' })
            .expect(HTTP_STATUSES.CREATED_201)

        const createdVideo = createRespnce.body

        expect(createdVideo).toEqual({
            id: expect.any(String),
            title: 'something',
            author: 'sdgsdfg'
        })

        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [createdVideo])

    });
})