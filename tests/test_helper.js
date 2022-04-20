const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'blogname 1',
    author: 'adam ondra',
    url: 'url:1',
    likes: 0
  },
  {
    title: 'blogname 2',
    author: 'chris sharma',
    url: 'url:2',
    likes: 2
  }
];

const newBlog = {
  title: 'the world is not a cold dead place',
  author: 'explosion in the sky',
  url: 'uuu',
  likes: 99
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  initialBlogs,
  newBlog,
  blogsInDb
};