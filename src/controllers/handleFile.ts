import { EventResponse } from '../../electron/main';
const { ipcRenderer } = window.require('electron');

export function testFileExtension(e: File): boolean {
  return /\.csv$/i.test(e.name);
}

class HandleFile{
  protected path: string

  constructor(path: string = ''){
    this.path = path
  }

  private splitComma(data: string) {
    const linesArray = data.split(/\r?\n/);

    const dataArray: string[][] = linesArray.map((line) => {
      return line.split(',');
    });
    return dataArray;
  }

  protected openFile(): Promise<string[][]>{
    ipcRenderer.send('open_file', this.path)
    
    return new Promise((resolve) => {
      ipcRenderer.once('open_file_response', (_e: any, arg: EventResponse) => {
        const dataArray: string[][] = this.splitComma(arg.message);
        resolve(dataArray);
      })
    })
  }
}
    



export class OpenDragFile extends HandleFile {
  constructor(path: string = ''){
    super(path)
  }
  
  public async getData(): Promise<string[][]>{
    return await this.openFile() 
  }
 
}

export class OpenFileWindows extends HandleFile{

  private openFileWindowns(): Promise<string> {
    ipcRenderer.send('open_file_dialog')
  
    return new Promise((resolve, reject) => {
      ipcRenderer.once('open_file_dialog_response', (_e: any, arg: EventResponse) => {
        if(arg.success){
          resolve(arg.message)
          return
        }
        reject(arg.success)
      })
    });
  }

  public async getData(){
    try{
      this.path = await this.openFileWindowns()
      return await this.openFile()
    }catch{
      return false
    }
  }
  
}