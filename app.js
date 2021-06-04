const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const routes = require('./src/routes/index');
const responseGenerator = require('./src/utils/response-generator');
const todoScheduler = require('./src/utils/todo-scheduler');
const constant = require('./src/utils/constant');

const app = express();
app.use(express.json());

todoScheduler.getUsersData().then((users) => todoScheduler.runScheduler(users));

const apiLimiter = rateLimit({
  windowMs: constant.rateLimitTime,
  max: constant.rateLimitMaxReq,
  message: { message: 'Too many requests, try again later.' },
});

app.use(constant.rateLimitApis, apiLimiter);

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  req.IoObj = req.app.get('io');
  next();
});

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Page Not Found' });
});

app.use((error, req, res, next) => {
  const response = responseGenerator.generateErrorResponse(error);
  res.status(response.statusCode).json(response.body);
});

module.exports.app = app;
