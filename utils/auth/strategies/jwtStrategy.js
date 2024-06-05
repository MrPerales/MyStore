const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  //obtenemos el token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //secreto
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  // el payload se obtiene de las opciones ('jwtFromRequest') esto quiere decir que
  // verifica si es valido con el secret y ya solo retornamos verificado
  return done(null, payload);
});
module.exports = jwtStrategy;
