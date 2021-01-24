import React, { useContext } from "react"

import { DropBox } from "./styles"

import {
  testFileExtension,
  openFile,
  openFileWindowns,
} from "../../controllers/handleFile"

import { states, States } from "../../routes"

const Box: React.FC = () => {
  let { setData, longestLine } = useContext(states) as States

  const DropEvent = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    let file = e.dataTransfer.files.item(0)
    if (file) {
      if (testFileExtension(file)) {
        setData(openFile(file.path, longestLine))
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
      let response = await openFileWindowns(longestLine)
      if (response) {
        setData(response)
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
