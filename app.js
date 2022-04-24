const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./controllers/blog');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');
const logger = require('./utils/logger');
const config = require('./utils/config');
const express = require('express');
const middleware = require('./utils/middleware');
const app = express();

logger.info('connecting to DB...');

mongoose.connect(config.MONGODB_URI)
  .then(() => { logger.info('connected to MongoDB'); })
  .catch(err => { logger.error('error connecting to MongoDB', err.message); });

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/blogs', router);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;