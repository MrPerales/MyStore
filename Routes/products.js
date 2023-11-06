const express = require('express');

const ProductsService = require('./../services/productServices');
const router = express.Router();
const service = new ProductsService();

// endpoints GET
// // products with faker-JS
router.get('/', async (req, resp) => {
  const products = await service.find();
  resp.status(200).json(products);
});

router.get('/filter', (req, resp) => {
  resp.send('yo soy un filter');
});
router.get('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    resp.json(product);
  } catch (error) {
    next(error);
  }
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

router.post('/', async (req, resp) => {
  const body = req.body;
  const product = await service.create(body);
  resp.status(201).json(product);
});

// patch para modificar algunos campos

router.patch('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    resp.json(product);
  } catch (error) {
    next(error);
  }
});

// delete
router.delete('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    resp.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
