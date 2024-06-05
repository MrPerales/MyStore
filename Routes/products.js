const express = require('express');

const ProductsService = require('./../services/productServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
  queryProductSchema,
} = require('../schemas/productSchema');
const router = express.Router();
const service = new ProductsService();
const passport = require('passport');
// endpoints GET
// // products with faker-JS
router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, resp, next) => {
    try {
      // mandamos todos los query
      const products = await service.find(req.query);
      resp.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/filter', (req, resp) => {
  resp.send('yo soy un filter');
});
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      resp.json(product);
    } catch (error) {
      next(error);
    }
  },
);

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

// protegemos los endpoints con la estrategia jwt
// POST

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, resp) => {
    const body = req.body;
    const product = await service.create(body);
    resp.status(201).json(product);
  },
);

// patch para modificar algunos campos

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      resp.json(product);
    } catch (error) {
      next(error);
    }
  },
);

// delete
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deleteProductSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      resp.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
