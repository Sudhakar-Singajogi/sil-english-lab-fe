import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./renderFormSchema.css";

export function renderFieldsFromSchema({
  schema,
  formData,
  onChange,
  formFor,
  validated,
  errors={}
}) {
  const sections = {};
  console.log("schema is", schema);
  console.log("formData is", formData);

  // Group fields by section
  schema.forEach((field) => {
    const section = field.section || "default";
    if (!sections[section]) sections[section] = [];
    sections[section].push(field);
  });

  console.log("sections are", sections);

  return Object.entries(sections).map(([sectionName, fields], sectionIndex) => (
    <div key={sectionIndex} className="mb-2">
      {sectionName !== "default" && (
        <>
          <hr />
          <h6 className="text-muted mb-2">{sectionName}</h6>
        </>
      )}

      <Row>
        {fields.map((field) => {
          const {
            name,
            label,
            type = "text",
            required = false,
            options = [],
            placeholder = "",
            disabled = false,
            col = 12,
            icon,
            className="",
            defaultSelect=""
          } = field;

          console.log("defaultSelect:", defaultSelect)

          const commonProps = {
            name,
            value: formData[name] || "",
            onChange,
            placeholder,
            disabled,
            isInvalid: validated && (!!errors[name] || (required && !formData[name])),
          };

          return (
            <Col key={name} md={col} className={`mb-2 ${formFor}`}>
              <Form.Group>
                <Form.Label>
                  {icon && <i className={`me-1 ${icon}`}></i>}
                  {label}
                </Form.Label>
                {type === "select" ? (
                  <Form.Select {...commonProps} className={`${className}`}>
                    <option value="">Select</option>
                    {options&& options.map((opt) => (
                      <option key={opt.value} value={opt.value} >
                        {opt.label} 
                      </option>
                    ))}
                  </Form.Select>
                ) : type === "textarea" ? (
                  <Form.Control as="textarea" rows={3} {...commonProps} />
                ) : (
                  <Form.Control type={type} {...commonProps} />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[name] || field.errorMessage || `${label} is required`}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          );
        })}
      </Row>
    </div>
  ));
}
