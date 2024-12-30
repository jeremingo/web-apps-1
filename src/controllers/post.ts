import Post from '../models/post';
import { Request, Response } from 'express';

const getPosts = async (req: Request, res: Response) => {
    try {
        res.json(await Post.find({
            ...req.query.sender && { 'sender': req.query.sender}
        }));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        res.json(await Post.findById(req.params.id));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const addPost = async (req: Request, res: Response) => {
    try {
        const post = new Post({
            message: req.body.message,
            sender: req.body.sender
        });
        res.json(await post.save());
    } catch (err) {
        res.status(404).json({error: err.message });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message,
                sender: req.body.sender,
            },
            { new: true, runValidators: true } // Return the updated document and validate changes
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    getPosts,
    getPostById,
    addPost,
    updatePost
};