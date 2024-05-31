const express = require('express');
const cors = require('cors');
const routerApi = require('./Routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandler');
const { checkApikey } = require('./middlewares/authHandler');
const app = express();
const port = 3000;

// middleware para aceptar el post
app.use(express.json());

const whiteList = ['http://localhost:5500', 'https://example.'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
// app.use(cors()); //habilitar a cualquiera origen de la peticion
app.use(cors(options));

// strategies require dinamico
// como tiene nombre index no es necesario poner toda la ruta
require('./utils/auth');

routerApi(app);

// middleware
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// server port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get('/nueva-ruta', checkApikey, (req, resp) => {
  resp.send('new route');
});

console.log('my-app');
console.log('my-app');
