const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('passwrod', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();
});

describe('test suite 1 - 4.16', () => {
  test('successfully create new user', async () => {
    const usersAtStart = await helper.usersInDb();

    await api.post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(helper.newUser.username);
  });

  test('invalid username length', async () => {
    let res = await api.post('/api/users').send(helper.userWithInvalidUsernameLength);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('invalid password length', async () => {
    let res = await api.post('/api/users').send(helper.userWithInvalidPasswordLength);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('duplicate username', async () => {
    let res = await api.post('/api/users').send(helper.userWithDuplicatedUsername);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

afterAll(async () => {
  mongoose.connection.close();
});