import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 65% auto;
    grid-template-rows: 60px auto;
    padding: 0.5rem 1rem;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: 1 ;
    grid-column: 1/ span 2;
`

export const ChartContainer = styled.div`
    grid-row: 2;
    grid-column: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
`

export const LegendContainer = styled.div `
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const ChartInfoContainer = styled.div`
    grid-row: 2;
    grid-column: 2;
    padding: 0.5rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
`