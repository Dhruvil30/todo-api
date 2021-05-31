const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const session = require('express-session');
const routes = require('./src/routes/index');
const responseGenerator = require('./src/utils/response-generator');
const todoScheduler = require('./src/utils/todo-scheduler');

const app = express();
app.use(express.json());

todoScheduler.getUsersData().then((users) => todoScheduler.runScheduler(users));

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
