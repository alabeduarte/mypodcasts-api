import clearDB from 'mocha-mongoose';

import simple from 'simple-mock';
import faker from 'faker'

import User from '../../../../src/models/user';
import UserFeed from '../../../../src/models/userFeed';
import UserFeedsRepository from '../../../../src/api/user/feeds/repository';
import EpisodesRepository from '../../../../src/api/user/feeds/episodes/repository';

import database from '../../../../config/database';

beforeEach((done) => {
  clearDB(database.uri)(done);
});

beforeEach((done) => {
  if (database.isAlreadyConnected()) return done();
  database.connect(done);
});

describe('UserFeedsRepository', () => {
  describe('.fetchBy', () => {
    let user = new User({ username: faker.internet.userName() });
    let userFeed = new UserFeed({ userId: user.id });

    beforeEach((done) => {
      User.create(user, (err, created) => {
        user = created;

        UserFeed.create(userFeed, (err, created) => {
          userFeed = created;

          done();
        });
      });
    });

    it('returns all feeds that match with username', (done) => {
      const promise = UserFeedsRepository.fetchBy(user.username);

      promise.then((data) => {
        assert.deepEqual([userFeed.toObject()], data);

        done();
      }).catch((err) => {
        done(err);
      });
    });

    describe('when there is another feed belonged to another user', () => {
      let anotherUser = new User({ username: faker.internet.userName() });
      let anotherUserFeed = new UserFeed({ userId: anotherUser.id });

      beforeEach((done) => {
        User.create(anotherUser, (err, created) => {
          anotherUser = created;

          UserFeed.create(anotherUserFeed, (err, created) => {
            anotherUserFeed = created;

            done();
          });
        });
      });

      it('returns all feeds that match with username', (done) => {
        const promise = UserFeedsRepository.fetchBy(anotherUser.username);

        promise.then((data) => {
          assert.deepEqual([anotherUserFeed.toObject()], data);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    describe('when username does not exists', () => {
      it('returns empty array', (done) => {
        const promise = UserFeedsRepository.fetchBy('DOES_NOT_EXISTS');

        promise.then((data) => {
          assert.deepEqual([], data);

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });

  describe('.getEpisodes', () => {
    const episodes = [{}];
    let userFeed = new UserFeed(
      {
        id: faker.random.uuid(),
        rssUrl: faker.internet.url(),
        title: faker.lorem.sentence(),
        image: faker.image.imageUrl()
      }
    );

    beforeEach((done) => {
      simple.mock(EpisodesRepository, 'getEpisodes').resolveWith(episodes);

      UserFeed.create(userFeed, (err, created) => {
        userFeed = created;

        done();
      });
    });

    afterEach( () => {
      simple.restore();
    });

    it('returns a feed that match with feedId', (done) => {
      const promise = UserFeedsRepository.getEpisodes(userFeed.id);

      promise.then((data) => {
        assert.deepEqual(
          {
            id: userFeed.id,
            title: userFeed.title,
            image: userFeed.image,
            episodes: episodes
          }, data
        );

        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
