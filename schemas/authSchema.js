const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(5);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryPasswordAuthSchema = Joi.object({
  email: email.required(),
});

module.exports = {
  loginAuthSchema,
  recoveryPasswordAuthSchema,
};
