import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

import MarkerLabel from "./markerLabel"
import { clickHandle } from "../../controllers/plotHandle"
import { Container } from "./styles"
import { states, States } from "../../routes"

interface Marker {
  xAxis: string
  [key: string]: any
}

const colors: string[] = ["#AA2020", "#106610", "#101055", "#801080", "#000000"]

const Main: React.FC = () => {
  let history = useHistory()

  const handleClick = () => {
    history.push("/")
  }

  const { plotData } = useContext(states) as States
  const [markers, setMarkers] = useState<Marker[]>([])

  let keys: string[] = []
  if (plotData[0]) {
    keys = Object.keys(plotData[0])
  }

  if (keys.indexOf("xAxis") >= 0) {
    keys.splice(keys.indexOf("xAxis"), 1)
  }
  console.log(markers)

  return (
    <div>
      <Container>
        <div>
          <button onClick={() => handleClick()}>New</button>
          <button onClick={() => console.log({ plotData, keys })}>
            Log Data
          </button>
          <button onClick={() => setMarkers([])}>Clear Markers</button>
        </div>
        <ResponsiveContainer width='80%' height='70%'>
          <LineChart
            data={plotData}
            onClick={(e: any) => setMarkers(markers.concat(clickHandle(e)))}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='xAxis' />
            <YAxis />
            <Tooltip />
            <Legend onClick={(e) => console.log(e)} />
            {keys[0] ? (
              keys.map((key, index) => {
                return (
                  <Line
                    type='monotone'
                    dataKey={key}
                    stroke={colors[index]}
                    key={key}
                    dot={false}
                    strokeWidth={2}
                  />
                )
              })
            ) : (
              <></>
            )}
            {markers[0] ? (
              markers.map((marker, index) => {
                return (
                  <ReferenceLine
                    x={marker["xCord"]}
                    stroke='black'
                    label={
                      <MarkerLabel
                        text={`${index + 1}: ${
                          marker["Cable Head Test"]
                        } psi`}
                        xCord={marker.x}
                      />
                    }
                    key={index}
                  />
                )
              })
            ) : (
              <></>
            )}
          </LineChart>
        </ResponsiveContainer>
      </Container>
    </div>
  )
}

export default Main
