const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');
const pool = require('./db');
const { uploadDir } = require('./middlewares/uploadRoute'); // Importar la ruta de uploads desde config.js

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(uploadDir)); // Usar uploadDir desde config.js

// Usar las rutas de productos
app.use('/api', productRoutes);

// Ruta para tienda.html
app.get('/tienda/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tienda/index.html'));
});

// Ruta de la API para obtener productos
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Agregar una ruta de estado
app.get('/status', (req, res) => {
    res.send('Server is running');
});

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;