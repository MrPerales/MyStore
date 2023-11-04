const { faker, Faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }
  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return this.products;
  }
  async findOne(id) {
    const name = this.getTotal(); //error creado
    return this.products.find((item) => item.id === id);
  }

  async update(id, changes) {
    // find product
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new Error('product not found :(');
    }
    const product = this.products[indexProduct];
    // update product
    this.products[indexProduct] = {
      ...product,
      ...changes,
    };
    return this.products[indexProduct];
  }
  async delete(id) {
    // find product
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new Error('product not found :(');
    }
    // delete product
    this.products.splice(indexProduct, 1);
    return { id };
  }
}

module.exports = ProductsService;
