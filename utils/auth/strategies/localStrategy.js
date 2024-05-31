const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('./../../../services/userServices');
const service = new UsersService();

const localStratgy = new Strategy(async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      // manda el error , no fue posible la conexion
      done(boom.unauthorized(), false);
    }
    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      // manda el error , no fue posible la conexion
      done(boom.unauthorized(), false);
    }
    // null = no hay error , mandamos info
    done(null, user);
  } catch (error) {
    // manda el error , no fue posible la conexion
    done(error, false);
  }
});

module.exports = localStratgy;
