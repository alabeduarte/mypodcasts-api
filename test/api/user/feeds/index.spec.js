import request from 'supertest';
import simple from 'simple-mock';
import faker from 'faker';

import index from 'src/api/user/feeds';
import repository from 'src/api/user/feeds/repository';

import UserFeed from 'src/models/userFeed';

describe('GET /:username/feeds', () => {
  describe('when there are feeds', () => {
    const userFeed = new UserFeed({
      userId: faker.random.uuid(),
      title: faker.lorem.sentence(),
      image: {
        url: faker.image.imageUrl()
      }
    });

    const expectedJson = JSON.stringify(
      [
        {
          id: userFeed._id,
          title: userFeed.title,
          image: {
            url: userFeed.image.url
          }
        }
      ]
    );

    beforeEach( () => {
      simple.mock(repository, 'fetchBy').resolveWith([userFeed]);
    });

    afterEach( () => {
      simple.restore();
    });

    it('returns user feeds as JSON', (done) => {
      request(index).get('/johndoe/feeds/').expect(200, expectedJson, done);
    });
  });

  describe('when there are no feeds', () => {
    const expectedJson = JSON.stringify([]);

    beforeEach( () => {
      simple.mock(repository, 'fetchBy').resolveWith([]);
    });

    afterEach( () => {
      simple.restore();
    });

    it('returns user feeds as JSON', (done) => {
      request(index).get('/johndoe/feeds/').expect(200, expectedJson, done);
    });
  });
});
