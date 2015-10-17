import mongoose from 'mongoose';
import clearDB from 'mocha-mongoose';

import UserFeed from '../../../../src/models/userFeed';
import UserFeedsRepository from '../../../../src/api/user/feeds/repository';

describe('UserFeedsRepository', () => {
  const dbURI = `mongodb://${process.env.MONGODB_HOSTS}/mypodcasts-api-test`;
  let userFeed = new UserFeed({
    title: 'Some podcast',
    image: {
      url: 'http://image.com/poscast.jpg'
    }
  });

  beforeEach((done) => {
    clearDB(dbURI)(done);
  });

  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach((done) => {
    UserFeed.create(userFeed, (err, created) => {
      userFeed = created;

      done();
    });
  });

  const userName = 'johndoe';

  it('fetch all feeds by userName', (done) => {
    UserFeedsRepository.fetchBy(userName).on('data', (data) => {
      assert.deepEqual(data.toObject(), userFeed.toObject());

      done();
    });
  });
});
