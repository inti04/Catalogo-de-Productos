const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadDir } = require('./uploadRoute'); // Importar la ruta desde config.js

// Verificar si la ruta ya existe
if (!fs.existsSync(uploadDir)) {
    // Si no existe, crear el directorio
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads directory created successfully.');
} else {
    // Si existe, verificar si es un directorio
    const stats = fs.lstatSync(uploadDir);
    if (!stats.isDirectory()) {
        // Si no es un directorio, mostrar un error
        console.error(`Error: ${uploadDir} exists but is not a directory.`);
    } else {
        // Si es un directorio, no hacer nada
        console.log('Uploads directory already exists.');
    }
}

let storage;
try {
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único para cada archivo
        }
    });
} catch (error) {
    console.error(error);
}

const upload = multer({ storage: storage }).fields([
    { name: 'imagen1', maxCount: 1 },
    { name: 'imagen2', maxCount: 1 },
    { name: 'imagen3', maxCount: 1 }
]);

module.exports = upload;