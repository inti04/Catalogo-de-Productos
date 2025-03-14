const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { uploadDir } = require('./conection/middlewares/uploadRoute'); // Importar la ruta desde config.js
const server = require('./conection/server'); // Importar el servidor desde server.js

let mainWindow; // Declarar mainWindow en el ámbito global

function createWindow() {
    console.log('Creating main window');
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'icon.png')
    });

    const loadURL = () => {
        if (!mainWindow || mainWindow.isDestroyed()) {
            console.log('Main window is destroyed, skipping URL load.');
            return;
        }

        mainWindow.loadURL('http://localhost:3000/tienda/index.html')
            .then(() => console.log('URL loaded successfully'))
            .catch((err) => {
                console.error('Failed to load URL:', err);
                setTimeout(loadURL, 1000); // Reintentar cargar la URL después de 1 segundo
            });
    };

    loadURL();

    mainWindow.on('closed', () => {
        console.log('Main window closed');
        mainWindow = null; // Limpiar la referencia a la ventana
    });
}

app.on('ready', () => {
    console.log('App is ready');
    createWindow();
    console.log('App installed at:', app.getAppPath());

    // Verificar si la ruta ya existe
    if (!fs.existsSync(uploadDir)) {
        // Si no existe, crear el directorio
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Uploads directory created successfully.');
    } else {
        // Si existe, verificar si es un directorio
        const stats = fs.lstatSync(uploadDir);
        if (!stats.isDirectory()) {
            // Si no es un directorio, mostrar un error y manejarlo
            console.error(`Error: ${uploadDir} exists but is not a directory.`);
            // Opcional: Eliminar el archivo y crear el directorio
            fs.unlinkSync(uploadDir);
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('Fixed: Deleted file and created directory.');
        } else {
            // Si es un directorio, no hacer nada
            console.log('Uploads directory already exists.');
        }
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('All windows closed');
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        console.log('App activated');
        createWindow();
    }
});

app.on('quit', () => {
    console.log('App is quitting');
    if (server) {
        server.close(() => {
            console.log('Server closed');
        });
    }
});

app.on('error', (err) => {
    console.error('App error:', err);
});