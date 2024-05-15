require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  pgMail: process.env.PG_MAIL,
  pgPassword: process.env.PG_PASSWORD,
  pgPort: process.env.PG_PORT,
  pgRefPort: process.env.PG_REFPORT,
  mySqlName: process.env.MYSQL_NAME,
  mySqlUser: process.env.MYSQL_USER,
  mySqlPassword: process.env.MYSQL_PASSWORD,
  mySqlPort: process.env.MYSQL_PORT,
  phpMyAdminPort: process.env.PHPMYADMIN_PORT,
};
module.exports = { config };
