import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SILDrawer from "../../SILDrawer";
import useSILDrawer from "../../hooks/useSILDrawer";
import { Button, Form } from "react-bootstrap";
import {
  fetchUserByClassSection,
  fetchUserByClass,
} from "../../manage-users/Service";

const AssignStudentSelector = ({
  selectedClass,
  onSectionChange,
  onStudentsSelect,
  onAllStudentsSelect,
}) => {
  const dispatch = useDispatch();
  const { show, open, close } = useSILDrawer();
  const stdArr = Array.from({ length: 100 }, (_, i) => i + 1);
  const [searchBySection, setSearchBySection] = useState(null);
  const role = useSelector((state) => state.auth.role);
  const { id: schoolId } = useSelector((state) => state.auth.schoolInfo);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllUserIndicator, setSelectAllUserIndicator] = useState(false);
  const [formSubmissionSuccess, setFormSubmissionSuccess] = useState(false);

  console.log("selectedClass is:", selectedClass);
  console.log("selectedUsers is:", selectedUsers);

  useEffect(() => {
    if (selectedClass && searchBySection) {
      const payload = {
        offset: 0,
        perPage: 100,
        schoolId: schoolId,
        role: role,
        searchByClass: selectedClass,
        searchBySection: searchBySection,
      };

      console.log("formSubmissionSuccess", formSubmissionSuccess);
      if (formSubmissionSuccess) {
        payload.cacheBrust = true;
        setFormSubmissionSuccess(false);
      }
      const callAPI = async () => {
        const cacheBrust = false;
        const resp = await fetchUserByClass(payload, cacheBrust);
        console.log("user reponse is:", resp);

        setUsers(resp.users);
      };
      callAPI();
    }
  }, [
    dispatch,
    searchBySection,
    formSubmissionSuccess,
    selectedClass,
    role,
    schoolId,
  ]);

  const handleSectionChange = (sectionSelected) => {
    setSearchBySection(sectionSelected);
    setSelectedUsers([]);
    onSectionChange(sectionSelected);
  };

  const handleClose = () => {
    setUsers([]);
    setSearchBySection(null);
    setSelectedUsers([]);
    setSelectAllUserIndicator(false);
    close();
  };

  const handleSelectAll = (isChecked) => {
    //from the users array extract userid and poupulates the array and assign that array to setSelectedUsers state variable
    const userIds = users.map((user) => user.id);
    if (isChecked) {
      setSelectAllUserIndicator(true);
      setSelectedUsers(userIds);
    } else {
      setSelectedUsers([]);
      setSelectAllUserIndicator(false);
    }
  };

  const handleSelectUser = (userid, isChecked) => {
    //if uncheked remove the userid from the array
    if (!isChecked) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userid));
      setSelectAllUserIndicator(false);
      return;
    } else {
      //if checked add the userid to the array
      setSelectedUsers([...selectedUsers, userid]);
      return;
    }
  };

  const handleOnSubmit = () => {
    console.log("selectedUsers:", selectedUsers);
    onStudentsSelect(selectedUsers);
    setTimeout(() => {
      handleClose();
    }, 500);
  };

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

      <SILDrawer show={show} onClose={handleClose} title="Assign Students">
        {/* Scrollable Content Area */}
        <div className="drawer-scrollable-content assign-student-lessons">
          <Form.Group controlId="selectSection" className="mb-3">
            <Form.Select className="w-100" disabled={true}>
              <option value="">Selected Class {selectedClass}</option>
            </Form.Select>

            {/* <Form.Label>Select Section</Form.Label> */}
            <Form.Select
              onChange={(e) =>
                handleSectionChange(e.target.value, e.target.checked)
              }
              className="w-100 mt-3"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="selectStudents">
            <Form.Label>Select Students</Form.Label>
            <div className="student-table-wrapper">
              <table className="table table-bordered table-sm recently-assigned-grid">
                <thead className="table-light sticky-header">
                  <tr>
                    <th>
                      {users.length > 0 && (
                        <Form.Check
                          key="selectAll"
                          type="checkbox"
                          value="all"
                          checked={selectAllUserIndicator}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      )}
                    </th>
                    <th>Section</th>
                    <th>Class</th>
                    <th>Student Name</th>
                    {/* <th>Student Email</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No students found
                      </td>
                    </tr>
                  )}
                  {users.map((user) => (
                    <tr key={`assign-user-${user.id}`}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          value={user.id}
                          checked={selectedUsers.some((uid) => uid === user.id)}
                          onChange={(e) =>
                            handleSelectUser(e.target.value, e.target.checked)
                          }
                        />
                      </td>
                      <td>{searchBySection}</td>
                      <td>Class {selectedClass}</td>
                      <td>{user.fullName}</td>
                      {/* <td>{user.email}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Form.Group>
        </div>

        {/* Fixed Footer */}
        <div className="drawer-footer">
          <Button variant="primary" onClick={handleOnSubmit}>
            Done
          </Button>
        </div>
      </SILDrawer>
    </>
  );
};

export default AssignStudentSelector;
