import mongoose from 'mongoose';
import FeedsRepository from '../../../../src/api/user/feeds/repository';

const dbURI = `mongodb://${process.env.MONGODB_HOSTS}/mypodcasts-api-test`

beforeEach((done) => {
  if (mongoose.connection.db) return done();
  mongoose.connect(dbURI, done);
});

describe('FeedsRepository', () => {
  const userName = 'johndoe';
  const expectedFeeds = 'empty';

  it('fetch all feeds by userName', () => {
    expect(FeedsRepository.fetchBy(userName)).to.equal(expectedFeeds);
  });
});
