const express = require('express');
const router = express.Router();

const Post = require('../controllers/post');

router.get('/', Post.getPosts);
router.get('/:id', Post.getPostById)
router.post('/', Post.addPost);
router.put('/:id', Post.updatePost);


module.exports = router;
