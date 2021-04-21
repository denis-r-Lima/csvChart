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
            ipcRenderer.once('print_file_response', (_e: any, arg: any) => {
                if(arg.succes){
                    resolve('Success')
                    return
                }
                reject(arg.error)
            })
        })
    }
}