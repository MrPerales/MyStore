const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
  const { limit, offset } = req.params;
  if (limit && offset) {
    resp.json({
      limit,
      offset,
    });
  } else {
    resp.send('no hay parametros');
  }
});

module.exports = router;
