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
