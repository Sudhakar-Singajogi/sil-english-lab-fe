import React, { useRef, useCallback, useEffect, useState } from "react";
import "../../pages/teacher/AssignStudents.css";
import AdvancedGrid from "../Grid/Advancedgrid";
import { getStudentsColumns } from "../../components/GridColumns/assignStudents";
import { useSelector, useDispatch } from "react-redux";
import { setAllSchools } from "../../store/authSlice";
import {
  fetchUserByClassSection,
  assignTeacherToClassSec,
  updateUser,
  fetchSchools,
} from "./Service";
import ConfirmDialog from "../alerts/ConfirmDialog";
import AlertDialog from "../alerts/AlertDialog";
import Loader from "../Loader";
import { Alert } from "react-bootstrap";
import DrawerForm from "../DrawerForm";
import { toast } from "react-toastify";
import userFormSchema from "../../schema/userFormSchema";

const AssignTeacherToClass = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [schoolList, setSchoolList] = useState([]);
  const prevSchoolSelected = useRef("");
  const [classNum, setClassNum] = useState("");
  const [section, setSection] = useState("");
  const { userId: teacherId } = useSelector((state) => state.auth.user);
  const schoolInfo = useSelector((state) => state.auth.schoolInfo);
  const [schoolId, setSchoolId] = useState(
    role === "super-admin" || role === "teacher" ? schoolInfo.id : null
  );
  const allSchools = useSelector((state) => state.auth.allSchools);
  const { allTeachers: schoolTeachers } = useSelector((state) => state.auth);
  const [teacherList, setTeacherList] = useState(null);

  const [selectedTeacher, setSelectedTeacher] = useState(
    role === "teacher" ? teacherId : null
  );
  const [teacherName, setTeacherName] = useState("");
  const [students, setStudents] = useState([]);
  const [assignedTeacher, setAssignedTeacher] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertvariant, setAlertVariant] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [editData, setEditData] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const loadOptions = useCallback(async () => {
    if (allSchools === null && role !== "teacher") {
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
  }, [dispatch, allSchools]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const handleEdit = (row) => {
    console.log("row is", row);
    setEditData(row);
    setShowDrawer(true);
  };

  //   const students = [{}]; //["Amit Kumar", "Sruthi S", "Student7", "Student8"];
  const columns = getStudentsColumns(handleEdit, "");

  const prepareTeacherssSelectList = useCallback(() => {
    let list = [];
    schoolTeachers.forEach((teacher) => {
      list.push({
        label: teacher.fullName,
        value: teacher.documentId,
      });
    });

    setTeacherList(list);
  }, [schoolTeachers]);

  useEffect(() => {
    if (teacherList === null) {
      setSubmitError("");
      prepareTeacherssSelectList();
    }
  }, [prepareTeacherssSelectList, teacherList]);

  useEffect(() => {
    const getUserByclsSec = async (classNum, section) => {
      let schId = schoolInfo?.id;
      if (role === "system-admin") {
        schId = schoolId;
      }
      const res = await fetchUserByClassSection(classNum, section, schId);

      if (res.users.length > 0) {
        setStudents(res.users);
        setAssignedTeacher(res.assignedTeacher);
        setSelectedTeacher(res.assignedTeacher.teacherId);
        console.log("res.assignedTeacher is", res.assignedTeacher);

        if (res.assignedTeacher?.teacherId) {
          const teacher_name = teacherList.find(
            (teacher) => teacher.value === res.assignedTeacher.teacherId
          ).label;
          setTeacherName(teacher_name.toUpperCase());
        } else {
          setSelectedTeacher("");
          setTeacherName("");
        }
      } else {
        if (res.assignedTeacher?.teacherId) {
          const teacher_name = teacherList.find(
            (teacher) => teacher.value === res.assignedTeacher.teacherId
          ).label;
          setTeacherName(teacher_name.toUpperCase());
        } else {
          setSelectedTeacher("");
          setTeacherName("");
          setAssignedTeacher(res.assignedTeacher);
        }
        setStudents([]);
      }
    };

    if (classNum && section && role !== "system-admin") {
      setAlertMsg("");
      setAlertVariant("");
      setShowAlert(false);
      getUserByclsSec(classNum, section);
    } else {
      if (classNum && section && role === "system-admin") {
        setAlertMsg(() => "");
        if (schoolId === "") {
          console.log("till here");
          setShowAlert(true);
          setAlertMsg("Please select school");
          setAlertVariant("danger");
        } else {
          setAlertMsg("");
          setAlertVariant("");
          setShowAlert(false);
          getUserByclsSec(classNum, section);
        }
      }
    }
  }, [classNum, section, schoolId]);

  useEffect(() => {
    console.log("ShowAlert:", showAlert);
  }, [showAlert]);

  const handleClassChange = (value) => {
    setClassNum(value);
    setAlertMsg("");
    setShowAlert(false);
  };

  const handleSectionChange = (value) => {
    setSection(value);
    setShowAlert(false);
    setAlertMsg("");
  };

  const handleAssignTeacher = (value) => {
    if (assignedTeacher.teacherId == value) {
      setAlertMsg("Already same teacher assigned to this class");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    if (classNum && section) {
      setConfirmMsg("Are you sure you want to assign teacher to this class?");
      setShowConfirm(true);
      setSelectedTeacher(value);
    } else {
      setAlertVariant("danger");
      setAlertMsg("Please select class and section");
      setAlertTitle("Select Class and Section");
      // setShowAlert(true);
    }
  };

  const changeAssignedteacher = async () => {
    const payload = {
      schoolId: "",
      teacherId: "",
      class: "",
      section: "",
    };

    if (role === "super-admin") {
      payload.schoolId = schoolInfo.id;
    }
    payload.teacherId = selectedTeacher;
    payload.class = parseInt(classNum);
    payload.section = section;
    setShowConfirm(false);
    setLoading(true);

    const resp = await assignTeacherToClassSec(payload);
    setLoading(false);
    if (resp.success) {
      const teacher_name = teacherList.find(
        (teacher) => teacher.value === selectedTeacher
      ).label;

      setTeacherName(teacher_name.toUpperCase());

      await callFetchusers();

      setAlertMsg("Teacher assigned successfully");
      setAlertVariant("success");
      setShowAlert(true);
    } else {
      setAlertMsg(resp.message);
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  let userActionIcon = () =>
    editData.fullName ? (
      <>
        <i className="me-1 bi bi-pencil-fill add-edit-title-icon"></i> Edit user
      </>
    ) : (
      <>
        <i className="me-1 bi bi-person-add add-edit-title-icon"></i> Add user
      </>
    );

  const callFetchusers = async () => {
    const res = await fetchUserByClassSection(classNum, section, false);

    if (res.users.length > 0) {
      setAssignedTeacher(res.assignedTeacher);
      setSelectedTeacher(res.assignedTeacher.teacherId);
      setStudents(res.users);
    }
  };

  const submitUser = async (data, addEdit) => {
    console.log("data is", data);
    const { email, fullName, phone, section, status } = data;
    const selectedRole = data.role;
    const whichClass = data.class;
    const school = data.school || null;

    const submittedData = {
      email,
      fullName,
      phone,
      role: selectedRole,
      section,
      status,
      whichClass,
    };

    if (selectedRole !== "student") {
      delete submittedData.whichClass;
      delete submittedData.section;
    }

    if (role === "system-admin" && addEdit === "add") {
      submittedData.schoolId = school;
    }

    if (editData?.schoolId && addEdit === "edit") {
      await addEdituser(editData, addEdit, submittedData);
    } else {
      //trying to create a system-admin
      await addEdituser(editData, addEdit, submittedData);
    }
  };

  const addEdituser = async (editData, addEdit, submittedData) => {
    const userDocumentId = editData?.documentId;
    let resp = null;
    if (addEdit === "edit") {
      resp = await updateUser(userDocumentId, submittedData);
    }
    if (resp.status === 200 || resp.status === 201 || resp.success) {
      // setFormSubmissionSuccess(true);
      toast.success(
        addEdit === "edit"
          ? "User updated successfully"
          : "User added successfully"
      );
      await callFetchusers();
      setShowDrawer(false);
      setEditData({});
    }
  };

  const fetchUserDetails = (record) => {
    const fetchedRecord = { ...record };
    fetchedRecord.class = fetchedRecord.whichClass;
    setEditData(fetchedRecord);
    setShowDrawer(true);
  };

  return (
    <div className="assign-container">
      {loading && <Loader />}
      <div className="filters">
        {role === "system-admin" && (
          <>
            <div>
              <select
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
              >
                <option value="">Select School</option>
                {/* <option>Grand Oak Public School</option> */}
                {allSchools &&
                  allSchools.length > 0 &&
                  allSchools.map((school) => (
                    <option key={school.value} value={school.value}>
                      {school.label}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}
        <div>
          <select
            value={classNum}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">Class</option>
            {[...Array(10).keys()].map((i) => (
              <option value={i + 1} key={i + 1}>
                Class-{i + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={section}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="">Section</option>
            <option value="A">Section-A</option>
            <option value="B">Section-B</option>
            <option value="C">Section-C</option>
          </select>
        </div>
      </div>
      {alertMsg && (
        <Alert
          className="alert-box"
          variant={alertvariant}
          onClose={() => setShowAlert(() => false)}
          dismissible
        >
          <Alert.Heading>{alertMsg}</Alert.Heading>
        </Alert>
      )}

      <div className="assigned-info">
        <div className="assigned-teacher">
          <div>
            <div className="avatar">
              <div>
                <img
                  src="/assets/icons/teacher-female.svg"
                  className="assign-student-avatar teacher-avatar"
                />
              </div>
            </div>
            <div className="student-count">
              
              {selectedTeacher && (
                <>
                  {" "}
                  <p>Total Classes: {students.length}{" "} </p> 
                </>
              )}
              {selectedTeacher && (
                <>
                  {" "}
                  <p>Total Students: {students.length}{" "} </p> 
                </>
              )}
            </div>
          </div>
        </div>
        {role !== "teacher" && (
          <div>
            <div className="std-cnt">
              <div className="assigned-label">Assigned Teacher:{teacherName} </div>
              {/* <div className="teacher-name">{teacherName}</div> */}
            </div>
            <button className="btn change-btn">
              <select
                value={role === "system-admin" ? selectedTeacher : ""}
                onChange={(e) => handleAssignTeacher(e.target.value)}
              >
                <option value="">Change Assignment</option>
                {teacherList &&
                  teacherList.map((teacher) => (
                    <option key={teacher.value} value={teacher.value}>
                      {teacher.label}
                    </option>
                  ))}
              </select>
            </button>
          </div>
        )}
      </div>
      <div className="assign-inline assigned-students">
        <AdvancedGrid
          columns={columns}
          data={students}
          enableSelection={false}
          enableBulkActions={false}
          selectedRows={0}
          onSelectionChange={() => {}}
          bulkActions={[
            { label: "Delete", onClick: () => {} },
            { label: "Export", onClick: () => {} },
          ]}
          enableRowHighlight={true}
          enableActionDropdown={
            role === "teacher" ? teacherId == selectedTeacher : true
          }
          enableRowExpand={true}
          renderExpandedRow={(row) => <></>}
          modalOpenFn={(record) => fetchUserDetails(record)}
        />
      </div>

      <ConfirmDialog
        show={showConfirm}
        message={confirmMsg}
        onConfirm={changeAssignedteacher}
        onCancel={() => setShowConfirm(false)}
      />
      <DrawerForm
        title={userActionIcon()}
        show={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setEditData({});
        }}
        onSubmit={(data, addEdit) => {
          // console.log("Submitted", data);
          submitUser(data, addEdit);
        }}
        formFields={userFormSchema}
        initialData={editData}
        formFor="manage-users-form"
        addEdit={editData?.fullName ? "edit" : "add"}
        initErrors={submitError}
      />
    </div>
  );
};

export default AssignTeacherToClass;
