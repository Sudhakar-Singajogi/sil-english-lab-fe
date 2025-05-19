// File: src/components/Pagination.js
import React from "react";
import PropTypes from "prop-types";
import { Pagination, Form, Row, Col } from "react-bootstrap";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "sm",
  maxVisible = 5,
  showPageSizeSelector = false,
  pageSize = 10,
  onPageSizeChange,
  showGotoPageSize = false,
}) => {
  
  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Row className="align-items-center justify-content-between mt-3">
      <Col xs="auto" className="mb-2 text-muted">
        Page {currentPage} of {totalPages}
      </Col>
      <Col xs="auto" className="mb-2">
        <Pagination size={size} className="mb-0">
          <Pagination.First
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Col>

      

      {showPageSizeSelector && (
        <Col xs="auto" className="mb-2">
          <Form.Select
            size={size}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}

      {showGotoPageSize && (
        <Col xs="auto" className="mb-2">
          <Form.Select
            size={size}
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                Go to Page {page}
              </option>
            ))}
          </Form.Select>
        </Col>
      )}
    </Row>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  maxVisible: PropTypes.number,
  showPageSizeSelector: PropTypes.bool,
  pageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func,
};

export default PaginationComponent;
