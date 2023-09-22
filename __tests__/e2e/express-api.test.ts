import request from "supertest";
import {app} from "../../src";

describe('/videos', () => {

    it('should return 200 and array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [ { id: '1', title: 'Name 1', author: 'Author 1' },
                { id: '2', title: 'Name 2', author: 'Author 2' }])
    });


})