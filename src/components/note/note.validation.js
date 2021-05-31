const Joi = require('joi');

module.exports = {
  createNoteSchema: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(200).required(),
    reminderTime: Joi.date().iso().required()
  }),

  updateNoteSchema: Joi.object().keys({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(5).max(200),
    reminderTime: Joi.date().iso()
  })
};
