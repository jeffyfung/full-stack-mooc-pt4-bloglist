const router = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

router.get('/', async (req, res, next) => {
  try {
    let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', middleware.userExtractor, async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    let blogs = await blog.save();
    req.user.blogs = req.user.blogs.concat(blog.id);
    await req.user.save();

    res.status(201).json(blogs);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'blog does not exist' });
    }

    if (blog.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ error: 'no authority to delete this blog' });
    }

    await Blog.findByIdAndDelete(blog.id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;