const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const userController = require('./user.controller');
const {
  checkSessionForLoggedInUser,
  checkSessionForLoggedOutUser,
} = require('../../utils/verification');
const userValidation = require('./user.validation');
const { verifyEmail, checkIsUserVerified } = require('../../utils/verification');

const router = express.Router();

router
  .route('/login')
  .post(
    checkSessionForLoggedOutUser,
    validator.body(userValidation.loginUserSchema),
    checkIsUserVerified,
    userController.login,
  );

router
  .route('/register')
  .post(
    checkSessionForLoggedOutUser,
    validator.body(userValidation.createUserSchema),
    userController.register,
  );

router.route('/logout').get(checkSessionForLoggedInUser, userController.logout);

router.route('/verify/:token').get(verifyEmail, userController.verify);

module.exports = router;
