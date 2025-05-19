// File: src/pages/system-admin/UserList.jsx
import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { fetchSchools } from "./Service";
import "./UserSearchOptions.css";

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "32px",
    fontSize: "0.875rem",
    borderColor: "#ced4da",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

function UserSearchOptions({
  role,
  onSearch,
  onAdd,
  onRoleChange,
  onStatusChange,
  onSchoolChange,
  schoolSelected,
  selectedRole
}) {
    
  const [schoolList, setSchoolList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    const prevSchoolSelected = useRef('');


  console.log("schoolSelected:", schoolSelected);

  const loadOptions = async (inputValue) => {
    const result = await fetchSchools();
    const schools = result.schools;

    const options = schools.map((role) => ({
      label: role.name,
      value: role.id,
    }));
    setSchoolList(options);
  };

  useEffect(() => {
    if(prevSchoolSelected.current !== schoolSelected) {
        loadOptions();
    }
    prevSchoolSelected.current = schoolSelected;
  }, [schoolSelected]);

  const handleSelectedSchool = (schoolId) => {
    onSchoolChange(schoolId);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by name/email"
            className="me-2"
            style={{ maxWidth: "250px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />
          <Button
            variant="outline-secondary"
            className="user-search-btn"
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
          </Button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2 school-dropdown">
          {role === "system-admin" && (
            <>
              <Form.Select
                value={schoolSelected || ""}
                onChange={(e) => handleSelectedSchool(e.target.value)}
                size="sm"
                disabled={schoolList.length === 0} // disable until options load
              >
                <option value="">All Schools</option>
                {schoolList.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
                ))}
              </Form.Select>
            </>
          )}

          <Form.Select
            onChange={(e) => onRoleChange(e.target.value)}
            size="sm"
            value={selectedRole || ""}
          >
            <option value="">All Roles</option>
            <option value="system-admin">System Admin</option>
            <option value="super-admin">Super Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </Form.Select>
          <Form.Select
            // onChange={(e) => handleStatusFilter(e.target.value)}
            size="sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="primary"
            className="btn-sm show-500-after"
            // onClick={() => setShowDrawer(true)}
          >
            <i className="bi bi-plus-circle"></i> Add User
          </Button>

          <Button
            variant="primary"
            className="btn-xs show-500-before"
            // onClick={() => setShowDrawer(true)}
          >
            <i className="bi bi-plus-circle"></i> Add User
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserSearchOptions;
