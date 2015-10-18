import mongoose from 'mongoose';
import clearDB from 'mocha-mongoose';

import faker from 'faker'

import User from '../../../../src/models/user';
import UserFeed from '../../../../src/models/userFeed';
import UserFeedsRepository from '../../../../src/api/user/feeds/repository';

const dbURI = `mongodb://${process.env.MONGODB_HOSTS}/mypodcasts-api-test`;

beforeEach((done) => {
  clearDB(dbURI)(done);
});

beforeEach((done) => {
  if (mongoose.connection.db) return done();
  mongoose.connect(dbURI, done);
});

describe('UserFeedsRepository', () => {
  describe('.fetchBy', () => {
    let user = new User({
      username: faker.internet.userName()
    });

    let userFeed = new UserFeed({
      userId: user.id,
      title: faker.lorem.sentence(),
      image: {
        url: faker.image.imageUrl()
      }
    });

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
        assert.deepEqual(
          [userFeed.toObject()],
          data
          );

        done();
      }).catch((err) => {
        done(err);
      });
    });

    describe('when there is another feed belonged to another user', () => {
      let anotherUser = new User({
        username: faker.internet.userName()
      });

      let anotherUserFeed = new UserFeed({
        userId: anotherUser.id,
        title: faker.lorem.sentence(),
        image: {
          url: faker.image.imageUrl()
        }
      });

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
          assert.deepEqual(
            [anotherUserFeed.toObject()],
            data
          );

          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });
});
