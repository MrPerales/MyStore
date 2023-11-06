const express = require('express');
const routerApi = require('./Routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

// middleware para aceptar el post
app.use(express.json());

routerApi(app);

// middleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// server port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// app.get('/nueva-ruta', (req, resp) => {
//   resp.send('new route');
// });

console.log('my-app');
console.log('my-app');
