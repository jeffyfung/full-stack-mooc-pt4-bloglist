const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const api = supertest(app);
let token;

beforeAll(async() => {
  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({ username: 'root', passwordHash: passwordHash });
  await user.save();

  const _user = await User.findOne({ username: 'root' });
  const userForToken = {
    username: _user.username,
    id: _user.id
  };
  token = 'bearer ' + jwt.sign(userForToken, process.env.SECRET);
});

// alternative: use MongoDB in-memory storage engine
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('test suite 1 - 4.8', () => {
  test('no blog return empty array', async () => {
    await Blog.deleteMany({});

    let res = await api.get('/api/blogs');
    expect(res.body).toEqual([]);
  }),
  test('get blogs return multiiple blogs', async () => {
    let res = await api.get('/api/blogs');
    let outputTitle = res.body.map(blog => blog.title);
    let refTitle = helper.initialBlogs[0].title;
    expect(outputTitle).toContain(refTitle);
    expect(outputTitle.length).toBe(helper.initialBlogs.length);
  });
});

describe('test suite 2 - 4.9', () => {
  test('returned blogs contains .id', async () => {
    let res = await api.get('/api/blogs');
    for (let blog of res.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe('test suite 3 - 4.10', () => {
  test('POST request creates new blog post', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', token);
    let res = await helper.blogsInDb();
    expect(res).toHaveLength(helper.initialBlogs.length + 1);
    expect(res.map(blog => blog.title)).toContain(helper.newBlog.title);
  });
});

describe('test suite 4 - 4.11', () => {
  test('.likes defaulted to 0', async () => {
    await api.post('/api/blogs')
      .send(helper.newBlogWithEmptyLikes)
      .set('Authorization', token);
    let res = await helper.blogsInDb();
    expect(res.find(blog => blog.title === helper.newBlogWithEmptyLikes.title).likes).toBe(0);
  });
});

describe('test suite 5 - 4.12', () => {
  test('.title is compulsory to create blog post', async () => {
    let res = await api.post('/api/blogs')
      .send(helper.newBlogWithoutTitle)
      .set('Authorization', token);
    expect(res.status).toBe(400);
  }),
  test('.url is compulsory to create blog post', async () => {
    let res = await api.post('/api/blogs')
      .send(helper.newBlogWithoutUrl)
      .set('Authorization', token);
    expect(res.status).toBe(400);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});