import feedparser from 'feedparser-promised';

export default class EpisodesRepository {

  static getEpisodes (feed) {
    return feedparser.parse(feed.rssUrl).then( (result) => {
      return result.map( (feed) => {
        return {
          title: feed.title,
          publishedDate: feed.pubdate,
          description: feed.description,
          duration: feed['itunes:duration']['#'],
          audio: feed.enclosures[0]
        };
      });
    });
  }
}
