const express = require('express');
const {
  createCustomerSchema,
  getCustomerSchema,
  deleteCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customerSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const CustomerService = require('../services/customerService');
const service = new CustomerService();
const router = express.Router();

// get
router.get('/', async (req, response, next) => {
  try {
    const customer = await service.find();
    response.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

// post

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      resp.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

// patch
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const customer = await service.update(id, body);
      resp.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

// delete
router.delete(
  '/:id',
  validatorHandler(deleteCustomerSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);
      resp.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
