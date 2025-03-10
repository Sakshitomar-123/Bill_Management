
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div`
  color: #2ecc71;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
`;

const ModalText = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
`;

export {CloseButton,ModalText,ModalTitle,SuccessIcon,ModalContent,ModalOverlay};