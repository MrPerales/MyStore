const express = require('express');
const passport = require('passport');
const OrderService = require('./../services/orderService');
const service = new OrderService();

const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, resp, next) => {
    try {
      const user = req.user;
      const userId = user.sub; //del payload del token
      const orders = await service.findByUser(userId);
      resp.json(orders);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
