import React, { useRef } from 'react';

import { ColorDisplay, Container, LegendLabel } from './styles';

interface Props{
    text: string
    color: string
    ignorePlot: Set<number>
    setIgnorePlot: React.Dispatch<React.SetStateAction<Set<number>>>
    index: number
}

const CustomLegend: React.FC<Props> = ({text, color, ignorePlot,setIgnorePlot, index}) => {

    let div = useRef<HTMLDivElement>(null)

    const HandleClick = () => {
        if(ignorePlot.has(index)) {
            div.current?.classList.remove('Transparent')
            return setIgnorePlot( current => {
            current.delete(index)
            return new Set(current.values())})}

        div.current?.classList.add('Transparent')
        return setIgnorePlot( current => {
            current.add(index)
            return new Set(current.values())})
    }
  return (
      <Container ref={div}>
          <ColorDisplay style={{backgroundColor: `${color}`}} onClick={HandleClick} />
          <LegendLabel contentEditable={true} spellCheck={false}><p>{text}</p></LegendLabel>
            
      </Container>
  )
  }
export default CustomLegend