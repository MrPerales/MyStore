'use strict';
const {CategorySchema,CATEGORY_TABLE} =require('../models/category.model')
const { USER_TABLE, UserSchema }=require('../models/user.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // crea tabla 
    await queryInterface.createTable(USER_TABLE,UserSchema);
    // await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {

    // para revertir cambios 
    await queryInterface.dropTable(USER_TABLE)
    // await queryInterface.dropTable(CATEGORY_TABLE)

    
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
