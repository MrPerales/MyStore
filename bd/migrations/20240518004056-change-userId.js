'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      // lo enviamos asi porque ya tiene una referencia
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER,
      // para evitar duplicados
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
