const express = require('express');

const ProductsService = require('./../services/productServices');
const router = express.Router();
const service = new ProductsService();

// endpoints GET
// // products with faker-JS
router.get('/', (req, resp) => {
  const products = service.find();
  resp.status(200).json(products);
});

router.get('/filter', (req, resp) => {
  resp.send('yo soy un filter');
});
router.get('/:id', (req, resp) => {
  const { id } = req.params;
  const product = service.findOne(id);
  resp.json(product);
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
  const product = service.create(body);
  resp.status(201).json(product);
});

// patch para modificar algunos campos

router.patch('/:id', (req, resp) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  resp.json(product);
});

// delete
router.delete('/:id', (req, resp) => {
  const { id } = req.params;
  const rta = service.delete(id);
  resp.json(rta);
});

module.exports = router;
