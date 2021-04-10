import React, { useContext } from "react"
import { useHistory } from "react-router-dom"


import { DropBox } from "./styles"

import {
  testFileExtension,
  OpenDragFile,
  OpenFileWindows,
} from "../../controllers/handleFile"

import { states, States } from "../../routes"
import DataManipulation from "../../controllers/dataManipulation"
import TransformData from "../../controllers/transformData"

const Box: React.FC = () => {
  let { setData, setPlotData} = useContext(states) as States
  const history = useHistory()

  const columnsToRevome = [0,2,8,9]
  const rowsToRemove = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
    20,21,22,23,24]

  const DropEvent = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    let file = e.dataTransfer.files.item(0)
    if (file) {
      if (testFileExtension(file)) {
        const dragFile = new OpenDragFile(file.path)
        const data = dragFile.getData()
        setData(data)
        const finalData = new DataManipulation(data)
                        .removeColumn(columnsToRevome)
                        .removeRow(rowsToRemove)
                        .build()
        setPlotData(TransformData(['Time','Ch1','Ch2','Ch3','Ch4','Ch5'], finalData))
        history.push('/main')
      } else {
        alert("Error, please use only .csv files!")
      }
    }
  }

  const DragOverEvent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "copy"
  }

  const DragEnterEvent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const DragLeaveEvent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "move"
  }

  const onCLickEvent = async () => {
    try {
      const fileWindows = new OpenFileWindows()
      const data = await fileWindows.getData()
      if (data) {
        const finalData = new DataManipulation(data)
                        .removeColumn(columnsToRevome)
                        .removeRow(rowsToRemove)
                        .build()
        setPlotData(TransformData(['Time','Ch1','Ch2','Ch3','Ch4','Ch5'], finalData))
        history.push('/main')
      }
    } catch {}
  }

  return (
    <DropBox
      onDrop={(e) => DropEvent(e)}
      onDragOver={(e) => DragOverEvent(e)}
      onDragEnter={(e) => DragEnterEvent(e)}
      onDragLeave={(e) => DragLeaveEvent(e)}
      onClick={() => onCLickEvent()}
    >
      <p>Drop .csv file here or click to select file!</p>
    </DropBox>
  )
}

export default Box
