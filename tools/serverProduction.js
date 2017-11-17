'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const viewsPath = process.cwd() + '/server/views';
const logger = require('./logger');

const app = express();

app.use('/api', router);
app.use('/assets', express.static('./assets'));
app.use('/', express.static(viewsPath));
app.use(logger.errorHandler());

module.exports = app;
