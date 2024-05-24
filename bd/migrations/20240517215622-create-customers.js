'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // repetimos codigo para que las migraciones no colapcen ya que
    // en la sig migracion se agrega en userID el valor unique
    await queryInterface.createTable(CUSTOMER_TABLE, {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
