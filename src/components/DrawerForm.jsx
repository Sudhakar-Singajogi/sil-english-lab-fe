// File: src/components/DrawerForm.jsx
import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { renderFieldsFromSchema } from "../utils/renderFieldsFromSchema";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { add } from "lodash";

const DrawerForm = ({
  title,
  show,
  onClose,
  onSubmit,
  formFields,
  initialData = {},
  submitLabel = "Save",
  formFor = "genric-form",
  addEdit = null,
  submitError = {},
}) => {
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const allSchools = useSelector((state) => state.auth.allSchools);

  useEffect(() => {
    console.log("addEdit", addEdit);
    if (role !== "system-admin" && formFor === "manage-users-form") {
      delete formFields[5];
      formFields[4].col = 12;
    } else if (
      role === "system-admin" &&
      formFor === "manage-users-form" && (addEdit === "edit" || addEdit === "add")      
    ) {
      if(formFields[5]) {
        formFields[5].options = allSchools;
        formFields[5].disabled = true;
      }
    } 
  }, [addEdit]);

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

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };
      const errs = {};
      errs[name] = "";
      setErrors(errs);

      // Reset class & section if role changes from 'student' to any other
      if (
        formFor === "manage-users-form" &&
        name === "role" &&
        prev.role === "student" &&
        value !== "student"
      ) {
        updated.class = "";
        updated.section = "";
        let existingErrs = { ...errors };
        delete existingErrs["class"];
        delete existingErrs["section"];
        setErrors(existingErrs);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setLoading(true);
    console.log("formData:", formData);
    console.log("initialData", initialData);

    if (formFor === "manage-users-form") {
      // Custom validation: For "student", check class & section
      if (formData.role === "student") {
        if (!formData.class) {
          newErrors["class"] = "Class is required for student.";
        }
        if (!formData.section) {
          newErrors["section"] = "Section is required for student.";
        }
      }

      if (role === "system-admin") {
        if (!formData.school && addEdit === "add") {
          newErrors["school"] = "Please select a school.";
        }
      }
    }
console.log('formData:', formData);
    for (const field of formFields) {

      const val = formData[field?.name];
      if (field?.required && !val) {
        newErrors[field.name] =
          field.errorMessage || `${field.label} is required`;
      } else if (field?.asyncValidate) {
        try {
          if (formFor == "manage-users-form") {
            //check for the email field
            if (field.name == "email") {
              await field.asyncValidate(val, initialData.email);
            }
          } else {
            await field.asyncValidate(val);
          }
        } catch (err) {
          newErrors[field.name] = err.message;
        }
      }
    }

    setErrors(newErrors);
    setValidated(true);
    setLoading(false);

    if (Object.keys(newErrors).length === 0) {
      if (formFor === "manage-users-form") {
        //check whether email already exists or not
        console.log('formData:', formData);
        console.log("no validation errors now");
        onSubmit(formData, addEdit);
      }

      // onSubmit(formData);
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
        {loading && <Loader />}
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
