const express = require('express');

const validatorHandler = require('../middlewares/validatorHandler');
const { createOrderSchema, getOrderSchema } = require('../schemas/orderSchema');
const router = express.Router();
const OrderService = require('./../services/orderService');
const service = new OrderService();

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

router.post(
  '/',
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
module.exports = router;
