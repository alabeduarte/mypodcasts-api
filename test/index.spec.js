import request from 'supertest';
import app from 'src/index';

describe('index', () => {
  describe('GET /', () => {
    it('returns all available endpoints', (done) => {
      const expectedResult = {
        latestEpisodes: {
          method: 'GET',
          uri: '/api/user/{username}/latest_episodes'
        },
        feeds: {
          method: 'GET',
          uri: '/api/user/{username}/feeds'
        },
        episodes: {
          method: 'GET',
          uri: '/api/user/{username}/feeds/{feed_id}/episodes'
        }
      };

      request(app).get('/').expect(200, expectedResult, done);
    });
  });
});
