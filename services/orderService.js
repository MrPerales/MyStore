const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await sequelize.models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await sequelize.models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await sequelize.models.Order.findByPk(id, {
      // devolvemos info del cliente
      // include: ['customer'],
      // devolvemos info del cliente y tambien la informacion de su usuario
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        // incluimos los items
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('order not found ');
    }
    return order;
  }
  async update(id, changes) {
    const order = await this.findOne(id);
    const resp = await order.update(changes);
    return resp;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  // para irdenes
  async addItem(data) {
    const newItem = await sequelize.models.OrderProduct.create(data);
    return newItem;
  }
}
module.exports = OrderService;
