const { ProductSchema, Product } = require('./product.model');
const { UserSchema, User } = require('./user.model');
const { CategorySchema, Category } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  // run associates
  Customer.associate(sequelize.models);
}
module.exports = setupModels;
