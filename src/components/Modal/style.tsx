import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContentHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  width:auto;
  max-width: 100%;
  margin: 10px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  padding: 0 30px;
`

export const ContentFooter = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid rgba(153, 153, 153, 0.6);
`

export const Td = styled.td`
  border: 1px solid rgba(153, 153, 153, 0.6);
  border-collapse: collapse;
  padding: 3px;
  text-align: left;
`

export const LineIndex = styled(Td)`
  padding: 0;
  background-color: #fff;
  text-align: center;
  position: sticky;
  left: -1px;
  cursor: pointer;
`

export const ColumnIndex = styled(Td)`
  padding: 0;
  background-color: #fff;
  text-align: center;
  position: sticky;
  top: -1px;
  cursor: pointer;
`

export const StickyP = styled.p`
  &.Selected {
    opacity: 50%;
  }

  width: 100%;
  height: 100%;
  background-color: rgb(100, 100, 130);
  transition: opacity linear 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
`
export const LabelInput = styled.input` 
  border: 0 0 1px 0 solid #999;
  
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #333;
  font-weight: bold;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
`
