const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const customer = await sequelize.models.Customer.create(newData, {
      // para llenar los campos faltantes sin tener que usar otra logica
      include: ['user'],
    });
    // para no retornar el password
    delete customer.user.dataValues.password;
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
    const customers = await sequelize.models.Customer.findAll({
      // para incluir los datos de la associates
      // referecia de class Customer.associate (as: 'user')
      // se pueden tener multiples associates
      include: ['user'],
    });
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
