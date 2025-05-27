// LessonDetails.jsx with dynamic path param + query param for tab + swipe
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSwipeable } from "react-swipeable";
import { useLesson } from "../../context/LessonDetailsContext";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import "./LessonDetails.css";

const Listen = lazy(() => import("./Listen"));
const ListenRead =lazy(()=> import("./LessonRead"))
const LessonWrite = lazy(() => import("./LessonWrite"));
const LessonVocabulary = lazy(() => import("./LessonVocabulary"));

const iconMap = {
  Intro: "book",
  Listen: "volume-up",
  Speak: "mic",
  Read: "book-half",
  Write: "pencil",
  Vocabulary: "file-earmark-text",
};

const sections = ["Intro", "Listen", "Speak", "Read", "Write", "Vocabulary"];

const LessonDetails = ({ fetchLesson }) => {
  const { getLesson } = useLesson();
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("Intro");
  const [swipeClass, setSwipeClass] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { lessonSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && sections.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const lessonId = lessonSlug; // Use slug as ID or decode as needed
    getLesson(lessonId, fetchLesson).then(setLesson);
  }, [lessonSlug]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
    document.title = `${lessonSlug}`;
  }, [activeTab, setSearchParams, lessonSlug]);

  const currentIndex = sections.indexOf(activeTab);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < sections.length - 1) {
        setSwipeClass("swipe-left");
        setActiveTab(sections[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setSwipeClass("swipe-right");
        setActiveTab(sections[currentIndex - 1]);
      }
    },
    delta: 40,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setSwipeClass(""), 400);
    return () => clearTimeout(timer);
  }, [swipeClass]);

  if (!lesson) return <div className="lesson-loading">Loading...</div>;

  return (
    <>
      <div className="lesson-sidebar-desktop show-as-column-vsm align-items-center">
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
      <div className="lesson-details-container">
        <div className="lesson-sidebar-desktop show-as-column-lg align-items-center">
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
          <div className="lesson-sidebar-desktop show-as-column-md align-items-center">
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

          <div
            className={`lesson-content-section ${swipeClass}`}
            {...swipeHandlers}
          >
            <div className="lesson-header">
              <h4 className="lesson-title">
                Lesson {lesson.number}: {lesson.title}
              </h4>
              <div className="lesson-meta">
                <span className="badge bg-secondary">{lesson.cefr}</span>
                <span className="badge bg-light text-dark ms-2">
                  {lesson.duration}
                </span>
              </div>
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
              </div>
            )}

            {activeTab === "Listen" && (
              <Suspense fallback={<div>Loading Listen Section...</div>}>
                <Listen />
              </Suspense>
            )}

            {activeTab === "Read" && (
              <div className="lesson-read fade-in">
                <Suspense fallback={<div>Loading Listen Section...</div>}>
                <ListenRead />
                
                </Suspense>
                {/* <div className="card p-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </div>
                <button className="btn btn-outline-primary mt-3">
                  <i className="bi bi-mic me-2"></i> Start Reading
                </button> */}
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
              <Suspense fallback={<div>Loading Listen Section...</div>}>
                <div className="lesson-write fade-in">
                  <LessonWrite />
                </div>
              </Suspense>
            )}

            {activeTab === "Vocabulary" && (
              <Suspense fallback={<div>Loading Listen Section...</div>}>
                <div className="lesson-vocab fade-in">
                  <LessonVocabulary />
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonDetails;
