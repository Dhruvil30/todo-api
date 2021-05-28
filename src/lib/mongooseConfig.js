const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const userModel = require('../components/user/user.model');

const makeTestDbConnection = () => {
    const mongoServer = new MongoMemoryServer();
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    mongoServer.getUri().then((mongoUri) => {
        mongoose.connect(mongoUri, mongooseOptions);
    });
}

const makeDbConnection = () => {
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    mongoose.connect(process.env.DATABASE_URL, mongooseOptions);
}

const env = process.env.NODE_ENV;

if (env === 'TEST') makeTestDbConnection();
else if (env === 'local') makeDbConnection();

mongoose.connection.on('error', (error) => {
    if (error) throw error;
});

module.exports = {
    mongoose,
    models: {
        userModel
    },
};