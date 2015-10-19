import request from 'supertest';
import simple from 'simple-mock';
import faker from 'faker';

import index from 'src/api/user/feeds/episodes';
import repository from 'src/api/user/feeds/repository';

describe('GET /:username/feeds/:id/episodes', () => {
  const username = faker.internet.userName();
  const feedId = faker.random.uuid();

  describe('when there are episodes', () => {
    const episodes = [{}];

    const userFeed = {
      id: feedId,
      title: faker.lorem.sentence(),
      image: { url: faker.image.imageUrl() },
      episodes: episodes
    };

    const expectedJson = JSON.stringify(
      {
        id: userFeed.id,
        title: userFeed.title,
        image: { url: userFeed.image.url },
        episodes: episodes
      }
    );

    beforeEach( () => {
      simple.mock(repository, 'getEpisodes').resolveWith(userFeed);
    });

    afterEach( () => {
      simple.restore();
    });

    it('returns user feeds as JSON', (done) => {
      request(index).get(`/${username}/feeds/${feedId}/episodes`)
        .expect(200, expectedJson, done);
    });
  });

  describe('when feed does not exists', () => {
    const expectedJson = JSON.stringify({ message: 'Record not found' });

    beforeEach( () => {
      simple.mock(repository, 'getEpisodes').resolveWith(null);
    });

    afterEach( () => {
      simple.restore();
    });

    it('returns user feeds as JSON', (done) => {
      request(index).get(`/${username}/feeds/${feedId}/episodes`)
        .expect(404, expectedJson, done);
    });
  });
});
