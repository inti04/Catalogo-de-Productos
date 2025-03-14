const path = require('path');

// Obtener la ruta del directorio del usuario actual
const userProfilePath = process.env.USERPROFILE || path.join(process.env.HOME);

// Definir la ruta del directorio uploads
const uploadDir = path.join(userProfilePath, 'AppData', 'Local', 'Programs', 'catalogo', 'uploads');

module.exports = {
    uploadDir
};