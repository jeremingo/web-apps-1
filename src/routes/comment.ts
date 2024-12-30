import express from 'express';
import commentController from '../controllers/comment';

const router = express.Router();

router.post('/', commentController.addComment);
router.get('/:postId?', commentController.getComments);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;
