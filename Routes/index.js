const express = require('express');
const productRouter = require('./products.js');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const homeRouter = require('./home.js');
const customerRouter = require('./customer.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/', homeRouter);
  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customer', customerRouter);
}

module.exports = routerApi;
