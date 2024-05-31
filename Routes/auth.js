const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, resp, next) => {
    try {
      // passport nos manda los datos por el req
      //   en este caso los datos del usuario
      resp.json(req.user);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
