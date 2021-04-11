import React, { useRef } from 'react'
import { useHistory } from "react-router-dom"
import PrintFile from '../../controllers/printFile';
import StorageFile from '../../controllers/storageFile';
import { Marker } from '../Main';


import { Container , MenuButton , Menu, MenuButtonBar, Button } from './styles';

interface Props{
    setMarker: React.Dispatch<React.SetStateAction<Marker[]>>
}

const SideMenu: React.FC<Props> = ({ setMarker }) => {
    let menuButton = useRef<HTMLDivElement>(null)

    let history = useHistory()

    const HandleMenu = () => {
        if(menuButton.current){
            menuButton.current?.classList.contains('Active') ? 
            menuButton.current?.classList.remove('Active') :
            menuButton.current?.classList.add('Active')
        }
    }

    const NewFile = () => {
        history.push('/')
    }

    const ClearMarkers = () => {
        setMarker([])
        HandleMenu()
    }

    const SaveFile = async () => {
        menuButton.current?.classList.add('Hidden')
        await new StorageFile().saveFile()
        HandleMenu()
        menuButton.current?.classList.remove('Hidden')
    }

    const Print = async () => {
        menuButton.current?.classList.add('Hidden')
        await new PrintFile().print()
        HandleMenu()
        menuButton.current?.classList.remove('Hidden')

    }

    const outMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) menuButton.current?.classList.remove('Active')
    }

  return (
      <Container ref={menuButton} onClick= { e => outMenuClick(e)}>
          <MenuButton className='MenuButton' onClick={ HandleMenu }>
            <MenuButtonBar className='TopBar'/>
            <MenuButtonBar className='MiddleBar'/>
            <MenuButtonBar className='BottomBar'/>
          </MenuButton>
          <Menu className='Menu'>
            <Button onClick={ NewFile }>Load New File</Button>
            <Button onClick={ ClearMarkers }>Clear Markers</Button>
            <Button onClick={ SaveFile }>Save to PDF</Button>
            <Button onClick={ Print }>Print</Button>
          </Menu>
      </Container>
  )
}

export default SideMenu;