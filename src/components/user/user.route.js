const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const userController = require('./user.controller');
const checkSession = require('../../utils/varify-session');
const userValidation = require('./user.validation');

const router = express.Router();

router.route('/login')
    .post(checkSession.checkSessionForLoggedOutUser, validator.body(userValidation.loginUserSchema), userController.login);

router.route('/register')
    .post(checkSession.checkSessionForLoggedOutUser, validator.body(userValidation.createUserSchema), userController.register);

router.route('/logout')
    .get(checkSession.checkSessionForLoggedInUser, userController.logout);
    
module.exports = router;

// router.route('/')
//     .get(userController.getAll)
//     .post(userController.create);

// router.route('/:id')
//     .get(userController.get)
//     .put(userController.update)
//     .delete(userController.delete);