import express from 'express';
const router = express.Router();

import Post from '../controllers/post';

router.get('/', Post.getPosts);
router.get('/:id', Post.getPostById)
router.post('/', Post.addPost);
router.put('/:id', Post.updatePost);


export default router;
