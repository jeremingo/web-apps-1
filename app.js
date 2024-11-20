const express = require('express');

env.config(); 

const indexRouter = require('./routes');
const postsRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => { console.error(err) });
db.on('open', () => { console.log('connected to mongo') });

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/post', postsRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

