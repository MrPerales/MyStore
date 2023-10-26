const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, resp) => {
  resp.send('hello this is my first server with express');
});
app.get('/nueva-ruta', (req, resp) => {
  resp.send('new route');
});
// endpoints
app.get('/products', (req, resp) => {
  resp.json([
    {
      name: 'product 1',
      price: 10,
    },
    {
      name: 'product 2',
      price: 20,
    },
  ]);
});
app.get('/product/:id', (req, resp) => {
  const { id } = req.params;
  resp.json({
    id,
    name: 'product 1',
    price: 10,
  });
});
app.get('/categories/:categoryId/product/:productId', (req, resp) => {
  const { categoryId, productId } = req.params;
  resp.json({
    categoryId,
    productId,
  });
});
// endpoint categories
app.get('/categories', () => {
  resp.json([
    {
      categoryId: 1,
      name: 'games',
      products: `/products/${categoryId}`,
    },
    {
      categoryId: 2,
      name: 'clothes',
      products: `/products/${categoryId}`,
    },
    {
      categoryId: 3,
      name: 'electronics',
      products: `/products/${categoryId}`,
    },
  ]);
});
app.get('/products/:categoryId', (req, resp) => {
  const { categoryId } = req.params;
  resp.json([
    {
      id,
      name: 'product 1',
      price: 10,
      categoryId,
    },
    {
      id,
      name: 'product 2',
      price: 20,
      categoryId,
    },
  ]);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

console.log('my-app');
console.log('my-app');
