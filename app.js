const dotenv = require('dotenv').config();
const express = require('express');

const indexRouter = require('./routes');
const postsRouter = require('./routes/post');

const app = express();
const port = process.env.PORT;

app.use('/', indexRouter);
app.use('/post', postsRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

