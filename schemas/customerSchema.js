const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(15);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
  // user: Joi.object({
  //   email: email.required(),
  //   password: password.required(),
  // }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
  deleteCustomerSchema,
};
