import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0; /* same as top:0, bottom:0, left:0, right:0 */
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 400px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 1.5rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  line-height: 1;

  &:hover {
    color: #007bff;
  }
`;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
