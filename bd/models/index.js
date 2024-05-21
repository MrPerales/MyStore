const { ProductSchema, Product } = require('./product.model');
const { UserSchema, User } = require('./user.model');
const { CategorySchema, Category } = require('./category.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  // run associates
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}
module.exports = setupModels;
