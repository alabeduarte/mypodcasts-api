import request from 'supertest';
import simple from 'simple-mock';
import faker from 'faker';

import index from '../../../../../src/api/user/feeds/episodes';
import repository from '../../../../../src/api/user/feeds/repository';

import UserFeed from '../../../../../src/models/userFeed';

describe('GET /:username/feeds/:id/episodes', () => {
  const username = faker.internet.userName();
  const feedId = faker.random.uuid();

  describe('when there are episodes', () => {
    const episodes = [
      {
        title: faker.lorem.sentence(),
        publishedDate: faker.date.recent(),
        description: faker.lorem.sentence(),
        audio: {
          url: faker.internet.url(),
          length: faker.random.number(),
          type: 'audio/mpeg'
        }
      }
    ];

    const userFeed = new UserFeed({
      id: feedId,
      title: faker.lorem.sentence(),
      image: { url: faker.image.imageUrl() }
    });

    const expectedJson = JSON.stringify(
      {
        id: userFeed.id,
        title: userFeed.title,
        image: { url: userFeed.image.url },
        episodes: episodes
      }
    );

    beforeEach( () => {
      simple.mock(userFeed, 'episodes').returnWith(episodes);
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

  describe('when there are no episodes', () => {
    const episodes = [];

    const userFeed = new UserFeed({
      id: feedId,
      title: faker.lorem.sentence(),
      image: { url: faker.image.imageUrl() }
    });

    const expectedJson = JSON.stringify(
      {
        id: userFeed.id,
        title: userFeed.title,
        image: { url: userFeed.image.url },
        episodes: episodes
      }
    );

    beforeEach( () => {
      simple.mock(userFeed, 'episodes').returnWith(episodes);
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
