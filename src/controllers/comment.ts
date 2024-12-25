import Comment from '../models/comment';
import { Request, Response } from 'express';

const addComment = async (req: Request, res: Response) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const filter = req.params.postId ? { postId: req.params.postId } : {}; // Filter by postId if provided
    const comments = await Comment.find(filter);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addComment,
  getComments,
  updateComment,
  deleteComment
};