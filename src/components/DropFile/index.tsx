import React from "react"

import { Container } from "./styles"
import DropBox from "../DropBox"

const DropFile: React.FC = () => {

  return (
    <div>
      <Container
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.dataTransfer.dropEffect = "none"
        }}
      >
        <DropBox />
      </Container>
    </div>
  )
}

export default DropFile
