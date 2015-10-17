import request from 'supertest';
import user from '../../../src/api/user';

describe('user', () => {
  describe('GET /:username/feeds', () => {
    it('returns success!', (done) => {
      request(user).get('/johndoe/feeds/').expect(200, '', done);
    });
  });

  describe('GET /:username/latest_episodes', () => {
    it('returns success!', (done) => {
      request(user).get('/johndoe/latest_episodes/').expect(200, '', done);
    });
  });
});
