import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    &.Active{
        &>.MenuButton{
            &>.TopBar{
                transform: rotate(45deg) translateY(2.5px) translateX(2.5px);
                background-color: #ff9090;
            }
            &>.MiddleBar{
                transform: rotate(-45deg) translateY(-2.5px) translateX(2.5px);
                background-color: #ff9090;
            }
            &>.BottomBar{
                opacity: 0;
            }
        }
        &>.Menu{
            width: 250px
        }
        background-color: rgba(0,0,0, 0.3);
        z-index: 3;
    }
    &.Hidden{
        display: none;
    }
`

export const MenuButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 5px;
  width: 30px;
  height: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  cursor: pointer;
`

export const MenuButtonBar = styled.div`
  background-color: #666;
  width: 20px;
  height: 3px;
  margin: 2px;
  border-radius: 5px;
  transition: all linear 0.3s;
`;

export const Menu = styled.div`
  background-color: #666;
  color: #fff;
  height: 100%;
  width: 0;
  transition: all linear 0.3s;
  padding-top: 80px;
  `
export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  &:hover{
      color: #ff9090;
  }
`