const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '29112002',
  database: 'beauty_salon',
  // connectionLimit: 10, // Adjust the connection limit as per your needs
});

module.exports = pool;
