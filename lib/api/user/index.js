import express from 'express';
const app = express();

app.get('/:username/feeds/', (req, res) => {
  res.send([{}]);
});

export default app;
