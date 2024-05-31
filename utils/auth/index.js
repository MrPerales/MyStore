const passport = require('passport');

const localStratgy = require('./strategies/localStrategy');

//diferentes estrategias que vamos a usar
passport.use(localStratgy);
