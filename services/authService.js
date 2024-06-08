const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');
const UsersService = require('./../services/userServices');
const service = new UsersService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    // Estos emails son de prueba
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.mail,
        pass: config.passwordMail,
      },
    });

    await transporter.sendMail({
      from: config.mail, // sender address
      // email de prueba
      to: config.mail, // list of receivers
      //habilitar para pruebas reales
      //  to: user.email, // list of receivers

      subject: 'Recovery Password ✔', // Subject line
      text: 'Recovery', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    return { message: 'email sent' };
  }
}

module.exports = AuthService;
