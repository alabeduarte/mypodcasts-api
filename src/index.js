import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send({ success: true });
});

export default app;
