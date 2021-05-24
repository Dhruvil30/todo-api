require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./src/routes/index');
const responseGenerator = require('./src/utils/response-generator');

const todoScheduler = require('./src/utils/todo-scheduler');
todoScheduler.getUsersData().then(users => todoScheduler.runScheduler(users));

app.use(express.json());

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
    // console.log(error);
    const response = responseGenerator.generateErrorResponse(error);
    res.status(response.statusCode).json(response.body);
})

module.exports.app = app;
