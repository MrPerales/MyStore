const { Strategy } = require('passport-local');
const AuthService = require('../../../services/authService');
const service = new AuthService();

const localStratgy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      // null = no hay error , mandamos info
      done(null, user);
    } catch (error) {
      // manda el error , no fue posible la conexion
      done(error, false);
    }
  },
);

module.exports = localStratgy;
