import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalPopup = ({
  show,
  title,
  childComp,
  onCancel,
  showFooter = false,
}) => {
  return (
    <>
      <Modal show={show} onHide={onCancel} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{childComp}</Modal.Body>

        {showFooter && (
          <>
            <Modal.Footer></Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalPopup;
