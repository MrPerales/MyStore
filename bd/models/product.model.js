const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'product_name',
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stockNumber: {
    allowNull: false,
    field: 'stock_number',
    type: DataTypes.REAL,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Product extends Model {
  static associate(models) {
    //associate
    // un producto pertenece a una categoria
    this.belongsTo(models.Category, {
      as: 'category',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCT_TABLE, ProductSchema, Product };
