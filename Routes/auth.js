const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, resp, next) => {
    try {
      // passport nos manda los datos por el req
      //   en este caso los datos del usuario
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      resp.json({ user, token });
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
