import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmDialog = ({ show, message, onConfirm, onCancel }) => {
  return (
    <>
      <Modal show={show} onHide={onCancel} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-check-circle"></i> Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            No
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDialog;
