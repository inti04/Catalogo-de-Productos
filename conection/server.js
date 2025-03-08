const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');
const pool = require('./db'); // Asegúrate de importar la conexión a la base de datos

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use('/gestion', express.static(path.join(__dirname, '../public/gestion'))); // Añadir esto para servir archivos desde la carpeta gestion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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