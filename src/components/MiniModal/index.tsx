import React, { useContext } from "react"
import { useHistory } from "react-router-dom"

import { states, States } from "../../routes"

import { Container, Content, TextInput } from "./styles"

import { Button } from "../Modal/style"

import transformData from "../../controllers/transformData"

let xAxisIndex: number[] = []

let columns: string[] = []

const changeColumnName = (e: React.ChangeEvent, arr: string[]) => {
  const target = e.target as HTMLInputElement
  arr[parseInt(e.target.id)] = target.value
}

const selectXAxis = (e: React.ChangeEvent) => {
  const target = e.target as HTMLInputElement
  const value = parseInt(target.value)
  const index = xAxisIndex.indexOf(value)

  if (index < 0) {
    xAxisIndex.push(value)
  } else {
    xAxisIndex.splice(index, 1)
  }
}

const MiniModal: React.FC = () => {
  const { longestLine, setPlotData, data, setData } = useContext(
    states
  ) as States
  let history = useHistory()

  columns = []
  for (let i = 1; i <= longestLine[0]; i++) {
    columns.push(`Column ${i}`)
  }

  const okClickHandle = () => {
    setPlotData(transformData(xAxisIndex, columns, data as string[][]))
    setData(null)
    xAxisIndex = []
    history.push("/main")
  }

  return (
    <Container className='Hidden'>
      <Content>
        <table>
          <tbody>
            <tr>
              <td>Data Label</td>
              <td style={{ textAlign: "center" }}>X-Axis</td>
            </tr>
            {columns.map((column, index) => {
              return (
                <tr key={column}>
                  <td>
                    <TextInput
                      type='text'
                      name='column'
                      id={`${index}`}
                      placeholder={column}
                      onChange={(e: React.ChangeEvent) =>
                        changeColumnName(e, columns)
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type='checkbox'
                      name='is-x-axis'
                      id={column}
                      value={index}
                      onChange={(e: React.ChangeEvent) => {
                        selectXAxis(e)
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Button onClick={() => okClickHandle()}>OK</Button>
      </Content>
    </Container>
  )
}

export default MiniModal
