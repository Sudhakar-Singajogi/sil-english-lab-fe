import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalPopup = ({
  show,
  title,
  childComp,
  onCancel,
  showFooter = false,
  size = "lg", // Accepts 'sm', 'lg', 'xl'
  footerContent = null, // Optional custom footer content
  className = "", // For custom modal classes if needed
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onCancel}
        centered
        backdrop="static"
        size={size}
        className={className}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{childComp}</Modal.Body>

        {showFooter && (
          <Modal.Footer>
            {footerContent || (
              <>
                <Button variant="secondary" onClick={onCancel}>
                  Cancel
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ModalPopup;
