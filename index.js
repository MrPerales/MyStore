const express = require('express');
const routerApi = require('./Routes/index');
const app = express();
const port = 3000;

routerApi(app);

// server port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// app.get('/nueva-ruta', (req, resp) => {
//   resp.send('new route');
// });

console.log('my-app');
console.log('my-app');
