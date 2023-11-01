const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
  resp.send('hello this is my first server with express HOME PAGE');
});

module.exports = router;
