const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const customer = await sequelize.models.Customer.findOne({
      where: {
        '$user.id$': data.userId,
      },
      include: ['user'],
    });
    if (!customer) {
      throw boom.badRequest('customer not found');
    }

    const newOrder = await sequelize.models.Order.create({
      customerId: customer.id,
    });
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
  // buscar ordenes por usuario
  async findByUser(userId) {
    const orders = await sequelize.models.Order.findAll({
      //Estás filtrando los pedidos para que solo incluyan aquellos cuyo cliente (customer) tiene un userId específico.
      //Esto se logra utilizando la asociación $customer.user.id$.
      where: {
        '$customer.user.id$': userId,
      },
      // devolvemos info del cliente y tambien la informacion de su usuario
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }
}
module.exports = OrderService;
