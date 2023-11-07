const express = require('express');
const UsersService = require('../services/userServices');
const {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  getUserSchema,
} = require('../schemas/usersSchema');
const validatorHandler = require('../middlewares/validatorHandler');
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

router.get('/', async (req, resp) => {
  const users = await service.find();
  resp.status(200).json(users);
});

router.get(
  '/:nickname',
  validatorHandler(getUserSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { nickname } = req.params;
      const users = await service.findOne(nickname);
      resp.json(users);
    } catch (error) {
      next(error);
    }
  },
);

// post
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, resp) => {
    const body = req.body;
    const newUser = await service.create(body);
    resp.status(201).json(newUser);
  },
);
// patch
router.patch(
  '/:nickname',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const { nickname } = req.params;
      const user = await service.update(nickname, body);
      resp.json(user);
    } catch (error) {
      next(error);
    }
  },
);
// delete
router.delete(
  '/:nickname',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, resp, next) => {
    try {
      const { nickname } = req.params;
      const rta = await service.delete(nickname);
      resp.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
