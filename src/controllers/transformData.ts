interface dataObject {
  [key: string]: any
}

export default function TransformData(
  columns: string[],
  data: string[][] | null
): Object[] {
  if(!data) return []

  let transformedData: Object[] = []

  data.map((d) => {
    let dataObject: dataObject = {}
  
    for (let i = 1; i < d.length; i++) {
      
        let value = parseInt(d[i])
        if (value < 0) value = 0
        dataObject[columns[i]] = value
      
    }
    dataObject.xAxis = d[0]
    transformedData.push(dataObject)
    return null
  })

  return transformedData
}
