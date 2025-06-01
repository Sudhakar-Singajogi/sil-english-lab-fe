import React, { useEffect, useState } from "react";
import "./AssignNewLessons.css";

import {
  fetchChapterBylevel,
  fetchLessonsByChapter,
  assignlessons,
} from "../../service/apiService";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { LessonChapterDetails } from "../../context/LessonDetailsContext";
import { Alert, Form } from "react-bootstrap";
import AssignNewLessonsFilters from "./AssignNewLessonsFilters";
import { toast } from "react-toastify";

const AssignNewLessons = () => {
  const [level, setLevel] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLessons, setSelectedLessons] = useState([]);
  // const [assignTo, setAssignTo] = useState("class");
  // const [classValue, setClassValue] = useState("");
  // const [sectionValue, setSectionValue] = useState("");
  const [levelChapters, setLevelChapters] = useState({});
  const { allowedChapters } = useSelector((state) => state.auth.lacInfo);
  const { userId, fullName } = useSelector((state) => state.auth.user);
  const { schoolInfo } = useSelector((state) => state.auth);
  const [isLessonsSelected, setIsLessonsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssingLessonSuccessfull, setIsAssingLessonSuccessfull] = useState(false);

  const {
    state: { lessonsIds, chapterLessons },
    lessonsByChapter,
    resetChapterLessons
  } = LessonChapterDetails();

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
        toast.success( resp.message);
         await resetChapterLessons();
      }

      console.log("response is: ", resp);
    } else {
      setIsLessonsSelected(true);
    }
    // const payload =

    // TODO: Dispatch Redux action or API call
  };

  const filterAllowedChapters = (chapters) => {
    if (!allowedChapters || !Array.isArray(allowedChapters)) {
      return;
    }

    const chapters_level = chapters.filter((chapter) =>
      allowedChapters.some((c) => c.chapterId === chapter.documentId)
    );

    console.log("chapters_level is", chapters_level);

    setLevelChapters((prev) => ({
      ...prev,
      [level]: chapters_level,
    }));
  };

  useEffect(() => {
    const chapterlevels = async () => {
      const chaps = { ...levelChapters };
      if (chaps[level] && chaps[level].length > 0) {
        return;
      }

      const response = await fetchChapterBylevel(level);

      if (response && Array.isArray(response.chapters)) {
        filterAllowedChapters(response.chapters);
      }
    };

    if (level === "") return;
    chapterlevels();
  }, [level]);

  useEffect(() => {
    const chapLevel = { ...levelChapters };
    console.log("levelChapters: ", chapLevel[level]);
  }, [level, levelChapters]);

  useEffect(() => {
    const getLesson = async () => {
      setIsLoading(true);
      await lessonsByChapter(allowedChapters, chapter); // ✅ calling directly
      setIsLoading(false);
    };

    if (chapter === "") return;
    getLesson();
  }, [chapter]);

  useEffect(() => {
    console.log("lessonsIds are", chapterLessons);
  }, [chapterLessons]);

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

    //
  };

  return (
    <div className="card shadow-sm assign-lessons-container">
      <h5 className="mb-4">Assign New Lessons</h5>
      <div className="d-grid lessons-filter-section">
        <AssignNewLessonsFilters
          level={level}
          setLevel={setLevel}
          chapter={chapter}
          setChapter={setChapter}
          setChapterName = {setChapterName}
          levelChapters={levelChapters}
          startDate={startDate}
          setStartDate={setStartDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleAssign={handleAssign}
          isAssingLessonSuccessfull={isAssingLessonSuccessfull} 
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
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {chapterLessons &&
                chapterLessons[chapter] &&
                chapterLessons[chapter].map((lesson) => (
                  <tr key={lesson?.documentId}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedLessons.includes(lesson?.documentId)}
                        onChange={(e) =>
                          setIsChecked(lesson?.documentId, e.target.checked)
                        }
                      />
                    </td>
                    <td>{level}</td>
                    {/* <td>{chapter}</td> */}
                    <td>{chapterName}</td>
                    <td>{lesson?.title}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignNewLessons;
