const express = require('express');
const UsersService = require('../services/userServices');
const service = new UsersService();
const router = express.Router();

// router.get('/', (req, resp) => {
//   const { limit, offset } = req.params;
//   if (limit && offset) {
//     resp.json({
//       limit,
//       offset,
//     });
//   } else {
//     resp.send('no hay parametros');
//   }
// });

router.get('/', (req, resp) => {
  const users = service.find();
  resp.status(200).json(users);
});
router.get('/:nickname', (req, resp) => {
  const { nickname } = req.params;
  const users = service.findOne(nickname);
  resp.json(users);
});
module.exports = router;
