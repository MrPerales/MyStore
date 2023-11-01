const productRouter = require('./products.js');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const homeRouter = require('./home.js');

function routerApi(app) {
  app.use('/api/', homeRouter);
  app.use('/api/products', productRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
}

module.exports = routerApi;
