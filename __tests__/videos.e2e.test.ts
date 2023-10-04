import request from "supertest";
import {app, HTTP_STATUSES, RouterPaths} from "../src/setting";
import express from "express";
import {h01UpdateVideoInputModel, h01Video, h01CreateVideoInputModel} from "../src/types";

describe('test for /videos', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPaths.videos)
            .expect(HTTP_STATUSES.OK_200, [])
    });

    it('should return 404 for not existing video', async () => {
        await request(app)
            .get(`${RouterPaths.videos}/123`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it(`shouldn't return 404 for not existing video`, async () => {
        const data: h01CreateVideoInputModel = {title: 'Title 1', author: '',}

        await request(app)
            .post(RouterPaths.videos)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get(RouterPaths.videos)
            .expect(HTTP_STATUSES.OK_200, [])
    });

    let createdVideo :any = null;
    it('should create video with correct input data', async () => {
        const data: h01CreateVideoInputModel = {title: 'Title test', author: 'Author test',}

        const createResponce = await request(app)
            .post(RouterPaths.videos)
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createdVideo = createResponce.body

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: 'Title test',
            author: 'Author test',
            availableResolutions: expect.any(String), //как сюда добавить енам?
            canBeDownloaded: createdVideo.canBeDownloaded, // как добавить ани булевое значение?
            createdAt: expect.any(String),
            minAgeRestriction: expect.any(Number),
            publicationDate: expect.any(String),
        })

        await request(app)
            .get(RouterPaths.videos)
            .expect(HTTP_STATUSES.OK_200, [createdVideo])

    });

    it(`shouldn't update video with incorrect input data`, async () => {
        const data :h01CreateVideoInputModel = {title: '', author: 'Author test',}

        await request(app)
            .put(`${RouterPaths.videos}/${createdVideo.id}`)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)


        await request(app)
            .get(`${RouterPaths.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.OK_200, createdVideo)

    });
    it('shouldnt update video that not exist', async () => {
        const data :h01UpdateVideoInputModel = {title: 'Title test', author: 'Author test',}

        await request(app)
            .put(`${RouterPaths.videos}/${-100}`)
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });
    it(`shouldn update video with correct input data`, async () => {
        const data :h01CreateVideoInputModel = {title: 'Title test', author: 'Author test',}

        await request(app)
            .put(`${RouterPaths.videos}/${createdVideo.id}`)
            .send(data)
            .expect(HTTP_STATUSES.OK_200)


        await request(app)
            .get(`${RouterPaths.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdVideo,
                title: data.title,
                author: data.author
            })

    });

    it('should delete both video', async () => {
        await request(app)
            .delete(`${RouterPaths.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .delete(`${RouterPaths.videos}/${createdVideo.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
            .get(RouterPaths.videos)
            .expect(HTTP_STATUSES.OK_200, [])
    })
    afterAll(done => {
        done()
    })
})