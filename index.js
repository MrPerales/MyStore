const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, resp) => {
  resp.send('hello this is my first server with express');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

console.log('my-app');
console.log('my-app');
