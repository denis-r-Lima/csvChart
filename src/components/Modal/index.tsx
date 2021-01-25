import React, { useContext } from "react"
import { MdChevronRight, MdClose, MdDeleteForever } from "react-icons/md"

import { SelectColumnCell } from "../../controllers/selectCell"
import removeData from "../../controllers/dataHandle"

import MiniModal from "../MiniModal"

import {
  Container,
  ModalDiv,
  Content,
  Table,
  Td,
  LineIndex,
  ColumnIndex,
  ContentFooter,
  ContentHeader,
  Button,
  StickyP,
} from "./style"

import { states, States } from "../../routes"

const Modal: React.FC = () => {
  const { data, setData, longestLine } = useContext(states) as States

  const tableHeader = new Array(longestLine[0]).fill(" ")

  let linesToDelete: number[] = []
  let columnsToDelete: number[] = []

  const CancelClick = () => {
    longestLine[0] = 0
    setData(null)
  }

  const DeleteClick = () => {
    longestLine[0] -= columnsToDelete.length
    setData(removeData(data, linesToDelete, columnsToDelete))
  }

  const ConfirmClick = () => {
    let miniModal = document.querySelector(".Hidden") as HTMLDivElement
    miniModal.classList.remove("Hidden")
    console.log("Confirmado parceiro")
  }

  return (
    <Container>
      <ModalDiv>
        <ContentHeader>
          <h4>Select lines and columns to be removed</h4>
        </ContentHeader>
        <Content>
          <Table>
            <tbody>
              <tr>
                <Td> </Td>
                {tableHeader.map((item, index) => {
                  return (
                    <ColumnIndex key={`${index} -- ${item}`}>
                      <StickyP
                        key={`${index} -- ${item}`}
                        onClick={(e: React.MouseEvent) => {
                          SelectColumnCell(e, columnsToDelete)
                        }}
                      >
                        {index + 1}
                      </StickyP>
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
                        <StickyP
                          key={index1}
                          onClick={(e: React.MouseEvent) => {
                            SelectColumnCell(e, linesToDelete)
                          }}
                        >
                          {index1 + 1}
                        </StickyP>
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
        <ContentFooter>
          <Button onClick={() => CancelClick()}>
            Cancel
            <MdClose size='18px' color='darkred' />
          </Button>
          <Button onClick={() => DeleteClick()}>
            Delete <MdDeleteForever size='20px' color='darkred' />
          </Button>
          <Button onClick={() => ConfirmClick()}>
            Next <MdChevronRight size='20px' color='green' />
          </Button>
        </ContentFooter>
      </ModalDiv>
      <MiniModal/>
    </Container>
  )
}

export default Modal
