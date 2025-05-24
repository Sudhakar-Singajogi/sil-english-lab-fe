import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useACL from "../../CustomHooks/useACL";
import { fetchSchools } from "./Service";
import "./UserSearchOptions.css";
import { setAllSchools } from "../../store/authSlice";

function UserSearchOptions({
  role,
  onSearch,
  onAdd,
  onRoleChange,
  onStatusChange,
  onSchoolChange,
  schoolSelected,
  selectedRole,
  selectedStatus,
  setShowDrawer,
  onSearchByClass,
  onSearchBySection,
  selectedClass,
  selectedSection,
}) {
  const [schoolList, setSchoolList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const prevSchoolSelected = useRef("");
  const { featureAllowed } = useACL();
  const dispatch = useDispatch();
  const allSchools = useSelector((state) => state?.auth.allSchools);
  
  // prepare the list with all the classes till class-10

  const classList = [];
  for (let i = 1; i <= 10; i++) {
    classList.push({ label: `Class-${i}`, value: `${i}` });
  }

  // prepare the list of sections  till A, B, C

  const sectionsList = [
    { label: "Section-A", value: "A" },
    { label: "Section-B", value: "B" },
    { label: "Section-C", value: "C" },
  ];

  const loadOptions = async () => {
    if(allSchools === null) {
      const result = await fetchSchools();
      const schools = result.schools;
  
      const options = schools.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      setSchoolList(options);
  
      dispatch(setAllSchools(options));

    } else {
      setSchoolList(allSchools);
    }

  };

  useEffect(() => {
    if (prevSchoolSelected.current !== schoolSelected) {
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
            value={selectedClass || ""}
            onChange={(e) => onSearchByClass(e.target.value)}
            size="sm"
            // disabled={schoolList.length === 0} // disable until options load
          >
            <option value="">All Classes</option>
            {classList.map((cls) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            value={selectedSection || ""}
            onChange={(e) => onSearchBySection(e.target.value)}
            size="sm"
            // disabled={schoolList.length === 0} // disable until options load
          >
            <option value="">All Sections</option>
            {sectionsList.map((sec) => (
              <option key={sec.value} value={sec.value}>
                {sec.label}
              </option>
            ))}
          </Form.Select>

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
            onChange={(e) => onStatusChange(e.target.value)}
            size="sm"
            value={selectedStatus || ""}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </div>
        {featureAllowed("add-user") && (
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="primary"
              className="btn-sm show-500-after"
              onClick={() => setShowDrawer(true)}
            >
              <i className="bi bi-plus-circle"></i> Add User
            </Button>

            <Button
              variant="primary"
              className="btn-xs show-500-before"
              onClick={() => setShowDrawer(true)}
            >
              <i className="bi bi-plus-circle"></i> Add User
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserSearchOptions;
