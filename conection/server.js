const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');

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

// Ruta de la API
app.get('/api/products', (req, res) => {
    res.json({ products: [] }); // Asegúrate de devolver JSON válido
});

// Agregar una ruta de estado
app.get('/status', (req, res) => {
    res.send('Server is running');
});

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;