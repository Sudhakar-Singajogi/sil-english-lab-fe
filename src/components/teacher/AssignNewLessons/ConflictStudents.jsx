import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { fetchUserByClass } from "../../manage-users/Service";
import ConfirmDialog from "../../alerts/ConfirmDialog";
import "./ConflictStudents.css"; // Optional styling
import Loader from "../../Loader";
import { capitalize } from "../../../utils/helper";
function ConflictStudents({
  conflictStudents,
  handleClosePopup,
  onExclude,
  footerClass,
  chapterStye = null,
}) {
  const conflictStudent = conflictStudents[0];

  console.log('conflictStudent:', conflictStudent)
  const [users, setUsers] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const [exclude, setExlude] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const [conflictedStudents, setConflictedStudents] = useState(); // to loop via

  useEffect(() => {
    const payload = {
      offset: 0,
      perPage: 100,
      schoolId: conflictStudent.schoolId,
      role: role,
      searchByClass: conflictStudent.classId,
      searchBySection: conflictStudent.section,
    };

    const callAPI = async () => {
      const cacheBrust = false;
      const resp = await fetchUserByClass(payload, cacheBrust);
      console.log("user reponse is:", resp);

      setUsers(resp.users);
    };
    callAPI();

    setConflictedStudents(conflictStudent.studentIds);
  }, []);
  const handleExcludeStudent = (std) => {
    setExlude((prev) => [...prev, std]);
  };

  const handleExcludeAll = () => {
    setExlude(conflictedStudents);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  };

  const handleProceed = () => {
    setExlude(conflictedStudents);
    
    setConfirmMsg(
       "Are you sure you want to exclude all students?"
     );
     setShowConfirm(true); 
     
  };

  const handleConfirmYes = () => {
    console.log("conflictStudent:", exclude);
    onExclude(conflictedStudents, conflictStudent.lessonId);

    setShowConfirm(false);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
      handleClosePopup();
    }, 1000);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
    setExlude([]);
  };

  const studentsMap = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      map[user.id] = { name: user.fullName, rollNumber: user.rollNumber };
    });
    return map;
  }, [users]);

  const resolveStudentInfo = (id) => {
    const student = studentsMap[id];
    return student
      ? { ...student, name: capitalize(student.name) }
      : { name: "Unknown", rollNumber: null };
  };

  return (
    <div className="conflict-list-wrapper">
      {showLoader && <Loader />}
      <p>
        <strong>Heads up!</strong> The following students already have this
        lesson assigned. You may exclude them if needed.
      </p>

      {conflictStudents.map((item, idx) => (
        <div className="conflict-card" key={idx}>
          <div className="conflict-header">
            <h6 className="lesson-title text-primary">{item.lessonTitle}</h6>

            {chapterStye ? (
              <>
                <small>
                  Chapter: <strong>{item.chapterTitle}</strong>
                </small>
                <p>
                  <small>
                    <strong>Class - {item.classId}</strong> | Section:{" "}
                    <strong>{item.section}</strong>
                  </small>
                </p>
              </>
            ) : (
              <>
                <small>
                  Chapter: <strong>{item.chapterTitle}</strong> | Class:{" "}
                  <strong>Class - {item.classId}</strong> | Section:{" "}
                  <strong>{item.section}</strong>
                </small>
              </>
            )}
          </div>

          <div className="student-chip-list mt-2">
            {(conflictedStudents || []).map((student, sidx) => (
              <span className="student-chip" key={sidx}>
                {resolveStudentInfo(student).name} ({student.rollNumber})
                <i
                  className="bi bi-check-circle-fill ms-2 text-success"
                  title="Exclude"
                  //   onClick={() => handleExcludeStudent(student.id)}
                ></i>
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className={`${footerClass} mt-0 text-end`}>
        {/* <Button variant="outline-danger" onClick={handleExcludeAll}>
          Exclude All
        </Button>{" "} */}
        <Button variant="outline-danger" onClick={handleExcludeAll}>
          Cancel
        </Button>{" "}
        <Button variant="primary" onClick={handleProceed}>
          Exclude All & Proceed
        </Button>
      </div>
      <ConfirmDialog
        show={showConfirm}
        message={confirmMsg}
        onConfirm={handleConfirmYes}
        onCancel={handleConfirmNo}
      />
    </div>
  );
}

export default ConflictStudents;
