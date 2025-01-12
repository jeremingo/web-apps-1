import express from 'express';
import { authMiddleware } from '../controllers/auth';
const router = express.Router();
import Post from '../controllers/post';

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: Id of the user
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Server error
 */
router.get('/', Post.getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post data
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:id', Post.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Add a new post
 *     tags: [Posts]
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
 *                 description: content of the post
 *               title:
 *                 type: string
 *                 description: Title of the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, Post.addPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated content of the post
 *               title:
 *                 type: string
 *                 description: Updated title of the post
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, Post.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', authMiddleware, Post.deletePost);

export default router;