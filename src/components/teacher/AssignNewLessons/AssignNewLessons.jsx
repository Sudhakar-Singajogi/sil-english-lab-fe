import React, { useEffect, useMemo, useState } from "react";
import "./AssignNewLessons.css";
import { assignlessons } from "../../../service/apiService";
import { useSelector } from "react-redux";
import Loader from "../../Loader";
import { LessonChapterDetails } from "../../../context/LessonDetailsContext";
import { Alert } from "react-bootstrap";
import AssignNewLessonsFilters from "./AssignNewLessonsFilters";
import { toast } from "react-toastify";
import { isLessonAssigned } from "../../../utils/helper";
import LessonRow from "./LessonRow";
import useAssignedMap from "./hooks/useAssignedMap";
import useChapters from "./hooks/useChapters";
import useLessons from "./hooks/useLessons";
import SILDrawer from "../../SILDrawer";
import AlertDialog from "../../alerts/AlertDialog";
import ModalPopup from "../../alerts/ModalPopup";
import ConflictStudents from "./ConflictStudents";
import useIsMobile from "../../hooks/useIsMobile,js";

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
  const [selectedLessonsToAssign, setSelectedLessonsToAssign] = useState([]);
  const [conflictStudents, setConflictStudents] = useState([]);
  const [excludedStudents, setExcludedStudents] = useState([]);
  const [isConflictedStudentsExcluded, setIsConflictedStudentsExcluded] =
    useState(false);
  const [conflictedLesson, setConflictedLesson] = useState("");

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
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [isAssingLessonSuccessfull, setIsAssingLessonSuccessfull] =
    useState(false);
  const levelChapters = useChapters(level, allowedChapters);

  const {
    state: { lessonsIds, chapterLessons },
    lessonsByChapter,
    resetChapterLessons,
  } = LessonChapterDetails();

  const isLoading = useLessons(chapter, allowedChapters, lessonsByChapter);
  const isMobile = useIsMobile(); // defaults to 768px

  const assignedLessons = useAssignedMap(
    chapter,
    chapterLessons,
    lessonsChapterStats,
    startDate,
    dueDate,
    assignedTo,
    selectedClass,
    selectedSection,
    selectedLessonsToAssign
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

      if (payload?.selectedStudents) {
        reqPayload.studentIds = payload?.selectedStudents;
      }

      if(isConflictedStudentsExcluded && excludedStudents.length > 0) {
        reqPayload.excludedStudentIds = excludedStudents;
      }

      // console.log('reqPayload', reqPayload);
      // return;

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

  const recentlyAssigned = useMemo(
    () => lessonsChapterStats?.resultData?.recentlyAssigned || [],
    [lessonsChapterStats]
  );

  const handleClosePopup = () => setShowPopup(false);

  const setIsChecked = (lessonId, isChecked) => {
    const prevVals = [...selectedLessons];
    const chapterLessonList = chapterLessons[chapter];

    if (prevVals.length > 0 && !isChecked) {
      const index = prevVals.indexOf(lessonId);
      prevVals.splice(index, 1);
      setSelectedLessons([...prevVals]);
    } else {
      let assigned = [];
      console.log("lessonId:", lessonId);
      const matchedLesson = recentlyAssigned.find(
        (l) => l.lessonId === lessonId
      );

      console.log("matchedLesson:", matchedLesson);

      //TODO through a avalidation error if no lesson matches for time being we are just returning nothing
      if (!matchedLesson) return;
      console.log("hey here");

      assigned = isLessonAssigned(
        matchedLesson,
        {
          chapterLessonList,
          assignedTo,
          selectedClass,
          selectedSection,
          startDate,
          recentlyAssigned,
        },
        true
      ); // return students

      console.log('assigned', assigned);

      if (assigned.length > 0) {
        //show the popup with the assigned student for this lesson
        setConflictStudents(assigned);
        setShowAlertModal(true);
      } else {
        if (prevVals.length > 0 && !isChecked) {
          const index = prevVals.indexOf(lessonId);
          prevVals.splice(index, 1);
          setSelectedLessons([...prevVals]);
        } else {
          setSelectedLessons([...prevVals, lessonId]);
        }
      }

      if (isChecked && lessonId) {
        setIsLessonsSelected(false);
      }
    }
  };

  const handleConfirm = () => {
    setShowPopup(true);
    setShowAlertModal(false);
  };

  const handleExcludeAll = (stds, lessonId) => {
    console.log("exclude student", stds);
    console.log("lessonId: ", lessonId);
    const prevVals = [...selectedLessons];
    const prevExclude = [...excludedStudents];

    const obj = {
      studentIds: stds,
      lessonId: lessonId,
    };

    setExcludedStudents([...prevExclude, obj]);
    setIsConflictedStudentsExcluded(true);
    setConflictedLesson(lessonId);
    setSelectedLessons([...prevVals, lessonId]);
  };

  const confirmMesage = () => {
    return (
      <div>
        <p>
          This lesson is already assigned to few students, Click <b>OKAY</b>{" "}
          button to view the students and continue
        </p>
      </div>
    );
  };

  const getTitle = () => {
    return (
      <>
        <i
          class="bi bi-exclamation-triangle-fill"
          style={{ color: "orange" }}
        ></i>{" "}
        Conflict in the lesson
      </>
    );
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
                    conflictedLesson={conflictedLesson}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AlertDialog
        show={showAlertModal}
        title={getTitle()}
        message={confirmMesage()}
        onOk="Override"
        handleOK={handleConfirm}
        onClose={() => {
          setShowAlertModal(false);
        }}
      />

      {isMobile ? (
        <ModalPopup
          show={showPopup}
          onClose={handleClosePopup}
          title="Assigned Students to lesson"
          childComp={
            <ConflictStudents
              conflictStudents={conflictStudents}
              handleClosePopup={handleClosePopup}
              onExclude={handleExcludeAll}
            />
          }
          onCancel={handleClosePopup}
          showFooter={false}
          size="xl"
        />
      ) : (
        <SILDrawer
          show={showPopup}
          onClose={handleClosePopup}
          title="Assigned Students to lesson"
        >
          <ConflictStudents
            conflictStudents={conflictStudents}
            handleClosePopup={handleClosePopup}
            onExclude={handleExcludeAll}
            footerClass="drawer-footer"
            chapterStye="drawer-header"
          />
        </SILDrawer>
      )}
    </div>
  );
};

export default AssignNewLessons;
