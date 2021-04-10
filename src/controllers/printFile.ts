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
        ipcRenderer.send('Print file')
        return new Promise((resolve, reject) => {
            ipcRenderer.once('Success', ()=>{
                resolve('Success')
            })
            ipcRenderer.once('Fail', (_e, arg: any) => {
                reject(arg)
            })
        })
    }
}