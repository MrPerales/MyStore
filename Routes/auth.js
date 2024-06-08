const express = require('express');
const router = express.Router();
const passport = require('passport');
const validatorHandler = require('./../middlewares/validatorHandler');
const { loginAuthSchema } = require('../schemas/authSchema');

const AuthService = require('../services/authService');
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  validatorHandler(loginAuthSchema, 'body'),
  async (req, resp, next) => {
    try {
      // passport nos manda los datos por el req
      //   en este caso los datos del usuario
      const user = req.user;
      const respToken = service.signToken(user);
      resp.json(respToken);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
