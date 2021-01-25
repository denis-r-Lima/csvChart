interface dataObject {
  [key: string]: any
}

export default function TransformData(
  xAxisIndex: number[],
  columns: string[],
  data: string[][]
): Object[] {
  const axisIndex = xAxisIndex.sort((a, b) => a - b)

  let transformedData: Object[] = []

  data.map((d) => {
    let dataObject: dataObject = {}
    let xAxis = ""
    for (let i = 0; i < axisIndex.length; i++) {
      xAxis += `${d[axisIndex[i]]} `
    }
    for (let i = 0; i < d.length; i++) {
      if (axisIndex.indexOf(i) < 0) {
        let value = parseInt(d[i])
        if (value < 0) value = 0
        dataObject[columns[i]] = value
      }
    }
    dataObject.xAxis = xAxis.trim()
    transformedData.push(dataObject)
    return null
  })

  return transformedData
}
