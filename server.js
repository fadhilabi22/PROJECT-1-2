const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files dari folder public (di dalam folder ini)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

// Tangkap semua request lainnya (buat SPA frontend, misalnya React atau HTML biasa)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});