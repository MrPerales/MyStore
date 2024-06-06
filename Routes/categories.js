const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categoryService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getCategorySchema,
  updateCategorySchema,
  createCategorySchema,
  deleteCategorySchema,
} = require('../schemas/categorySchema');
const passport = require('passport');

const service = new CategoryService();
const { checkRoles } = require('../middlewares/authHandler');

// router.get('/', (req, resp) => {
//   resp.json([
//     {
//       categoryId: 1,
//       name: 'games',
//       products: `/products/1`,
//     },
//     {
//       categoryId: 2,
//       name: 'clothes',
//       products: `/products/2`,
//     },
//     {
//       categoryId: 3,
//       name: 'electronics',
//       products: `/products/3`,
//     },
//   ]);
// });

router.get('/', async (req, resp, next) => {
  try {
    const categories = await service.CategoryFindWithDB();
    resp.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      resp.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
);
// protegemos los endpoints con la estrategia jwt
//nota el middleware checkRole se pone despues de passport
// ya que en ese nos manda todos los datos para el checkRole
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, resp, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      resp.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategory = await service.update(id, body);
      resp.status(200).json(updateCategory);
    } catch (error) {
      next(errro);
    }
  },
);
router.delete(
  '/id',
  checkRoles('admin'),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deleteCategorySchema, 'params'),
  async (req, resp, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      resp.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

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
