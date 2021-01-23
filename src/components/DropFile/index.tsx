import React from 'react';

import { Container } from './styles';
import DropBox from '../DropBox';
import Modal from '../Modal'

const DropFile: React.FC = () => {
  return (
    <div>
      <Container
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = 'none';
        }}
      >
        <DropBox />
      </Container>
      <Modal />  
    </div>
  );
};

export default DropFile;
