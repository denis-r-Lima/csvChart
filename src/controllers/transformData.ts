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

    const [, time] = d[0].split(' ')
    
    for (let i = 1; i < d.length; i++) {
      
        let value = parseInt(d[i])
        if (value < 0) value = 0
        dataObject[columns[i]] = value
      
    }
    dataObject.xAxis = time
    transformedData.push(dataObject)
    return null
  })

  return transformedData
}
