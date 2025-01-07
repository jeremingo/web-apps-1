import express from 'express';
import { authMiddleware } from '../controllers/auth';
const router = express.Router();
import commentController from '../controllers/comment';

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     description: Content of the comment
 *                   sender:
 *                     type: string
 *                     description: Sender of the comment
 *                   postId:
 *                     type: string
 *                     description: ID of the post
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date of the comment
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date of the comment
 *       500:
 *         description: Server error
 */
router.get('/', commentController.getComments);

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     description: Content of the comment
 *                   sender:
 *                     type: string
 *                     description: Sender of the comment
 *                   postId:
 *                     type: string
 *                     description: ID of the post
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date of the comment
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date of the comment
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:postId', commentController.getComments);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *               sender:
 *                 type: string
 *                 description: Sender of the comment
 *               postId:
 *                 type: string
 *                 description: ID of the post
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, commentController.addComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated content of the comment
 *               sender:
 *                 type: string
 *                 description: Updated sender of the comment
 *               postId:
 *                 type: string
 *                 description: ID of the post
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, commentController.deleteComment);


export default router;