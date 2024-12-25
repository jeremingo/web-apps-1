import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import indexRouter from './routes/index';
import postsRouter from './routes/post';
import commentRouter from './routes/comment';

import mongoose from 'mongoose';
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}
mongoose.connect(databaseUrl);
const db = mongoose.connection;
db.on('error', (err: Error) => { console.error(err) });
db.on('open', () => { console.log('connected to mongo') });

const app = express();
const port = process.env.PORT;

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/post', postsRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

