import express from 'express';
import database from '../config/database';

database.connect();

const app = express();

app.get('/', (req, res) => {
  res.send({ success: true });
});

export default app;
