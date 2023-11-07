const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const nickname = Joi.string().min(3).max(10);
const lastName = Joi.string().min(3).max(20);

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  nickname: nickname.required(),
});
const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  nickname: nickname,
});
const getUserSchema = Joi.object({
  nickname: nickname.required(),
});
const deleteUserSchema = Joi.object({
  nickname: nickname.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
};
