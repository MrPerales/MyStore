const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const customer = await sequelize.models.Customer.create(data);
    return customer;
  }

  async findOne(id) {
    const customer = await sequelize.models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not Found ');
    }
    return customer;
  }
  async find() {
    const customers = await sequelize.models.Customer.findAll();
    return customers;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
