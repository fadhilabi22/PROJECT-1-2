const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password diperlukan.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Format email tidak valid.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password minimal 6 karakter.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        res.status(201).json({ message: 'Registrasi berhasil. Silakan login.' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email sudah terdaftar' });
        }
        console.error("Error saat registrasi:", err);
        res.status(500).json({ message: 'Terjadi kesalahan internal saat registrasi' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password diperlukan.' });
    }

    try {
        const [results] = await db.query(
            'SELECT id, email, password, role FROM users WHERE email = ?',
            [email]
        );

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email tidak ditemukan' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Password salah' });
        }

        res.status(200).json({
            message: 'Login berhasil',
            userId: user.id,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        console.error("Error saat login query:", err);
        res.status(500).json({ message: 'Terjadi kesalahan internal' });
    }
});

module.exports = router;
