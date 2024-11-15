const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
  res.send('app');
});

module.exports = router;
