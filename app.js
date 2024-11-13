const dotenv = require('dotenv').config();
const express = require('express');

const indexRouter = require('./routes');
const postsRouter = require('./routes/post');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => { console.error(err) });
db.on('open', () => { console.log('connected to mongo') });

const app = express();
const port = process.env.PORT;

app.use('/', indexRouter);
app.use('/post', postsRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

