import * as path from 'path';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

interface EventResponse{
  success?: boolean
  message?: any

}

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

ipcMain.on('open_file_dialog', async (e) => {
  const filePath = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'csv File', extensions: ['csv'] }],
  }); 

  let response: EventResponse = {}

  if (!filePath.canceled) {
    response = {
      success: true,
      message: filePath.filePaths[0]
    }
  }else{
    response = {
      success: false
    }
  }
  e.sender.send('open_file_dialog_response', response)
});

ipcMain.on('generate_PDF_data', async e => {
  let response: EventResponse = {}
  try{
    let data = await win.webContents.printToPDF({
      landscape: true,
      marginsType: 1,
      pageSize: 'A4',
      printBackground: true
    })
    response.success = true
    response.message = data
  }catch(err){
    response.success = false
    response.message = err
  }
  e.sender.send('generate_PDF_data_response', response)
})

ipcMain.on('get_save_path', async e => {
  const filePath = await dialog.showSaveDialog({
    properties: ['createDirectory'],
    filters: [{ name: 'pdf File', extensions: ['pdf'] }],
  }); 

  let response: EventResponse = {}

  if (!filePath.canceled) {
    response.success = true
    response.message = filePath.filePath    
  }else{
    response.success = true
  }

  e.sender.send('get_save_path_response', response)
})

ipcMain.on('print_file', async e => {
     win.webContents.print({}, (success, err) => {
       let response: EventResponse = {}
       if(success){
         response.success = true
        }else{
          response.success = false
          response.message = err
        }
        e.sender.send('print_file_response', response)
     } )
})