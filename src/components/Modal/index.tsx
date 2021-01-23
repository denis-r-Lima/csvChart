import React, { useContext, useRef } from "react"

import { Container, ModalDiv, Content, Table, Td, LineIndex, ColumnIndex } from "./style"

import { states, States } from "../../routes"


const Modal: React.FC = () => {
  const { data, longestLine } = useContext(states) as States

  const container = useRef<HTMLDivElement | null>(null)

  const tableHeader = new Array(longestLine[0]).fill(" ")

  if (data !== null) {
    let modal_container = container.current as HTMLDivElement
    modal_container.style.display = "block"
  }

  return (
    <Container ref={container}>
      <ModalDiv>
        <Content>
          <Table>
            <tbody>
              <tr>
                <Td> </Td>
                {tableHeader.map((item, index) => {
                  return (
                    <ColumnIndex key={`${index} -- ${item}`}>
                      {index + 1}
                    </ColumnIndex>
                  )
                })}
              </tr>
              {data !== null ? (
                data.map((d, index1) => {
                  if (d.length < longestLine[0]) {
                    let length = d.length
                    for (let i = 0; i < longestLine[0] - length; i++) {
                      d.push(" ")
                    }
                  }
                  return (
                    <tr key={index1}>
                      <LineIndex key={index1}>
                        {index1 + 1}
                      </LineIndex>
                      {d.map((item, index2) => {
                        return <Td key={`${index1}-${index2}`}>{item}</Td>
                      })}
                    </tr>
                  )
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Content>
      </ModalDiv>
    </Container>
  )
}

export default Modal
