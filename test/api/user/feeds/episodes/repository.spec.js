import feedparser from 'feedparser-promised';
import EpisodesRepository from 'src/api/user/feeds/episodes/repository';

import simple from 'simple-mock';
import faker from 'faker';

describe('EpisodesRepository', () => {
  describe('.getEpisodes', () => {

    describe('when there are episodes', () => {
      const rssFeed = {
        title: faker.lorem.sentence(),
        pubdate: faker.date.recent(),
        description: faker.lorem.sentence(),
        'itunes:duration': { '#': '01:01:07' },
        enclosures: [{ url: faker.internet.url() }]
      };

      const episodes = [{
        title: rssFeed.title,
        publishedDate: rssFeed.pubdate,
        description: rssFeed.description,
        duration: rssFeed['itunes:duration']['#'],
        audio: rssFeed.enclosures[0]
      }];

      const feed = { rssUrl: faker.internet.url() };

      beforeEach( () => {
        simple.mock(feedparser, 'parse').resolveWith([rssFeed]);
      });

      afterEach( () => {
        simple.restore();
      });

      it('returns empty list of episodes', (done) => {
        const promise = EpisodesRepository.getEpisodes(feed);

        promise.then( (data) => {
          assert.deepEqual(episodes, data);

          done();
        }).catch( (err) => {
          done(err);
        });
      });
    });
  });
});
