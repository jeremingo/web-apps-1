const Post = require('../models/post');

const getPosts = async (req, res) => {
    try {
        res.json(await Post.find());
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

module.exports = {
    getPosts
};