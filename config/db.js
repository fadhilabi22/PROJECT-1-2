const mysql = require('mysql2');
require('dotenv').config(); // ini penting agar bisa baca .env

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Terhubung ke MySQL');
});

module.exports = db;