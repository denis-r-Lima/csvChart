import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    grid-template-columns: 760px 400px;
    grid-template-rows: 60px calc(100vh - 60px);
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
    align-items: flex-end;
    z-index: 2;
`

export const LegendContainer = styled.div `
    width: 710px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const ChartInfoContainer = styled.div`
    grid-row: 2;
    grid-column: 2;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    z-index: 2;
`