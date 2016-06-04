import express from 'express';
import database from '../config/database';

database.connect();

const app = express();

app.get('/', (req, res) => {
  res.send({
    latestEpisodes: {
      method: 'GET',
      uri: '/api/user/{username}/latest_episodes'
    },
    feeds: {
      method: 'GET',
      uri: '/api/user/{username}/feeds'
    },
    episodes: {
      method: 'GET',
      uri: '/api/user/{username}/feeds/{feed_id}/episodes'
    }
  });
});

export default app;
