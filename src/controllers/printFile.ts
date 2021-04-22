import { EventResponse } from "../../electron/main";

const { ipcRenderer } = window.require('electron');

export default class PrintFile{
    async print(){
        try{
            await this.requestPrint()
        }catch(err){
            alert(err)
        }

    }

    private requestPrint(){
        ipcRenderer.send('print_file')
        return new Promise((resolve, reject) => {
            ipcRenderer.once('print_file_response', (_e: any, arg: EventResponse) => {
                if(arg.success){
                    resolve('Success')
                    return
                }
                reject(arg.message)
            })
        })
    }
}