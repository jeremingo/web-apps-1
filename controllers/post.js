const Post = require('../models/post');

const getPosts = async (req, res) => {
    try {
        res.json(await Post.find({
            ...req.query.sender && { 'sender': req.query.sender}
        }));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const getPostById = async (req, res) => {
    try {
        res.json(await Post.findById(req.params.id));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

const addPost = async (req, res) => {
    try {
        const post = Post({
            message: req.body.message,
            sender: req.body.sender
        });
        res.json(await post.save());
    } catch (err) {
        res.status(404).json({error: err.message });
    }
};

module.exports = {
    getPosts,
    getPostById,
    addPost
};