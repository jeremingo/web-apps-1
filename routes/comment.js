const express = require('express');
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require('../controllers/comment');

const router = express.Router();

router.post('/', addComment);
router.get('/:postId?', getComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
