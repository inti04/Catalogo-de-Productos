/**
 * Este script define un controlador para manejar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * relacionadas con los productos en una base de datos. Utiliza una conexión a la base de datos para ejecutar
 * consultas SQL y devolver los resultados a través de respuestas HTTP.
 */

const pool = require('../db'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM productos'); 
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id; // Cambia a req.params.id (coincide con la ruta)
    const query = 'SELECT * FROM productos WHERE id = ?';
    try {
        const [results] = await pool.query(query, [productId]); // Usa pool.query
        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error('Error obteniendo detalles del producto:', err);
        res.status(500).json({ success: false, message: 'Error obteniendo detalles del producto' });
    }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
    try {
        console.log('Datos recibidos en el servidor (req.body):', req.body);
        console.log('Archivos recibidos en el servidor (req.files):', req.files);

        const { nombre, precio, cantidad, servicio, id, descripcion } = req.body;
        const imagen1 = req.files.imagen1 ? '/uploads/' + req.files.imagen1[0].filename : null;
        const imagen2 = req.files.imagen2 ? '/uploads/' + req.files.imagen2[0].filename : null;
        const imagen3 = req.files.imagen3 ? '/uploads/' + req.files.imagen3[0].filename : null;

        if (!nombre || !precio || !servicio || !id || !descripcion) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO productos (nombre, precio, servicio, id, descripcion, imagen1, imagen2, imagen3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [nombre, precio, servicio, id, descripcion, imagen1, imagen2, imagen3]);

        res.json({ success: true, message: 'Producto agregado con éxito' });
    } catch (err) {
        console.error('Error al agregar el producto:', err);
        res.status(500).json({ success: false, message: 'Error al agregar el producto', error: err.message });
    }
};


