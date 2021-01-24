import React, { useContext } from "react"

import { Container } from "./styles"
import DropBox from "../DropBox"
import Modal from "../Modal"
import { states, States } from "../../routes"

const DropFile: React.FC = () => {
  const { data } = useContext(states) as States

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
      {data ? <Modal /> : <></>}
    </div>
  )
}

export default DropFile
