const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
  try {
    let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...req.body,
      user: user.id
    });
    let blogs = await blog.save();
    user.blogs = user.blogs.concat(blog.id);
    await user.save();

    res.status(201).json(blogs);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(req.params.id);
    console.log(blog);
    if (!blog) {
      return res.status(404).json({ error: 'blog does not exist' });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'no authority to delete this blog' });
    }

    await Blog.findByIdAndDelete(blog.id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;