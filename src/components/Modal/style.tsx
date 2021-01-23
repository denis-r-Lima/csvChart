import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: none;
`

export const ModalDiv = styled.div`
  position: absolute;
  top: 50px;
  bottom: 50px;
  left: 30px;
  right: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  z-index: 11;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  z-index: 12;
  overflow: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`
export const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid rgba(153, 153, 153, 0.6);
`
export const Td = styled.td`
  border: 1px solid rgba(153, 153, 153, 0.6);
  border-collapse: collapse;
  padding: 3px;
`
export const LineIndex = styled.td`
  background-color: rgb(100, 100, 153);
  text-align: center;
  position: sticky;
  left: -1px;
`

export const ColumnIndex = styled.td`
  background-color: rgb(100, 100, 153);
  text-align: center;
  position: sticky;
  top: -1px;
`
