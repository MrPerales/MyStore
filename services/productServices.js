const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // this.products = [];
    // this.generate();
  }

  // async generate() {
  //   const limit = 10;
  //   for (let i = 0; i < limit; i++) {
  //     this.products.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }
  async create(data) {
    const newProduct = await sequelize.models.Product.create(data);
    return newProduct;
  }
  async find(query) {
    // hacemos dimanico las opciones
    const options = {
      // incluye detalles de la categoria
      include: ['category'],
      // por defecto en vacio {}
      where: {},
    };
    const { limit, offset, price } = query;
    if (limit && offset) {
      // paginacion
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      // where  por cual atributo buscar
      options.where.price = price;
    }

    const products = await sequelize.models.Product.findAll(options);
    return products;
  }
  async findOne(id) {
    //const name = this.getTotal(); //error creado
    const product = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    // find product
    const product = await this.findOne(id);
    const updateProduct = await product.update(changes);
    // update product

    return updateProduct;
  }
  async delete(id) {
    // find product
    const product = await this.findOne(id);
    // delete product
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
