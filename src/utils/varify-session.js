const helper = require('./helper');

module.exports = {
    checkSessionForLoggedOutUser: (req, res, next) => {
        const userId = helper.getUserId(req, res);
        if (!userId) next();
        else throw new Error('USER_LOGGED_IN');
    },
    checkSessionForLoggedInUser: (req, res, next) => {
        const userId = helper.getUserId(req, res);
        if (userId) {
            req.user = {};
            req.user.id = userId;
            next();
        } 
        else throw new Error('UNAUTHORIZED');
    }
}