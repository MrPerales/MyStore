const { Pool } = require('pg');

// pool
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'carlos',
  password: 'admin123',
  database: 'my_first_store',
});

module.exports = pool;
