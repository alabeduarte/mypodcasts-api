import request from 'supertest';

import user from '../../../src/api/user';

describe('GET /:username/latest_episodes', () => {
  it('returns success!', (done) => {
    request(user).get('/johndoe/latest_episodes/').expect(200, '', done);
  });
});
