const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize()


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })

    isDev ? 
    win.loadURL('http://localhost:3000') 
    : win.loadFile(path.join(__dirname, '../build/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
