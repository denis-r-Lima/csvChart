import React from 'react';

import { Container, VerticalLine } from './styles';

interface MarkerProps{
    text: string;
    xCord: number
}

const MarkerLabel = (props: MarkerProps) : JSX.Element => {
  return (
  <g>
    <foreignObject x={props.xCord - 99} y={5} width={100} height={100}>
        <Container>{props.text}</Container>
    </foreignObject>
    <foreignObject x={props.xCord} y={5} width={100} height={410}>
        <VerticalLine />
    </foreignObject>
  </g>
  );
}

export default MarkerLabel;