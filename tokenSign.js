const jwt = require('jsonwebtoken');

const { config } = require('./config/config');
// solo el backend lo tiene que saber
const secret = config.jwtSecret;
const payload = {
  // subject : es la forma en la que podamos identificar al usuario
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

console.log(token);
