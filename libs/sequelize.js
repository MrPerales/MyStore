const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../bd/models');

///////////Para POSTGRES////////////////////////
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);
// una ves sincronizasdo va a crear las tablas que viene de setupModels

// sync() crea las tablas en la base de datos, no se usa en produccion
//sequelize.sync();

module.exports = sequelize;

/////////// para MYSQL/////////////
// ERROR :(
// code: 'ER_ACCESS_DENIED_ERROR',
// errno: 1045,
// sqlState: '28000',
// sqlMessage: "Access denied for user 'root'@'localhost' (using password: YES)"

// const DBNAME = encodeURIComponent(config.mySqlName);
// const USER = encodeURIComponent(config.mySqlUser);
// const PASSWORD = encodeURIComponent(config.mySqlPassword);
// const HOST = encodeURIComponent(config.dbHost);

// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.mySqlPort}/${config.mySqlName}`;

// const sequelize = new Sequelize(DBNAME, USER, PASSWORD, {
//   host: HOST,
//   dialect: 'mysql',
//   logging: true,
// });
