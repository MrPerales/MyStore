const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
  resp.json([
    {
      categoryId: 1,
      name: 'games',
      products: `/products/1`,
    },
    {
      categoryId: 2,
      name: 'clothes',
      products: `/products/2`,
    },
    {
      categoryId: 3,
      name: 'electronics',
      products: `/products/3`,
    },
  ]);
});

// endpoint categories
router.get('/:categoryId/product/:productId', (req, resp) => {
  const { categoryId, productId } = req.params;
  resp.json({
    categoryId,
    productId,
  });
});

module.exports = router;
