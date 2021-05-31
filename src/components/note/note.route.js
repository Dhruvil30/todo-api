const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });
const noteController = require('./note.controller');
const { checkSessionForLoggedInUser } = require('../../utils/varify-session');
const noteValidation = require('./note.validation');

const router = express.Router();

router
  .route('/')
  .get(checkSessionForLoggedInUser, noteController.getAll)
  .post(
    checkSessionForLoggedInUser,
    validator.body(noteValidation.createNoteSchema),
    noteController.create,
  );

router
  .route('/note/:id')
  .get(checkSessionForLoggedInUser, noteController.get)
  .put(
    checkSessionForLoggedInUser,
    validator.body(noteValidation.updateNoteSchema),
    noteController.update,
  )
  .delete(checkSessionForLoggedInUser, noteController.delete);

router
  .route('/search')
  .get(checkSessionForLoggedInUser, noteController.getByName);

router
  .route('/search/today')
  .get(checkSessionForLoggedInUser, noteController.getTodayNotes);

module.exports = router;
