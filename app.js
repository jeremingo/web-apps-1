const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('app');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

