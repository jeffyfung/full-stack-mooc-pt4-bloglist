const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    let existingUsername = await User.findOne({ 'username': username });
    if (existingUsername) {
      return res.status(400).json({ error: 'username must be unique' });
    }
    if (password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;