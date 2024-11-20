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

const updatePost = async (req, res) => {
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

module.exports = {
    getPosts,
    getPostById,
    addPost,
    updatePost
};