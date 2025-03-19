const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadDir } = require('./uploadRoute');

// Verificar si la ruta ya existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads directory created successfully.');
} else {
    const stats = fs.lstatSync(uploadDir);
    if (!stats.isDirectory()) {
        console.error(`Error: ${uploadDir} exists but is not a directory.`);
    } else {
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
            // Generar un nombre único usando Date.now() y un número aleatorio
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
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