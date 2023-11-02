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
  if (id === '999') {
    resp.status(404).json({
      message: 'Not found',
    });
  } else {
    resp.json({
      id,
      name: 'product 1',
      price: 10,
    });
  }
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
  resp.status(200).json(products);
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
  resp.status(201).json({
    message: 'created',
    data: body,
  });
});

// patch para modificar algunos campos

router.patch('/:id', (req, resp) => {
  const { id } = req.params;
  const body = req.body;
  resp.json({
    message: 'partial Update',
    data: body,
    id,
  });
});
// put todos los campos se modifican

router.put('/:id', (req, resp) => {
  const { id } = req.params;
  const body = resp.body;
  resp.json({
    message: 'Update product',
    data: body,
    id,
  });
});

// delete
router.delete('/:id', (req, resp) => {
  const { id } = req.params;
  resp.json({
    message: 'deleted Product',
    id,
  });
});

module.exports = router;
