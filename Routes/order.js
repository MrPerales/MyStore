const express = require('express');

const validatorHandler = require('../middlewares/validatorHandler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/orderSchema');
const router = express.Router();
const OrderService = require('./../services/orderService');
const service = new OrderService();
const passport = require('passport');

// endpoitns

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      resp.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
);
// protegemos los endpoints con la estrategia jwt

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const order = await service.create(body);
      resp.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
);

// para ordenes
router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      resp.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
