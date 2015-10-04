import request from 'supertest';
import app from '../lib/index';

describe('index', () => {
  describe('GET /', () => {
    it('returns success!', (done) => {
      request(app).get('/').expect(200, { success: true }, done);
    });
  });
});
