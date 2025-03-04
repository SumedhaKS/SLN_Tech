import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { isDev } from './util.js';
import { createTables } from './db.js';

function createWindow() {
    const preloadPath = path.join(app.getAppPath(), '/dist-electron/preload.js');
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false,
        }
    });
    mainWindow.webContents.openDevTools();

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
}

app.on("ready", () => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

})

app.on('window-all-closed', () => {           // closes the process for windows
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
