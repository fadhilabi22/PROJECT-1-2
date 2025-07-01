const mysql = require('mysql2');
require('dotenv').config();

// WAJIB: Ganti createConnection menjadi createPool untuk Railway
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Ambil dari variabel environment Railway
    user: process.env.DB_USER,       // Ambil dari variabel environment Railway
    password: process.env.DB_PASSWORD, // Ambil dari variabel environment Railway
    database: process.env.DB_NAME,   // Ambil dari variabel environment Railway
    waitForConnections: true,
    connectionLimit: 10,             // Jumlah koneksi yang dikelola pool
    queueLimit: 0
});

console.log('Connection pool untuk Railway berhasil dibuat.');

// Ekspor pool agar bisa dipakai di seluruh aplikasi
module.exports = pool;