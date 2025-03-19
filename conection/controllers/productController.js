const pool = require('../db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';
    try {
        const [results] = await pool.query(query, [productId]);
        if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error('Error obteniendo detalles del producto:', err);
        res.status(500).json({ success: false, message: 'Error obteniendo detalles del producto' });
    }
};

exports.addProduct = async (req, res) => {
    try {
        console.log('Datos recibidos en el servidor (req.body):', req.body);
        console.log('Archivos recibidos en el servidor (req.files):', req.files);

        // Depuración: Verificar los archivos recibidos
        if (req.files) {
            console.log('Archivo imagen1:', req.files.imagen1 ? req.files.imagen1[0].filename : 'No se recibió imagen1');
            console.log('Archivo imagen2:', req.files.imagen2 ? req.files.imagen2[0].filename : 'No se recibió imagen2');
            console.log('Archivo imagen3:', req.files.imagen3 ? req.files.imagen3[0].filename : 'No se recibió imagen3');
        }

        const { nombre, precio, cantidad, servicio, id, descripcion } = req.body;
        const imagen1 = req.files.imagen1 ? `/uploads/${req.files.imagen1[0].filename}` : null;
        const imagen2 = req.files.imagen2 ? `/uploads/${req.files.imagen2[0].filename}` : null;
        const imagen3 = req.files.imagen3 ? `/uploads/${req.files.imagen3[0].filename}` : null;

        if (!nombre || !precio || !cantidad || !servicio || !id || !descripcion) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO productos (nombre, precio, cantidad, servicio, id, descripcion, imagen1, imagen2, imagen3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [nombre, precio, cantidad, servicio, id, descripcion, imagen1, imagen2, imagen3]);

        res.status(201).json({ success: true, message: 'Producto agregado con éxito' });
    } catch (err) {
        console.error('Error agregando producto:', err);
        res.status(500).json({ success: false, message: 'Error agregando producto' });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        console.log('Datos recibidos en el servidor (req.body):', req.body);
        console.log('Archivos recibidos en el servidor (req.files):', req.files);

        const { nombre, precio, cantidad, servicio, descripcion } = req.body;
        const imagen1 = req.files.imagen1 ? `/uploads/${req.files.imagen1[0].filename}` : null;
        const imagen2 = req.files.imagen2 ? `/uploads/${req.files.imagen2[0].filename}` : null;
        const imagen3 = req.files.imagen3 ? `/uploads/${req.files.imagen3[0].filename}` : null;

        const query = `
            UPDATE productos 
            SET nombre = ?, precio = ?, cantidad = ?, servicio = ?, descripcion = ?, 
                imagen1 = COALESCE(?, imagen1), 
                imagen2 = COALESCE(?, imagen2), 
                imagen3 = COALESCE(?, imagen3) 
            WHERE id = ?`;
        await pool.query(query, [nombre, precio, cantidad, servicio, descripcion, imagen1, imagen2, imagen3, productId]);

        res.status(200).json({ success: true, message: 'Producto actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando producto:', err);
        res.status(500).json({ success: false, message: 'Error actualizando producto' });
    }
};