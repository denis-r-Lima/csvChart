import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts"

import MarkerLabel from "../markerLabel"
import { clickHandle } from "../../controllers/plotHandle"
import { 
  ChartContainer, 
  ChartInfoContainer, 
  Container, 
  HeaderContainer, 
  LegendContainer } from "./styles"
import { states, States } from "../../routes"
import CustomLegend from "../CustomLegend"
import ChartInfo from "../ChartInfo"
import StorageFile from "../../controllers/storageFile"
import PrintFile from "../../controllers/printFile"

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
  const [ignorePlot, setIgnorePlot] = useState<Set<number>>(new Set())
  console.log(markers)
  let keys: string[] = []
  if (plotData[0]) {
    keys = Object.keys(plotData[0])
  }

  if (keys.indexOf("xAxis") >= 0) {
    keys.splice(keys.indexOf("xAxis"), 1)
  }

  const HandleMarker = (e: any) => {
    if (markers.length >= 4 || !e) return

    setMarkers(current => current.concat(clickHandle(e)))
  }

  return (
    <Container>
      <HeaderContainer>
        <h1>Pressure Test Report</h1>
      </HeaderContainer>
      <ChartContainer>
        <div>
          <button onClick={() => handleClick()}>New</button>
          <button onClick={() => setMarkers([])}>Clear Markers</button>
          <button onClick={() => new StorageFile().saveFile()}>Save PDF</button>
          <button onClick={() => new PrintFile().print()} >Print</button>
        </div>
        <LineChart
          width={730}
          height={450}
          data={plotData}
          onClick={(e: any) => HandleMarker(e)}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='xAxis' />
          <YAxis />
          <Tooltip />
          {keys ? (
            keys.map((key, index) => {
              if (ignorePlot.has(index)) return null
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
                  strokeWidth={2}
                  label={
                    <MarkerLabel
                      text={`${index + 1}`}
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
        <LegendContainer>
          {keys ? (
            keys.map((key, index) => {
              return (
                <CustomLegend
                  color={colors[index]}
                  index={index}
                  ignorePlot={ignorePlot}
                  setIgnorePlot={setIgnorePlot}
                  text={key}
                  key={`${key} = ${index}`}
                />
              )
            })
          ) : (
            <></>
          )}
        </LegendContainer>
      </ChartContainer>
      <ChartInfoContainer>
        <ChartInfo
          marker={markers}
          ignorePlot={ignorePlot}
          keys={keys}
        />
      </ChartInfoContainer>
    </Container>
  )
}

export default Main
