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

describe('test suite 1', () => {
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
  });
});


afterAll(() => {
  mongoose.connection.close();
});