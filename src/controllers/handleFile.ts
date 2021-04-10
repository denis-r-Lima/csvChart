import fs from 'fs';
const { ipcRenderer } = window.require('electron');

export function testFileExtension(e: File): boolean {
  return /\.csv$/i.test(e.name);
}

export class HandleFile {
  protected path: string

  constructor(path: string){
    this.path = path
  }
  
  protected stringToArray(data: string) {
    const lineDataArray = data.split(/\r?\n/);

    const dataArray: string[][] = lineDataArray.map((line) => {
      const lineArray = line.split(',') 
      return lineArray;
    });
    return dataArray;
  }

  public openFile(){
    const data = fs.readFileSync(this.path, 'utf8');

    const dataArray: string[][] = this.stringToArray(data);

    return dataArray;
  }
 
}

export class HandleFileWindows extends HandleFile{
  constructor(){
    super('')
  }

  public openFileWindowns(): Promise<string[][]> {
    ipcRenderer.send('open file dialog');
  
    return new Promise((resolve, reject) => {
      ipcRenderer.once('file path', (_e: any, arg: string) => {
        this.path = arg
        const dataArray = this.openFile();
        resolve(dataArray);
      });
      ipcRenderer.once('canceled', (_e: any) => {
        reject(false);
      });
    });
  }
  
}