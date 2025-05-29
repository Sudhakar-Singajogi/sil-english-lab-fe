import React, { useEffect, useState } from "react";
import "./AssignNewLessons.css";
import { fetchChapterBylevel } from "../../service/apiService";
import { useSelector } from "react-redux";

const AssignNewLessons = () => {
  const [level, setLevel] = useState("");
  const [chapter, setChapter] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [assignTo, setAssignTo] = useState("class");
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const [levelChapters, setLevelChapters] = useState({});
  const { allowedChapters } = useSelector((state) => state.auth.lacInfo);
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

  return (
    <div className="card shadow-sm assign-lessons-container">
      <h5 className="mb-4">Assign New Lessons</h5>
      <div className="d-grid lessons-filter-section">
        <div className="mb-3 lessons-filter">
          <div className="">
            <label className="form-label">Select</label>
            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Level</option>
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
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            >
              <option value="">Select Chapter</option>
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
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 lessons-filter">
          <div className="">
            <label className="form-label">Assign To</label>
            <select
              className="form-select"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            >
              <option value=""></option>
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
