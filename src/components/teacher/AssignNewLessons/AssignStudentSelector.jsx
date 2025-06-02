import React from "react";
import SILDrawer from "../../SILDrawer";
import useSILDrawer from "../../hooks/useSILDrawer";
import { Button, Form } from "react-bootstrap";

const AssignStudentSelector = ({
  onSectionChange,
  onStudentsSelect,
  onAllStudentsSelect,
}) => {
  const { show, open, close } = useSILDrawer();
  const stdArr = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      <label className="form-label">Assign Students</label>
      <Button
        className="btn btn-warning btn-md"
        variant="button"
        onClick={open}
      >
        Click here
      </Button>

      <SILDrawer show={show} onClose={close} title="Assign Students">
        {/* Scrollable Content Area */}
        <div className="drawer-scrollable-content assign-student-lessons">
          <Form.Group controlId="selectSection" className="mb-3">
            <Form.Label>Select Section</Form.Label>
            <Form.Select onChange={onSectionChange} className="w-100">
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="selectStudents">
            <Form.Label>Select Students</Form.Label>
            <div className="student-table-wrapper">
              <table className="table table-bordered table-sm recently-assigned-grid">
                <thead className="table-light sticky-header">
                  <tr>
                    <th>
                      <Form.Check
                        key="selectAll"
                        type="checkbox"
                        value="all"
                        onChange={(e) =>
                          onAllStudentsSelect(e.target.value, e.target.checked)
                        }
                      />
                    </th>
                    <th>Section</th>
                    <th>Class</th>
                    <th>Student Name</th>
                  </tr>
                </thead>
                <tbody>
                  {stdArr.map((id) => (
                    <tr key={id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          value={id}
                          onChange={(e) =>
                            onStudentsSelect(e.target.value, e.target.checked)
                          }
                        />
                      </td>
                      <td>A</td>
                      <td>Class 1</td>
                      <td>Student {id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Form.Group>
        </div>

        {/* Fixed Footer */}
        <div className="drawer-footer">
          <Button variant="primary" onClick={close}>
            Done
          </Button>
        </div>
      </SILDrawer>
    </>
  );
};

export default AssignStudentSelector;
