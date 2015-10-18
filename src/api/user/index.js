import express from 'express';
import userFeeds from './feeds';

const app = express();

app.use('/', userFeeds);

app.get('/:username/latest_episodes', (req, res) => {
  res.send('');
});

export default app;
