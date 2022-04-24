const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  console.log('in post request');
  try {
    let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const tmpUser = await User.findOne({});
    const blog = new Blog({
      ...req.body,
      user: tmpUser._id
    });
    let blogs = await blog.save();
    res.status(201).json(blogs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;