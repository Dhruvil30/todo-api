const Joi = require('joi');

module.exports = {

    createUserSchema: Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(3).max(15).required()
        }),

    loginUserSchema: Joi.object().keys({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(3).max(15).required()
        })

};