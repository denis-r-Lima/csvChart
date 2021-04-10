import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  &.Transparent{
    opacity: 0.4;
  }
`;

export const ColorDisplay = styled.div `
    width: 1rem;
    height: 1rem;
    margin-inline: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
`
export const LegendLabel = styled.div `
    min-width: 0.5rem;
    max-width: 10rem;
`
