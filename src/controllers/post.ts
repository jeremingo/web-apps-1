import Post from '../models/post';
import { Request, Response, NextFunction } from 'express';

const getPosts = async (req: Request, res: Response) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {};
    const posts = await Post.find(filter);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        res.json(await Post.findById(req.params.id));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const addPost = async (req: Request & { user?: { _id: string, username: string } }, res: Response) => {
  try {
      console.log(req.params); 
      console.log(req.body);
      const userId = req.params.userId;
      const post = new Post({
          ...req.body,
          userId: userId
      });
      await post.save();
      res.status(201).json(post);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


const updatePost = async (req: Request, res: Response) => {
  try {
      const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true } // Return the updated document and validate changes
      );
      if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
      res.status(200).json(updatedPost);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


const deletePost = async (req: Request, res: Response) => {
  try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
      res.status(200).json(deletedPost);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}


export default {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
};