import request from "supertest";
import {app} from "../../src";

describe('/videos', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })

    it('should return 200 and array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    });

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/videos/123123241233')
            .expect(404)
    });

    it('shouldnt return 404 for not existing course', async () => {
        await request(app)
            .post('/videos/123123241233')
            .send({ title: 'something', author: '' })
            .expect(404)
    });
})