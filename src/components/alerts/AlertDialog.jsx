import React from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';


const AlertDialog = ({ show, onClose, title = 'Alert', message = 'Something happened.' }) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="danger">{message}</Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;
