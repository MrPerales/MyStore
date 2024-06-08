const express = require('express');
const router = express.Router();
const passport = require('passport');
const validatorHandler = require('./../middlewares/validatorHandler');
const {
  loginAuthSchema,
  recoveryPasswordAuthSchema,
} = require('../schemas/authSchema');

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
router.post(
  '/recovery',
  validatorHandler(recoveryPasswordAuthSchema, 'body'),
  async (req, resp, next) => {
    try {
      const { email } = req.body;
      const sendMail = await service.sendMail(email);
      resp.json(sendMail);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
