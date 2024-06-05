const passport = require('passport');

const localStratgy = require('./strategies/localStrategy');
const jwtStrategy = require('./strategies/jwtStrategy');

//diferentes estrategias que vamos a usar
passport.use(localStratgy);
// estrategia para verificar el token
passport.use(jwtStrategy);
