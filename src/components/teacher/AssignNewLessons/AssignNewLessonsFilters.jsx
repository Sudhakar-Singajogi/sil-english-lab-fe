import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import useStudentSelector from "./hooks/useStudentSelector";
import useSILDrawer from "../../hooks/useSILDrawer";
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
  const [showStudentList, setShowStudentList] = useState(false);

  const { show, open, close } = useSILDrawer();

  const {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedSec,
    setSelectedSec,
    students,
    selectedStudents,
    toggleStudent,
    reset,
  } = useStudentSelector();

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

  const handelChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignedTo") {
      setHideSection(true);
    }

    if (name === "chapter") {
      const chapterName = levelChapters[level].find(
        (chapter) => chapter.documentId === value
      )?.title;
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

  // const handleAssignLessons = () => {
  //   const params = { ...selectedFilters };
  //   handleAssign(params);
  // };
  const handleAssignLessons = () => {
    const params = {
      ...selectedFilters,
      selectedSection:
        selectedFilters.assignedTo === "Student"
          ? selectedSection
          : selectedFilters.selectedSection,
      selectedStudents:
        selectedFilters.assignedTo === "Student" ? selectedStudents : [],
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
              levelChapters[level].map((chapter) => (
                <option key={chapter?.documentId} value={chapter?.documentId}>
                  {chapter?.title}
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
            <option>Class</option>
            <option>Student</option>
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
          {selectedFilters.assignedTo === "Student" ? (
            <div className="d-flex flex-column">
              <AssignStudentSelector
                onSectionChange={(e) =>
                  handelChange({
                    target: { name: "selectedSection", value: e.target.value },
                  })
                }
                onStudentsSelect={(id, checked) => {
                  // Optional: store selected student ids
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
