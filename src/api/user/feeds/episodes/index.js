import express from 'express';
import UserFeedsRepository from '../repository';

const app = express();

app.get('/:username/feeds/:id/episodes', (req, res) => {

  UserFeedsRepository.getEpisodes(req.params.id).then( (userFeed) => {
    if (userFeed === null) {
      return res.status(404).send({ message: 'Record not found' });
    }

    res.send(userFeed);
  });
})

export default app;
