const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApikey(req, resp, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

// authentication

function checkAdminRole(req, resp, next) {
  // gracias a la proteccion jwt temenos los datos del usuario en req
  // verificamos si es tipo admin
  const user = req.user;
  // console.log(user);
  if (user.role == 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  // nos dan los roles y retornamos un middleware
  return (req, resp, next) => {
    const user = req.user;
    // ['admin','customer', 'seller']
    // si se encuntra alguno pasa
    if (roles.includes(user.role) == 'admin') {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApikey, checkAdminRole, checkRoles };
