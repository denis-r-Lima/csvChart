import React from 'react';

import { Container } from './styles';

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
  </g>
  );
}

export default MarkerLabel;