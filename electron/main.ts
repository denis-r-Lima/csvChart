import * as path from 'path';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

let win: BrowserWindow

function createWindow() {
    win = new BrowserWindow({
    width: 1024,
    height: 728,
    show: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  if (process.env.IS_DEV) {
    win.loadURL("http://localhost:3000/")
    //win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, "../build/index.html"))
    win.removeMenu()
  }
  win.maximize()
  win.once("ready-to-show", () => {
    win.show()
  })

  win.once("close", () => {
    app.quit()
  })
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

ipcMain.on('Generate PDF data', async e => {
  try{
    let data = await win.webContents.printToPDF({
      landscape: true,
      marginsType: 1,
      pageSize: 'A4',
      printBackground: true
    })
    e.sender.send('PDF data ready', data)
  }catch(err){
    e.sender.send('Error', err)
  }
})

ipcMain.on('Get save path', async e => {
  const filePath = await dialog.showSaveDialog({
    properties: ['createDirectory'],
    filters: [{ name: 'pdf File', extensions: ['pdf'] }],
  }); 

  if (!filePath.canceled) {
    e.sender.send('Save path ready', filePath.filePath);
    return
  }else{
    e.sender.send('Canceled')
    return
  }
})

ipcMain.on('Print file', async e => {
     win.webContents.print({}, (success, err) => {
       if(success){
         e.sender.send('Success')
       }else{
         e.sender.send('Fail', err)
       }
     } )
})