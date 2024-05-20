const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async CategoryFindWithDB() {
    // tiene que ser el mismo ombre que tiene en modelName en la classs Category en este caso
    const response = await sequelize.models.Category.findAll();
    return response;
  }
  async findOne(id) {
    const category = await sequelize.models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }
  async update(id, changes) {
    const category = await this.findOne(id);
    const resp = await category.update(changes);
    return resp;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
