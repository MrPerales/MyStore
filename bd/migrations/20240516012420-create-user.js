'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // crea tabla
    // repetimos codigo para que las migraciones no colapcen ya que en la sig migracion se agrega el 'role'
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false, //permitir nulo ? true or false
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true, //unico
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        //variable JS
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at', //nombre en sequelize
        defaultValue: Sequelize.NOW, //valor por defecto (como se registo en sequelize)
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // para revertir cambios
    await queryInterface.dropTable(USER_TABLE);
    // await queryInterface.dropTable(CATEGORY_TABLE)

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
