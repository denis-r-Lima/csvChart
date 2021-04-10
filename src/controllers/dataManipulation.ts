export default class DataManipulation {
    private rowToRemove: number[]
    private columnToRemove: number[]
    private data: string[][] | null

    constructor(data: string[][] | null){
        this.rowToRemove = []
        this.columnToRemove = []
        this.data = data
    }

    private sortNumberArray ( arr: number[] ){
        return arr.sort((a,b) => b - a)
    }
 
    public removeRow (rowToRemove: number[]){
        this.rowToRemove = this.sortNumberArray(rowToRemove)
        
        return this
    }
    public removeColumn (columnToRemove: number[]){
        this.columnToRemove = this.sortNumberArray(columnToRemove)
        return this
    }

    public build(){
        if(!this.data) return null

        let arr = this.data.slice()

        this.rowToRemove.map(line => {
            arr.splice(line,1)
            return null
          })
        
          arr.map((_line, index) => {
            this.columnToRemove.map(column => {
              arr[index].splice(column, 1)
              return null
            })
            return null
          })
          arr.pop()

          return arr
    }
}