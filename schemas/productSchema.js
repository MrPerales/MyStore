const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const stockNumber = Joi.number().integer();

const createProductSchema = Joi.object({
  productName: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  stockNumber: stockNumber.required(),
});
const updateProductSchema = Joi.object({
  productName: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});
const getProductSchema = Joi.object({
  id: id.required(),
});
const deleteProductSchema = Joi.object({
  id: id.required(),
});
module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
};
