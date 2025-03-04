const { app, BrowserWindow } = require('electron');
const path = require('path');
const server = require('./conection/server'); // Asegúrate de que el servidor se inicie

function createWindow() {
    console.log('Creating main window');
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Permitir el uso de Node.js 
            contextIsolation: false // Necesario para algunas versiones de Electron
        },
        icon: path.join(__dirname, 'icon.png') // Ruta del icono
    });

    // Carga la URL del servidor en lugar del archivo local
    mainWindow.loadURL('http://localhost:3000/tienda/index.html');

    mainWindow.on('closed', () => {
        console.log('Main window closed');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load URL:', errorDescription);
    });

    mainWindow.webContents.on('did-finish-load', () => {
        console.log('URL loaded successfully');
    });
}

app.on('ready', () => {
    console.log('App is ready');
    createWindow();
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
    server.close(() => {
        console.log('Server closed');
    });
});

app.on('error', (err) => {
    console.error('App error:', err);
});
