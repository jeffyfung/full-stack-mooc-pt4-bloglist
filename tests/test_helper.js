const Blog = require('../models/blog');
const User = require('../models/user');

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

const newBlogWithEmptyLikes = {
  title: 'dont swallow the cap',
  author: 'the national',
  url: 'foo'
};

const newBlogWithoutTitle = {
  author: 'the national',
  url: 'foo'
};

const newBlogWithoutUrl = {
  title: 'dont swallow the cap',
  author: 'the national'
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const newUser = {
  username: 'johnc',
  name: 'john chan',
  password: 'qTU(X[?3Sd{9E>?'
};

const userWithInvalidUsernameLength = {
  username: 'j',
  name: 'john chan',
  password: 'qTU(X[?3Sd{9E>?'
};

const userWithInvalidPasswordLength = {
  username: 'j',
  name: 'john chan',
  password: '1'
};

const userWithDuplicatedUsername = {
  username: 'root',
  name: 'john chan',
  password: 'qTU(X[?3Sd{9E>?'
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithEmptyLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  blogsInDb,
  newUser,
  userWithInvalidUsernameLength,
  userWithInvalidPasswordLength,
  userWithDuplicatedUsername,
  usersInDb
};