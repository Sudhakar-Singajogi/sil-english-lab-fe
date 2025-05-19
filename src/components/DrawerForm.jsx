// File: src/components/DrawerForm.jsx
import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { renderFieldsFromSchema } from "../utils/renderFieldsFromSchema";

const DrawerForm = ({
  title,
  show,
  onClose,
  onSubmit,
  formFields,
  initialData = {},
  submitLabel = "Save",
  formFor = "genric-form",
}) => {
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  console.log("formFields", formFields);

  useEffect(() => {
    const defaults = {};
    formFields.forEach((field) => {
      defaults[field.name] =
        initialData[field.name] || field.defaultValue || "";
    });
    setFormData(defaults);
    setValidated(false); // reset on open
  }, [initialData, formFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors = {};

    for (const field of formFields) {
      const val = formData[field.name];
      if (field.required && !val) {
        newErrors[field.name] =
          field.errorMessage || `${field.label} is required`;
      } else if (field.asyncValidate) {
        try {
          await field.asyncValidate(val);
        } catch (err) {
          newErrors[field.name] = err.message;
        }
      }
    }

    setErrors(newErrors);
    setValidated(true);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {renderFieldsFromSchema({
              schema: formFields,
              formData,
              onChange: handleChange,
              formFor,
              validated,
              errors,
            })}
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {submitLabel}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

DrawerForm.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formFields: PropTypes.array.isRequired,
  initialData: PropTypes.object,
  submitLabel: PropTypes.string,
};

export default DrawerForm;
