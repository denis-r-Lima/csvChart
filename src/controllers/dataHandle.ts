export default function removeData(
  data: string[][] | null,
  linesToRemove: number[],
  columnsToRemove: number[]
): string[][] {
  if(!data) return []
  let preArray: string[][] = []
  let dataArray = preArray.concat(data)

  linesToRemove = sortArray(linesToRemove)
  columnsToRemove = sortArray(columnsToRemove)

  linesToRemove.map(line => {
    dataArray.splice(line,1)
    return null
  })

  dataArray.map((_line, index) => {
    columnsToRemove.map(column => {
      dataArray[index].splice(column, 1)
      return null
    })
    return null
  })
  
  removeSelectFromCells()

  return dataArray
}

function sortArray(arr: number[]): number[]{
  return arr.sort((a,b) => b - a)
}

function removeSelectFromCells(){
  const cellsArray = document.querySelectorAll(".Selected")

  for(let i = 0; i < cellsArray.length; i++){
    cellsArray[i].classList.remove("Selected")
  }
  
}