const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./controllers/router');
const logger = require('./utils/logger');
const config = require('./utils/config');
const express = require('express');
const app = express();

logger.info('connecting to DB...');

mongoose.connect(config.MONGODB_URI)
  .then(res => { logger.info('connected to MongoDB'); })
  .catch(err => { logger.error('error connecting to MongoDB', err.message); })

app.use(cors());
app.use(express.json());

app.use('/api/blogs', router);

module.exports = app;