import express from 'express';
import UserFeedsRepository from './repository';
import userFeedsEpisodes from './episodes';

const app = express();

app.use('/', userFeedsEpisodes);

app.get('/:username/feeds/', (req, res) => {
  UserFeedsRepository.fetchBy(req.params.username).then( (userFeeds) => {
    const representer = userFeeds.map( (userFeed) => {
      return {
        id: userFeed.id,
        title: userFeed.title,
        image: { url: userFeed.image.url }
      }
    });

    res.send(representer);
  });
})

export default app;
