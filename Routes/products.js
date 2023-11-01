const express = require('express');

const { faker } = require('@faker-js/faker');
// faker-JS
const router = express.Router();

// endpoints GET
router.get('/filter', (req, resp) => {
  resp.send('yo soy un filter');
});
router.get('/:id', (req, resp) => {
  const { id } = req.params;
  resp.json({
    id,
    name: 'product 1',
    price: 10,
  });
});
// // products with faker-JS
router.get('/', (req, resp) => {
  const products = [];
  console.log(req.query);
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  resp.json(products);
});
router.get('/:categoryId', (req, resp) => {
  const { categoryId } = req.params;
  resp.json([
    {
      // id,
      name: 'product 1',
      price: 10,
      categoryId,
    },
    {
      // id,
      name: 'product 2',
      price: 20,
      categoryId,
    },
  ]);
});

// POST

router.post('/', (req, resp) => {
  const body = req.body;
  resp.json({
    message: 'created',
    data: body,
  });
});

module.exports = router;
