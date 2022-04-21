const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res, next) => {
  try {
    let blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    let blogs = await blog.save();
    res.status(201).json(blogs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;