const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(5);
const newPassword = Joi.string().min(5);
const token = Joi.string().regex(
  /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/,
);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryPasswordAuthSchema = Joi.object({
  email: email.required(),
});
const changePasswordSchema = Joi.object({
  newPassword: newPassword.required(),
  token: token.required(),
});
module.exports = {
  loginAuthSchema,
  recoveryPasswordAuthSchema,
  changePasswordSchema,
};
