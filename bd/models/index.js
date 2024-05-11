const { ProductSchema, Product } = require('./product.model');
const { UserSchema, User } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
}
module.exports = setupModels;
