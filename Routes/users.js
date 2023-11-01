const { faker } = require('@faker-js/faker');
const express = require('express');
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
  const users = [];
  const { size } = req.query;
  const limit = size || 5;
  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.avatar(),
    });
  }

  resp.json(users);
});

module.exports = router;
