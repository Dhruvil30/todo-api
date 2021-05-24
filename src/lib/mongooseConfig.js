const mongoose = require('mongoose');
const userModel = require('../components/user/user.model');
// const noteModel = require('../components/note/note.model');

const makeConnection = () => {
    mongoose.connect(process.env.DATABASE_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, (error) => {
        if (error) throw new Error('Connection failed with mongodb');
    });
}

makeConnection();

module.exports = {
    mongoose,
    models: {
        userModel
    },
};