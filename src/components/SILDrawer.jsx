import React from "react";
import { Offcanvas } from "react-bootstrap";
import "./SILDrawer.css"; // Import custom styles

const SILDrawer = ({
  show,
  onClose,
  title = "Panel",
  placement = "end",
  children,
  width = "500px", // default width
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement={placement}
      backdrop="static"
      className="sil-drawer" 
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>

      {/* Content should be scrollable */}
      <Offcanvas.Body className="drawer-body-layout">
        <div className="drawer-scrollable-content">{children}</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SILDrawer;
