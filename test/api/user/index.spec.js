import request from 'supertest';
import user from '../../../lib/api/user';

describe('index', () => {
  describe('GET /api/user/:username/feeds', () => {
    it('returns success!', (done) => {
      request(user).get('/johndow/feeds/').expect(200, [{}], done);
    });
  });
});
