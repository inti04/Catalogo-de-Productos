const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar multer para manejar la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generar un nombre único para cada archivo
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'imagen1', maxCount: 1 },
    { name: 'imagen2', maxCount: 1 },
    { name: 'imagen3', maxCount: 1 }
]);

module.exports = upload;