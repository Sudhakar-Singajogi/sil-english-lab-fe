// LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useLesson } from "../../context/LessonDetailsContext";
import "./LessonDetails.css";

const iconMap = {
  Intro: "book",
  Listen: "volume-up",
  Speak: "mic",
  Read: "book-half",
  Write: "pencil",
  Vocabulary: "file-earmark-text",
};

const LessonDetails = ({ lessonId, fetchLesson }) => {
  const { getLesson } = useLesson();
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("Intro");

  useEffect(() => {
    getLesson(lessonId, fetchLesson).then(setLesson);
  }, [lessonId]);

  if (!lesson) return <div className="lesson-loading">Loading...</div>;

  const sections = ["Intro", "Listen", "Speak", "Read", "Write", "Vocabulary"];

  return (
    <div className="lesson-details-container">
      {/* <div className="lesson-tab-nav show-lg-scr  justify-content-center mb-3">
        {sections.map((section) => (
          <button
            key={section}
            className={`tab-btn ${activeTab === section ? "active" : ""}`}
            onClick={() => setActiveTab(section)}
          >
            <i className={`bi bi-${iconMap[section]}`}></i> {section}
          </button>
        ))}
      </div> */}
        <div className="lesson-sidebar-desktop  show-as-column-lg align-items-center">
          {sections.map((section) => (
            <div
              key={section}
              className={`nav-icon ${activeTab === section ? "active" : ""}`}
              onClick={() => setActiveTab(section)}
            >
              <i className={`bi bi-${iconMap[section]}`}></i>
              <span>{section}</span>
            </div>
          ))}
        </div>

      <div className="lesson-main-panel">
        <div className="lesson-sidebar-desktop  show-as-column-md  align-items-center">
          {sections.map((section) => (
            <div
              key={section}
              className={`nav-icon ${activeTab === section ? "active" : ""}`}
              onClick={() => setActiveTab(section)}
            >
              <i className={`bi bi-${iconMap[section]}`}></i>
              <span>{section}</span>
            </div>
          ))}
        </div>

        <div className="lesson-content-section">
          <h4 className="lesson-title">
            Lesson {lesson.number}: {lesson.title}
          </h4>
          <div className="lesson-meta mb-3">
            <span className="badge bg-secondary">{lesson.cefr}</span>
            <span className="badge bg-light text-dark ms-2">
              {lesson.duration}
            </span>
          </div>

          {activeTab === "Intro" && (
            <div className="lesson-intro fade-in">
              <p>
                <strong>In this lesson:</strong> {lesson.intro}
              </p>
              <audio controls className="w-100">
                <source src={lesson.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="lesson-actions mt-3">
                <button className="btn btn-primary">Start Lesson</button>
                <button className="btn btn-outline-secondary ms-2">
                  Download
                </button>
                <button className="btn btn-outline-secondary ms-2">
                  Share
                </button>
              </div>
            </div>
          )}

          {activeTab === "Read" && (
            <div className="lesson-read fade-in">
              <div className="card p-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
              </div>
              <button className="btn btn-outline-primary mt-3">
                <i className="bi bi-mic me-2"></i> Start Reading
              </button>
            </div>
          )}

          {activeTab === "Speak" && (
            <div className="lesson-speak fade-in">
              <p>Repeat after the prompt:</p>
              <button className="btn btn-outline-danger">
                <i className="bi bi-mic-fill me-2"></i> Start Speaking
              </button>
            </div>
          )}

          {activeTab === "Write" && (
            <div className="lesson-write fade-in">
              <p>Write a short paragraph about your last vacation.</p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Type here..."
              ></textarea>
            </div>
          )}

          {activeTab === "Vocabulary" && (
            <div className="lesson-vocab fade-in">
              <ul className="list-group">
                <li className="list-group-item">Word 1 - Definition</li>
                <li className="list-group-item">Word 2 - Definition</li>
                <li className="list-group-item">Word 3 - Definition</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
