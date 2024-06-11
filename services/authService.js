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
    delete user.dataValues.recoveryToken;

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

  async sendMail(infoMail) {
    // Estos emails son de prueba
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'email sent' };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    // generamos el token para recovery
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10min' });
    // generamos el link para el frontend
    const link = `https:// www.frontend.com/recovery?token=${token}`;
    // agregamos el token a la DB
    await service.update(user.id, { recoveyToken: token });
    // creamos la estructura para el mail
    const infoMail = {
      from: config.smtpEmail, // sender address
      // email de prueba
      to: config.smtpEmail, // list of receivers
      //habilitar para pruebas reales
      //  to: user.email, // list of receivers

      subject: 'ApiFakeStore: Recupera tu cuenta 🗝️', // Subject line
      html: `
        <b>Ingresa a este link 👇👇 para recuperar tu cuenta 🗝️</b>
        <br>
        <a href="${link}">Recuperar cuenta</a>
      `, // html body
    };
    const resp = await this.sendMail(infoMail);
    return resp;
  }

  async changePassword(newPassword, token) {
    try {
      // obtenemos el payload
      const payload = jwt.verify(token, config.jwtSecret);
      // obtenemos el id del usuario del payload
      const id = payload.sub;
      //buscamos en la DB al usuario
      const user = await service.findOne(id);
      // verificamos si el token coincide con el de la BD
      // para que no reutilicen el token
      if (user.recoveyToken !== token) {
        throw boom.unauthorized();
      }
      // hacemos un hash a la nueva contraseña
      const hash = await bcrypt.hash(newPassword, 10);
      // actualizamos la BD
      await service.update(user.id, {
        recoveyToken: null, //borramos el token
        password: hash,
      });
      return { message: 'password changed successfully' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
