import fs from "fs";
import { EventResponse } from "../../electron/main";
const { ipcRenderer } = window.require("electron");

export default class StorageFile {
  private path?: string;
  private data?: Buffer;

  public async saveFile() {
    try {
      this.path = await this.getPath();
      this.data = await this.generateData();
      fs.writeFileSync(this.path, this.data);
    } catch (err) {
      console.log(err);
    }
  }

  private async getPath(): Promise<string> {
    ipcRenderer.send("get_save_path");

    return new Promise((resolve, reject) => {
      ipcRenderer.once("get_save_path_response", (_e:any, arg: EventResponse) => {
        if(arg.success){
          resolve(arg.message)
          return
        }
        reject('Canceled')
      })
    });
  }

  private async generateData(): Promise<Buffer> {
    ipcRenderer.send("generate_PDF_data");

    return new Promise((resolve, reject) => {
      ipcRenderer.once("generate_PDF_data_response", (_e: any, arg: EventResponse) => {
        if(arg.success){
          resolve(arg.message)
          return
        }
        reject(arg.message)
      })
    });
  }
}
