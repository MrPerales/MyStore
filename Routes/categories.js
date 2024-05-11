const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categoryService');
const validatorHandler = require('../middlewares/validatorHandler');

const service = new CategoryService();

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
// all categories
router.get('/categoriesAll', async (req, resp) => {
  const categories = await service.CategoryFindWithDB();
  resp.status(200).json(categories);
});

module.exports = router;
