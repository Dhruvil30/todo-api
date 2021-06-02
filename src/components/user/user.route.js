const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const userController = require('./user.controller');
const {
  checkSessionForLoggedInUser,
  checkSessionForLoggedOutUser,
} = require('../../utils/varify-session');
const userValidation = require('./user.validation');
const { sendRegistrationEmail } = require('../../utils/registraction-email');

const router = express.Router();

router
  .route('/login')
  .post(
    checkSessionForLoggedOutUser,
    validator.body(userValidation.loginUserSchema),
    userController.login,
  );

router
  .route('/register')
  .post(
    checkSessionForLoggedOutUser,
    validator.body(userValidation.createUserSchema),
    sendRegistrationEmail,
    userController.register,
  );

router.route('/logout').get(checkSessionForLoggedInUser, userController.logout);

module.exports = router;
