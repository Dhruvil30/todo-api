const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const noteController = require('./note.controller');
const checkSession = require('../../utils/varify-session');
const noteValidation = require('./note.validation');

router.route('/')
    .get(checkSession.checkSessionForLoggedInUser, noteController.getAll)
    .post(checkSession.checkSessionForLoggedInUser, validator.body(noteValidation.createNoteSchema), noteController.create);

router.route('/note/:id')
    .get(checkSession.checkSessionForLoggedInUser, noteController.get)
    .put(checkSession.checkSessionForLoggedInUser, validator.body(noteValidation.updateNoteSchema), noteController.update)
    .delete(checkSession.checkSessionForLoggedInUser, noteController.delete);

router.route('/search')
    .get(checkSession.checkSessionForLoggedInUser, noteController.getByName);

router.route('/search/today')
    .get(checkSession.checkSessionForLoggedInUser, noteController.getTodayNotes);


module.exports = router;