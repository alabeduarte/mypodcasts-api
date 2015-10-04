import express from 'express';
const app = express();

app.get('/:username/feeds/', (req, res) => {
  res.send('');
})

app.get('/:username/latest_episodes', (req, res) => {
  res.send('');
});

export default app;
