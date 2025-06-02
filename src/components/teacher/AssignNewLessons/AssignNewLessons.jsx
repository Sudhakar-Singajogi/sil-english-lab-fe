import React, { useEffect, useMemo, useState } from "react";
import "./AssignNewLessons.css";
import {
  fetchChapterBylevel,
  fetchLessonsByChapter,
  assignlessons,
} from "../../../service/apiService";
import { useSelector } from "react-redux";
import Loader from "../../Loader";
import { LessonChapterDetails } from "../../../context/LessonDetailsContext";
import { Alert, Form } from "react-bootstrap";
import AssignNewLessonsFilters from "./AssignNewLessonsFilters";
import { toast } from "react-toastify";
import { formatTimeStateIntoDate } from "../../../utils/helper";
import LessonRow from "./LessonRow";
import useAssignedMap from "./hooks/useAssignedMap";
import useChapters from "./hooks/useChapters";
import useLessons from "./hooks/useLessons";

const AssignNewLessons = ({ lessonsChapterStats }) => {
  const [level, setLevel] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [validationErrMsg, setValidationErrMsg] = useState("");

  // const { allowedChapters } = useSelector((state) => state.auth.lacInfo);
  const rawAllowedChapters = useSelector(
    (state) => state.auth.lacInfo.allowedChapters
  );
  const allowedChapters = useMemo(
    () => rawAllowedChapters,
    [rawAllowedChapters]
  );

  const { userId, fullName } = useSelector((state) => state.auth.user);
  const { schoolInfo } = useSelector((state) => state.auth);
  const [isLessonsSelected, setIsLessonsSelected] = useState(false);

  const [isAssingLessonSuccessfull, setIsAssingLessonSuccessfull] =
    useState(false);
  const levelChapters = useChapters(level, allowedChapters);

  const {
    state: { lessonsIds, chapterLessons },
    lessonsByChapter,
    resetChapterLessons,
  } = LessonChapterDetails();

  const isLoading = useLessons(chapter, allowedChapters, lessonsByChapter);

  const assignedLessons = useAssignedMap(
    chapter,
    chapterLessons,
    lessonsChapterStats,
    startDate,
    dueDate,
    assignedTo,
    selectedClass,
    selectedSection
  );

  const handleAssign = async (payload) => {
    if (selectedLessons.length > 0) {
      setIsLessonsSelected(false);

      const reqPayload = {
        schoolId: schoolInfo?.id,
        level: payload.level,
        chapterId: payload.chapter,
        lessonIds: selectedLessons,
        assignTo: payload.assignedTo.toLowerCase(),
        classId: parseInt(payload.selectedClass),
        startDate: payload.startDate,
        dueDate: payload.dueDate,
        assignedBy: `${userId} || ${fullName}`,
      };

      if (payload?.selectedSection) {
        reqPayload.section = payload?.selectedSection;
      }
      console.log("reqPayload is: ", reqPayload);
      const resp = await assignlessons(reqPayload);

      if (resp.success) {
        setIsAssingLessonSuccessfull(true);
        setSelectedLessons([]);
        toast.success(resp.message);
        await resetChapterLessons();
      }

      console.log("response is: ", resp);
    } else {
      setIsLessonsSelected(true);
    }
  };

  const setIsChecked = (lessonId, isChecked) => {
    const prevVals = [...selectedLessons];
    //find the index whether the lesson is already selected

    if (prevVals.length > 0 && !isChecked) {
      const index = prevVals.indexOf(lessonId);

      //remove the lesson from the array
      console.log(prevVals.splice(index, 1));
      setSelectedLessons([...prevVals]);
    } else {
      setSelectedLessons([...prevVals, lessonId]);
    }

    if (isChecked && lessonId) {
      setIsLessonsSelected(false);
    }
  };

  return (
    <div className="card shadow-sm assign-lessons-container">
      <h5 className="mb-4">Assign New Lessons</h5>
      <div className="d-row">
        {validationErrMsg !== "" && (
          <Alert show={true} variant="danger">
            {validationErrMsg}
          </Alert>
        )}
      </div>
      <div className="d-grid lessons-filter-section">
        <AssignNewLessonsFilters
          level={level}
          setLevel={setLevel}
          chapter={chapter}
          setChapter={setChapter}
          setChapterName={setChapterName}
          levelChapters={levelChapters}
          startDate={startDate}
          setStartDate={setStartDate}
          setAssignedTo={setAssignedTo}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleAssign={handleAssign}
          isAssingLessonSuccessfull={isAssingLessonSuccessfull}
          setSelectedClass={setSelectedClass}
          setSelectedSection={setSelectedSection}
          setValidationErrMsg={setValidationErrMsg}
        />
      </div>
      <div className="lesson-grid mb-4">
        <div className="table-responsive">
          {isLessonsSelected && (
            <Alert variant="danger">
              Please select atleast one lesson to assign
            </Alert>
          )}
          {isLoading && <Loader />}
          <table className="table table-bordered table-sm recently-assigned-grid">
            <thead className="table-light">
              <tr>
                <th></th>
                <th>Level</th>
                {/* <th>Chapter</th> */}
                <th>Chapter Title</th>
                <th>Lesson Name</th>
                <th>Is Assigned</th>
              </tr>
            </thead>
            <tbody>
              {chapterLessons &&
                chapterLessons[chapter] &&
                chapterLessons[chapter].map((lesson) => (
                  <LessonRow
                    key={lesson?.documentId}
                    lesson={lesson}
                    level={level}
                    chapterName={chapterName}
                    isChecked={selectedLessons.includes(lesson?.documentId)}
                    isAssigned={assignedLessons[lesson?.documentId]}
                    onCheckChange={setIsChecked}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignNewLessons;
