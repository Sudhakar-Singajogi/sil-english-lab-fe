import React, { useEffect, useState } from "react";
import AdvancedGrid from "../Grid/Advancedgrid";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../../store/userManagementSlice";
import "./UserList.css";
import DrawerForm from "../../components/DrawerForm";
import { fetchUserByEmail } from "./Service";
import userFormSchema from "../../schema/userFormSchema";
import Breadcrumb from "../../components/Breadcrumb";
import PaginationComponent from "../PaginationComponent";
import { getTotalPages } from "../../utils/helper";
import Loader from "../Loader";
import UserSearchOptions from "./UserSearchOptions";
import useACL from "../../CustomHooks/useACL";
import { getUserColumns } from "../GridColumns/userColumns";

const UserList = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [editData, setEditData] = useState({});
  const role = useSelector((state) => state.auth.role);
  const { featureAllowed } = useACL();

  let schoolId = null;
  if (role !== "system-admin") {
    schoolId = useSelector((state) => state.auth.schoolInfo.id);
  }
  const [searchByEmail, setSearchByEmail] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, loading, totalRows } = useSelector(
    (state) => state.userManagement
  );
  const [schoolUsers, setSchoolUsers] = useState(users);
  const [totalPages, setTotalPages] = useState(
    getTotalPages(totalRows, perPage)
  );
  const [SchId, setSchId] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(
    schoolId ? schoolId : SchId
  );
  const [roleFilter, setRoleFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    dispatch(
      fetchUsers({
        offset: (page - 1) * perPage,
        perPage: perPage,
        schoolId: selectedSchool,
        role: roleFilter,
        status: statusFilter,
      })
    );
  }, [
    dispatch,
    page,
    perPage,
    schoolId,
    selectedSchool,
    roleFilter,
    statusFilter,
  ]);
  useEffect(() => {
    setTotalPages(getTotalPages(totalRows, perPage));
  }, [totalRows, perPage]);

  useEffect(() => {
    const getAUser = async (searchByEmail) => {
      const fetchedUser = await fetchUserByEmail(searchByEmail);

      setSchoolUsers(() => fetchedUser.users);
      setPage(1);
      setTotalPages(1);
    };
    if (searchByEmail !== null && searchByEmail !== "") {
      {
        getAUser(searchByEmail);
      }
    }
  }, [dispatch, searchByEmail]);

  let pathprefix = "/admin";
  if (role === "super-admin") {
    pathprefix = "/school";
  }
  const handleEdit = (row) => {
    setEditData(row);
    setShowDrawer(true);
  };

  const handleToggleStatus = (row, activate) => {
    console.log(`${activate ? "Activate" : "Deactivate"} user`, row);
    // TODO: Dispatch action here
  };

  const columns = getUserColumns(
    handleEdit,
    handleToggleStatus,
    featureAllowed
  );

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

  const handleSelectedSchool = (schoolId) => {
    setSchId(schoolId);
    setSelectedSchool(schoolId);
  };

  const getSchoolSelected = () => {
    return schoolId ? schoolId : SchId;
  };

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <h3 className="component-header">Manage users</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid py-1 manage-user-section">
          {/* Filter section*/}
          <UserSearchOptions
            role={role}
            onSearch={(query) => setSearchByEmail(query)}
            onAdd={() => setShowDrawer(true)}
            onRoleChange={(val) => setRoleFilter(val)}
            onStatusChange={(val) => setStatusFilter(val)}
            onSchoolChange={(selectedValue) =>
              handleSelectedSchool(selectedValue || null)
            }
            setShowDrawer={setShowDrawer}
            schoolSelected={getSchoolSelected()}
            selectedRole={roleFilter}
            selectedStatus={statusFilter}
          />

          <AdvancedGrid
            columns={columns}
            data={searchByEmail ? schoolUsers : users}
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
