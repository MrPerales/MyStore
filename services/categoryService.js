const bom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async CategoryFindWithDB() {
    // tiene que ser el mismo ombre que tiene en modelName en la classs Category en este caso
    const response = await sequelize.models.Category.findAll();
    return response;
  }
}

module.exports = CategoryService;
