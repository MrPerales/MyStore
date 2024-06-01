const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNzIwMzQwMH0.NifapKF21RZjzeWVSLjwyYZxjqA-2OxVs0aMP8p1pww';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
