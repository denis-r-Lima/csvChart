import fs from 'fs';
const { ipcRenderer } = window.require('electron');

function stringDataToArray(data: string, longestLine:number[]): Array<Array<string>> {
  const lineDataArray = data.split(/\r?\n/);
  const dataArray: Array<Array<string>> = [];

  lineDataArray.map((line) => {
    const lineArray = line.split(',') 
    dataArray.push(lineArray);
    if(lineArray.length > longestLine[0]) longestLine[0] = lineArray.length
    return null;
  });
  return dataArray;
}

export function testFileExtension(e: File): boolean {
  return /\.csv$/i.test(e.name);
}

export function openFile(path: string, longestLine: number[]): Array<Array<string>> {

  const data = fs.readFileSync(path, 'utf8');

  const dataArray: Array<Array<string>> = stringDataToArray(data, longestLine);

  return dataArray;
}

export function openFileWindowns(longestLine: number[]): Promise<string[][]> {
  ipcRenderer.send('open file dialog');

  return new Promise((resolve, reject) => {
    ipcRenderer.once('file path', (_e: any, arg: string) => {
      const dataArray = openFile(arg, longestLine);
      resolve(dataArray);
    });
    ipcRenderer.once('canceled', (_e: any) => {
      reject(false);
    });
  });
}
