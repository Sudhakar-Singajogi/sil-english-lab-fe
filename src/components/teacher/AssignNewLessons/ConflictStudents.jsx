import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { fetchUserByClass } from "../../manage-users/Service";
import "./ConflictStudents.css"; // Optional styling
function ConflictStudents({
  conflictStudents,
  handleClosePopup,
  onExclude,
  footerClass,
  chapterStye = null,
}) {
    const [users, setUsers] = useState([]);
  useEffect(() => {

    const payload = {
        offset: 0,
        perPage: 100,
        schoolId: schoolId,
        role: role,
        searchByClass: selectedClass,
        searchBySection: searchBySection,
      };

      
    const callAPI = async () => {
      const cacheBrust = false;
      const resp = await fetchUserByClass(payload, cacheBrust);
      console.log("user reponse is:", resp);

      setUsers(resp.users);
    };
    callAPI();
  }, []);
  const handleExcludeStudent = (std) => {
    //
  };

  const handleExcludeAll = () => {
    //
  };

  return (
    <div className="conflict-list-wrapper">
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
            {(item.studentId || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(
              (student, sidx) => (
                <span className="student-chip" key={sidx}>
                  {student.name} ({student.rollNumber})
                  <i
                    className="bi bi-x-circle-fill ms-2 text-danger"
                    title="Exclude"
                    onClick={() => onExclude(student, item.lessonId)}
                  ></i>
                </span>
              )
            )}
          </div>
        </div>
      ))}
      <div className={`${footerClass} mt-0 text-end`}>
        <Button variant="outline-danger" onClick={handleExcludeAll}>
          Exclude All
        </Button>{" "}
        <Button variant="primary" onClick={handleClosePopup}>
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default ConflictStudents;
