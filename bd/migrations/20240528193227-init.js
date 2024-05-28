'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true, //unico
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'customer',
      },
      createdAt: {
        //variable JS
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name',
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      categoryName: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
        field: 'category_name',
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      productName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'product_name',
      },
      price: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      stockNumber: {
        allowNull: false,
        field: 'stock_number',
        type: Sequelize.DataTypes.REAL,
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      createAt: {
        field: 'create_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
