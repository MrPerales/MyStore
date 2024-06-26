const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.INTEGER,
    // para evitar duplicados
    unique: true,
    // a que tabla va referenciada
    references: {
      model: USER_TABLE,
      // a que columna va referida
      key: 'id',
    },
    // que va a hacer si se actualiza ('CASCADE')
    onUpdate: 'CASCADE',
    // que va a hacer si hay un delete
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    //associate se ejecuta en el archivo indez de esta carpeta
    this.belongsTo(models.User, { as: 'user' });
    // un cliente puede tener muchas ordenes de compra
    this.hasMany(models.Order, {
      as: 'order',
      // foreignKey con la cual encontrar su valor
      foreignKey: 'customerId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, Customer, CustomerSchema };
