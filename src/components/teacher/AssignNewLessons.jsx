import React, { useState } from "react";
import "./AssignNewLessons.css";

const AssignNewLessons = () => {
  const [level, setLevel] = useState("");
  const [chapter, setChapter] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [assignTo, setAssignTo] = useState("class");
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");

  const lessons = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4"];

  const handleLessonChange = (lesson) => {
    setSelectedLessons((prev) =>
      prev.includes(lesson)
        ? prev.filter((l) => l !== lesson)
        : [...prev, lesson]
    );
  };

  const handleAssign = () => {
    const payload = {
      level,
      chapter,
      dueDate,
      selectedLessons,
      assignTo,
      classValue,
      sectionValue,
    };
    console.log("Assignment Data:", payload);
    // TODO: Dispatch Redux action or API call
  };

  return (
    <div className="assign-lessons-container">
      <h5 className="mb-4">Assign New Lessons</h5>

      <div className="mb-3 filters">
        <div className="col-md-2">
          <label className="form-label">Level</label>
          <select
            className="form-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Chapter</label>
          <select
            className="form-select"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          >
            <option value="">Select Chapter</option>
            <option>Chapter 1</option>
            <option>Chapter 2</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Assign To</label>
          <select
            className="form-select"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          >
            <option value="">AssignTo</option>
            <option>Class</option>
            <option>Student</option>
          </select>
        </div>
        <div className="col-md-2 mt-4">
          {/* <label className="form-label">Action</label> */}
          <button className="btn btn-primary mt-2" onClick={handleAssign}>
            Assign
          </button>
        </div>
      </div>

      <div className="lesson-grid mb-4">
        <div className="table-responsive">
          <table className="table table-bordered table-sm recently-assigned-grid">
            <thead className="table-light">
              <tr>
                <th>Lesson Name</th>
                <th>Chapter</th>
                <th>Assigned On</th>
                <th>Status</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Greeting Words</td>
                <td>Chapter 1</td>
                <td>12 May</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Greeting Words</td>
                <td>Chapter 1</td>
                <td>12 May</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Greeting Words</td>
                <td>Chapter 1</td>
                <td>12 May</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Greeting Words</td>
                <td>Chapter 1</td>
                <td>12 May</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Greeting Words</td>
                <td>Chapter 1</td>
                <td>12 May</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>

              {/* Map more rows */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignNewLessons;
