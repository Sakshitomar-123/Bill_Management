import React, { useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalText,
  ModalTitle,
  CloseButton,SuccessIcon
} from "../assets/SuccessModal.styled";

function SuccessModal({ onClose }) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <SuccessIcon>✓</SuccessIcon>
        <ModalTitle>Success!</ModalTitle>
        <ModalText>
          Your invoice has been saved successfully and added to the customers
          list.
        </ModalText>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SuccessModal;
