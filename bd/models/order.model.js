const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'order';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createAt: {
    field: 'create_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  total: {
    // con esto no va a aparecer en la base de Datos
    type: DataTypes.VIRTUAL,
    // funcion para saber como obtener el valor del campó
    get() {
      // validamos que tenga items , si no da error ya que no existe este campo
      if (this.items) {
        console.log('existen items en la orden');
        // items = es de la manera en la que llamaste tu asosiacion
        if (this.items.length > 0) {
          return this.items.reduce((total, item) => {
            return total + item.price * item.OrderProduct.amount;
          }, 0);
        }
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    // una orden pertenesca a varios clientes
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    //relacion cpn tabla ternaria,
    this.belongsToMany(models.Product, {
      // nombre de asosicaion
      as: 'items',
      // a traves de que tabla se va a resolver la relacion (tabla ternaria)
      through: models.OrderProduct,
      // key de la tabla de la que estoy haciendo la relacion Order
      foreignKey: 'orderId',
      // la key de la otra tabla
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, Order, OrderSchema };
