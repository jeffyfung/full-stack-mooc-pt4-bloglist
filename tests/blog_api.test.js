const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

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
    await api.post('/api/blogs').send(helper.newBlog);
    let res = await helper.blogsInDb();
    expect(res).toHaveLength(helper.initialBlogs.length + 1);
    expect(res.map(blog => blog.title)).toContain(helper.newBlog.title);
  });
});

describe('test suite 4 - 4.11', () => {
  test('.likes defaulted to 0', async () => {
    await api.post('/api/blogs').send(helper.newBlogWithEmptyLikes);
    let res = await helper.blogsInDb();
    expect(res.find(blog => blog.title === helper.newBlogWithEmptyLikes.title).likes).toBe(0);
  });
});

describe('test suite 5 - 4.12', () => {
  test('.title is compulsory to create blog post', async () => {
    let res = await api.post('/api/blogs').send(helper.newBlogWithoutTitle);
    expect(res.status).toBe(400);
  }),
  test('.url is compulsory to create blog post', async () => {
    let res = await api.post('/api/blogs').send(helper.newBlogWithoutUrl);
    expect(res.status).toBe(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});