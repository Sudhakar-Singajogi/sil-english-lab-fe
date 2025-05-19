// File: src/pages/system-admin/UserList.jsx
import React, { use, useEffect, useState } from "react";
// import ListGrid from "../Grid/ListGrid";
import AdvancedGrid from "../Grid/Advancedgrid";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../../store/userManagementSlice";
import { Pencil, ToggleOn, ToggleOff } from "react-bootstrap-icons";
import "./UserList.css";
import DrawerForm from "../../components/DrawerForm";
import { Button, Form, Offcanvas } from "react-bootstrap";

import userFormSchema from "../../schema/userFormSchema";
import Breadcrumb from "../../components/Breadcrumb";
import PaginationComponent from "../PaginationComponent";
import { getTotalPages } from "../../utils/helper";
import Loader from "../Loader";

const roleColors = {
  "system-admin": "danger",
  "super-admin": "warning",
  teacher: "info",
  student: "secondary",
};

const renderRole = (role) => (
  <span className={`badge bg-${roleColors[role] || "dark"}`}>{role}</span>
);

const renderStatus = (status) => (
  <span className={`badge bg-${status === "active" ? "success" : "secondary"}`}>
    {status}
  </span>
);

const UserList = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [editData, setEditData] = useState({});
  const role = useSelector((state) => state.auth.role);
  const schoolId = useSelector((state) => state.auth.schoolInfo.id);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, loading, error, resultTotal, totalRows, hasMore } =
    useSelector((state) => state.userManagement);
  const totalPages = getTotalPages(totalRows, perPage);
  console.log("users are:", users);

  useEffect(() => {
    dispatch(
      fetchUsers({ offset: (page - 1) * perPage, perPage: perPage, schoolId })
    );
  }, [dispatch, page, perPage, schoolId]);

  let pathprefix = "/admin";
  if (role === "super-admin") {
    pathprefix = "/school";
  }

  const columns = [
    { key: "fullName", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role", render: renderRole },
    {
      key: "status",
      title: "Status",
      render: renderStatus,
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, row) => (
        <div className="d-flex gap-2">
          <Pencil
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Edit ${row.fullName}`);
            }}
            size={18} // or 20
            className="text-primary me-2 cursor-pointer"
          />
          {row.status === "active" ? (
            <ToggleOn
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Deactivate ${row.fullName}`);
              }}
              size={22}
              className="text-success cursor-pointer"
            />
          ) : (
            <ToggleOff
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Activate ${row.fullName}`);
              }}
              size={22}
              className="text-muted cursor-pointer"
            />
          )}
        </div>
      ),
    },
  ];
  let userActionIcon = () =>
    editData ? (
      <i className="me-1 bi bi-pencil-fill"> Edit user</i>
    ) : (
      "Add User"
    );
  const breadcrumbs = [
    {
      label: "Dashboard",
      path: `${pathprefix}/dashboard`,
      icon: "bi bi-speedometer",
    },
    { label: "Manage Users", icon: "" }, // current page
  ];

  const handleSearch = () => {};
  const handleRoleFilter = () => {};
  const handleStatusFilter = () => {};

  // const visibleUsers = allUsers.slice((page-1)*perPage, page*perPage);

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <h3 className="component-header">Manage users</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid py-1 manage-user-section">
          {/* Filter section*/}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <Form className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Search by name/email"
                className="me-2"
                style={{ maxWidth: "250px" }}
                onChange={(e) => setSearchValue(e.target.value)} // add this state handler
              />
              <Button
                variant="outline-secondary"
                className="user-search-btn"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </Button>
            </Form>

            <div className="d-flex gap-2">
              <Form.Select
                onChange={(e) => handleRoleFilter(e.target.value)}
                size="sm"
              >
                <option value="">All Roles</option>
                <option value="system-admin">System Admin</option>
                <option value="super-admin">Super Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </Form.Select>
              <Form.Select
                onChange={(e) => handleStatusFilter(e.target.value)}
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
          </div>
          {/** End of filter section */}

          {/** user grid section */}
          {/* <ListGrid columns={columns} data={users} /> */}

          <AdvancedGrid
            columns={columns}
            data={users}
            enableSelection={true}
            enableBulkActions={true}
            selectedRows={selectedUsers}
            onSelectionChange={setSelectedUsers}
            bulkActions={[
              { label: "Delete", onClick: () => {} },
              { label: "Export", onClick: () => {} },
            ]}
            enableRowHighlight={true}
            enableActionDropdown={true}
            enableRowExpand={true}
            renderExpandedRow={(row) => (
              <div>
                <strong>Phone:</strong> {row.phone} <br />
                <strong>Created:</strong> {row.createdAt}
              </div>
            )}
          />
          {/** End of user grid section */}

          <div className="d-flex user-pagination">
            <PaginationComponent
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => setPage(page)}
              pageSize={perPage}
              onPageSizeChange={(size) => setPerPage(size)}
              showPerPageSelector={false}
              showGotoPageSize={false}
            />
          </div>
          <DrawerForm
            title={userActionIcon()}
            show={showDrawer}
            onClose={() => {
              setShowDrawer(false);
              setEditData({});
            }}
            onSubmit={(data) => {
              console.log("Submitted", data);
              setShowDrawer(false);
            }}
            formFields={userFormSchema}
            initialData={editData}
            formFor="manage-users-form"
          />
        </div>
      )}
    </>
  );
};

export default UserList;
