import fs from 'fs';
const { ipcRenderer } = window.require('electron');

export function testFileExtension(e: File): boolean {
  return /\.csv$/i.test(e.name);
}

class HandleFile{
  protected path: string

  constructor(path: string = ''){
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

  protected openFile(): string[][]{
    const data = fs.readFileSync(this.path, 'utf8');

    const dataArray: string[][] = this.stringToArray(data);

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
    ipcRenderer.send('open file dialog');
  
    return new Promise((resolve, reject) => {
      ipcRenderer.once('file path', (_e: any, arg: string) => {
        resolve(arg);
      });
      ipcRenderer.once('canceled', (_e: any) => {
        reject(false);
      });
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