import fs from 'fs';
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

  protected openFile(): string[][]{

    const data = fs.readFileSync(this.path, 'utf8');

    const dataArray: string[][] = this.splitComma(data);

    return dataArray;
  }
}

export class OpenDragFile extends HandleFile {
  constructor(path: string = ''){
    super(path)
  }
  
  public getData(): string[][]{
    return this.openFile()
  }
 
}

export class OpenFileWindows extends HandleFile{

  private openFileWindowns(): Promise<string> {
    ipcRenderer.send('open_file_dialog');
  
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
      return this.openFile()
    }catch{
      return false
    }
  }
  
}