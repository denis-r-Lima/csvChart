import * as path from 'path';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev'

function createWindow() {
  let win = new BrowserWindow({
    width: 1024,
    height: 728,
    show: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  if (isDev) {
    win.loadURL("http://localhost:3000/")
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"))
  }
  win.maximize()

  win.once("ready-to-show", () => {
    win.show()
  })

  /*win.once("close", () => {
    app.quit()
  })*/
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('open file dialog', async (e) => {
  const filePath = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'csv File', extensions: ['csv'] }],
  }); 

  if (!filePath.canceled) {
    e.sender.send('file path', filePath.filePaths[0]);
    return
  }else{
    e.sender.send('canceled')
    return
  }
});
