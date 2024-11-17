const express = require('express');
const {
  addComment,
  getAllComments,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} = require('../controllers/comment');

const router = express.Router();

router.post('/', addComment);
router.get('/', getAllComments);
router.get('/post/:postId', getCommentsByPostId);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
