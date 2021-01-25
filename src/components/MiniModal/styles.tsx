import styled from "styled-components"

export const Container = styled.div`
  &.Hidden {
    opacity: 0;
    overflow: hidden;
    height: 0;
  }
  opacity: 1;
  position: absolute;
  top: 0;
  height: 100vh;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity linear 1s;
`

export const Content = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TextInput = styled.input`
  border: none;
  border-bottom: 1px solid #aaa;
  outline: none;
  padding: 3px;
  margin: 5px 100px 10px 0;
`
