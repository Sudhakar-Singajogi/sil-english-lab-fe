import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import AssignStudentSelector from "./AssignStudentSelector";

function AssignNewLessonsFilters({
  level,
  setLevel,
  chapter,
  setChapter,
  setChapterName,
  levelChapters,
  handleAssign,
  isAssingLessonSuccessfull,
  setStartDate,
  setAssignedTo,
  setSelectedClass,
  setSelectedSection,
  selectedSection,
  setValidationErrMsg,
}) {
  const [enableAssignBtn, setEnableAssignBtn] = useState(false);
  const [hideSection, setHideSection] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    level: "",
    chapter: "",
    startDate: "",
    dueDate: "",
    assignedTo: "",
    selectedClass: "",
    selectedSection: "",
  });

  useEffect(() => {
    const { level, chapter, startDate, dueDate, assignedTo, selectedClass } =
      selectedFilters;

    // Reset validation state initially
    setValidationErrMsg("");

    // Check if all required fields are present
    const isAllFieldsSelected =
      level && chapter && startDate && dueDate && assignedTo && selectedClass;

    // If both dates exist, check validity
    if (startDate && dueDate) {
      const start = new Date(startDate);
      const due = new Date(dueDate);

      if (due <= start) {
        setValidationErrMsg("Due date should be greater than start date");
        setEnableAssignBtn(false);
        return; // Early exit to prevent enabling button
      }
    }

    setEnableAssignBtn(!!isAllFieldsSelected);
  }, [selectedFilters]);

  useEffect(() => {
    if (isAssingLessonSuccessfull) {
      console.log("isAssingLessonSuccessfull:", isAssingLessonSuccessfull);
      setSelectedFilters({
        level: "",
        chapter: "",
        startDate: "",
        dueDate: "",
        assignedTo: "",
        selectedClass: "",
        selectedSection: "",
      });
    }
  }, [isAssingLessonSuccessfull]);

  const handelChange = (e, target) => {
    let name = "";
    let value = "";
    if (!e) {
      name = target.name;
      value = target.value;
    } else {
      console.log("target", e.target.name);
      name = e.target.name;
      value = e.target.value;
    }

    if (name === "assignedTo") {
      if (value === "students") setHideSection(true);
      else setHideSection(false);
    }

    if (name === "chapter") {
      const chapterName = levelChapters[level].find(
        (chapLess) =>
          parseInt(chapLess?.chapter.id) === parseInt(value) ||
          chapLess?.chapter.id === value
      )?.chapter?.title;

      setChapterName(chapterName);
    }

    if (name === "startDate") {
      setStartDate(value);
    }

    if (name === "assignedTo") {
      setAssignedTo(value);
    }

    if (name === "selectedClass") {
      setSelectedClass(value);
    }

    if (name === "selectedSection") {
      setSelectedSection(value);
    }

    if (name === "dueDate") {
      //get the start date and comapre with the duedate, duedate has to be greater than start date
      const dueDate = new Date(value);
      const startDate = new Date(selectedFilters?.startDate);

      if (dueDate < startDate) {
        setValidationErrMsg("Due date should be greater than start date");
        setEnableAssignBtn(false);
      }
    }

    setSelectedFilters((prev) => {
      const updated = { ...prev, [name]: value };
      console.log("selected filters", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAssignLessons = () => {
    const params = {
      ...selectedFilters,
      selectedSection: selectedFilters.selectedSection,
      selectedStudents:
        selectedFilters.assignedTo === "students" ? selectedStudents : [],
    };
    handleAssign(params);
  };

  return (
    <>
      <div className="mb-3 lessons-filter">
        <div className="">
          <label className="form-label">Select</label>
          <select
            className="form-select"
            value={selectedFilters?.level}
            name="level"
            onChange={(e) => {
              setLevel(e.target.value);
              handelChange(e);
            }}
          >
            <option value=""> </option>
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </select>
        </div>
        <div className="">
          <label className="form-label">Select</label>
          <select
            className="form-select"
            value={selectedFilters?.chapter}
            name="chapter"
            onChange={(e) => {
              setChapter(e.target.value);
              handelChange(e);
            }}
          >
            <option value=""> </option>
            {Array.isArray(levelChapters[level]) &&
              levelChapters[level].map((chapLess) => (
                <option
                  key={chapLess?.chapter?.id}
                  value={chapLess?.chapter?.id}
                >
                  {chapLess?.chapter?.title}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="mb-3 lessons-filter">
        <div className="">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={selectedFilters?.startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              handelChange(e);
            }}
          />
        </div>
        <div className="">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={selectedFilters?.dueDate}
            min={
              selectedFilters?.startDate
                ? new Date(
                    new Date(selectedFilters.startDate).getTime() + 86400000
                  )
                    .toISOString()
                    .split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) => {
              handelChange(e);
            }}
          />
        </div>
      </div>

      <div className="mb-3 lessons-filter">
        <div className="">
          <label className="form-label">Assign To</label>
          <select
            className="form-select"
            name="assignedTo"
            value={selectedFilters?.assignedTo}
            onChange={(e) => {
              handelChange(e);
            }}
          >
            <option value=""></option>
            <option value="class">Class</option>
            <option value="students">Students</option>
          </select>
        </div>
        <div className="">
          <label className="form-label">Select Class</label>
          <select
            className="form-select"
            name="selectedClass"
            value={selectedFilters?.selectedClass}
            onChange={(e) => {
              handelChange(e);
            }}
          >
            <option value="0"> </option>
            <option value="1">Class - I</option>
            <option value="2">Class - II</option>
            <option value="3">Class - III</option>
            <option value="4">Class - IV</option>
            <option value="5">Class - V</option>
            <option value="6">Class - VI</option>
            <option value="7">Class - VII</option>
            <option value="8">Class - VIII</option>
            <option value="9">Class - IX</option>
            <option value="10">Class - X</option>
          </select>
        </div>
      </div>
      <div className="mb-3 lessons-filter">
        <div className="">
          {selectedFilters.assignedTo === "students" ? (
            <div className="d-flex flex-column">
              <AssignStudentSelector
                selectedClass={selectedFilters?.selectedClass}
                onSectionChange={(value) => {
                  console.log("selected section is: ", value);
                  handelChange(null, { name: "selectedSection", value: value });
                }}
                onStudentsSelect={(studentIds) => {
                  console.log("studentIds are:", studentIds);
                  setSelectedStudents(studentIds);
                }}
              />
            </div>
          ) : (
            <div className="">
              <label className="form-label">Select Section</label>
              <select
                className="form-select"
                name="selectedSection"
                value={selectedFilters?.selectedSection}
                onChange={(e) => handelChange(e)}
              >
                <option value=""></option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          )}
        </div>
        <div className="col-md-2 mt-4">
          {/* <label className="form-label">Action</label> */}
          <button
            className="btn btn-primary mt-2"
            onClick={handleAssignLessons}
            disabled={!enableAssignBtn}
          >
            Assign
          </button>
        </div>
      </div>
    </>
  );
}

export default AssignNewLessonsFilters;
