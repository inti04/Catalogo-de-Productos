const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, '../src/assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true
    }
  })

  // Cargar la aplicación Vite en desarrollo o el build en producción
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    // Cargar directamente con hash para rutas
    win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}#/`)
    
    // Manejar rutas profundas al recargar
    win.webContents.on('did-fail-load', () => {
      win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}#/`)
    })
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})