import React from "react";
import "./TeacherDashboard.css";
import CardSlider from "../../components/Carousel/CardSlider";

const lessonSlides = () => {
  return (
    <>
      <div>
        <div className="lesson-card">
          <div className="title-row">
            <h5>Lesson 2</h5>
            <span className="badge">A1</span>
          </div>
          <p>Chapter 1</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "45%" }}></div>
          </div>
          <div className="lesson-footer">
            <span>In Progress</span>
            <p>
              <button className="resume-btn">
                <i className="bi bi-play-circle"></i> <span>Resume</span>
              </button>
            </p>
          </div>
        </div>

        <div className="lesson-card">
          <div className="title-row">
            <h5>A2 level</h5>
            <span className="badge">A2</span>
          </div>
          <p>Chapter 1</p>
          <div className="progress-bar empty"></div>
          <div className="lesson-footer">
            <span>Due tomorrow</span>
            <p>
              <button className="resume-btn">
                <i className="bi bi-play-circle"></i> <span>Resume</span>
              </button>
            </p>
          </div>
        </div>

        <div className="lesson-card">
          <div className="title-row">
            <h5>A2 level</h5>
            <span className="badge">A2</span>
          </div>
          <p>Chapter 1</p>
          <div className="progress-bar empty"></div>
          <div className="lesson-footer">
            <span>In completion</span>
            <p>
              <button className="resume-btn">
                <i className="bi bi-play-circle"></i> <span>Resume</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="avatar-progress">
          <div>
            <h5 className="section-title">Overall Progress</h5>
            <span className="status">In Progress</span>
            <p className="streak">You’ve been learning for 5 days in a row!</p>
          </div>
        </div>
        <div className="circular-progress">
          <div className="circle">
            <div className="center-text">
              <div>Overall Progress</div>
              <strong>75%</strong>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs">
        <button className="active">Lessons</button>
        <button>Upcoming</button>
        <button>Completed</button>
      </div>

      <div className="lessons-section">
        <CardSlider children={lessonSlides()} />
      </div>

      <div className="suggestions-info-grid">
        <div className="actionable-suggestions">
          <h5>Actionable suggestions</h5>
          <div className="suggestion-card">Continue where you left off</div>
          <div className="suggestion-card">
            <i className="bi bi-play-circle"></i> Suggested Practice
            <p>Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>

        <div className="general-info">
          <h5>General Information</h5>
          <div className="info-item">
            <i className="bi bi-star"></i> Leaderboard
            <p>Lorem ipsum dolorsit amet</p>
          </div>
          <div className="info-item">
            <i className="bi bi-bell"></i> Announcements
            <p>Lorem ipsum dolorsit amet</p>
          </div>
        </div>
      </div>

      <div className="announcements">
        <h5>Announcements</h5>
        <ul>
          <li>________________________</li>
          <li>________________________</li>
          <li>________________________</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;

/*
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("Lessons");

  const lessonData = [
    { title: "Lesson 2", chapter: "Chapter 1", badge: "A1", progress: 45, label: "In Progress" },
    { title: "A2 level", chapter: "Chapter 1", badge: "A2", progress: 0, label: "Due tomorrow" },
    { title: "Lesson 1", chapter: "Incomplete", badge: "A1", progress: 0, label: "" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <div className="progress-summary">
          <div className="avatar-progress">
            <div className="avatar-placeholder"></div>
            <div>
              <h5>Overall Progress</h5>
              <span className="status">In Progress</span>
              <p className="streak">You’ve been learning for 5 days in a row!</p>
            </div>
          </div>
          <div className="circular-progress">
            <div className="circle">
              <div className="center-text">
                <strong>Overall Progress</strong>
                <span>75%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="tabs">
        {['Lessons', 'Upcoming', 'Completed'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="lessons-carousel">
        <Slider {...sliderSettings}>
          {lessonData.map((lesson, index) => (
            <div className="lesson-card" key={index}>
              <h5>{lesson.title}</h5>
              <p>{lesson.chapter}</p>
              <div className="badge">{lesson.badge}</div>
              <div className={`progress-bar ${lesson.progress === 0 ? 'empty' : ''}`}>
                <div className="progress-fill" style={{ width: `${lesson.progress}%` }}></div>
              </div>
              {lesson.label && <span className="progress-label">{lesson.label}</span>}
              <button className="resume-btn">Resume</button>
            </div>
          ))}
        </Slider>
      </div>

      <div className="suggestions-info-grid">
        <div className="actionable-suggestions">
          <h5>Actionable suggestions</h5>
          <div className="suggestion-card">Continue where you left off</div>
          <div className="suggestion-card">
            <i className="bi bi-play-circle"></i> Suggested Practice
            <p>Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>

        <div className="general-info">
          <h5>General Information</h5>
          <div className="info-item">
            <i className="bi bi-star"></i> Leaderboard
            <p>Lorem ipsum dolorsit amet</p>
          </div>
          <div className="info-item">
            <i className="bi bi-bell"></i> Announcements
            <p>Lorem ipsum dolorsit amet</p>
          </div>
        </div>
      </div>

      <div className="announcements">
        <h5>Announcements</h5>
        <ul>
          <li>________________________</li>
          <li>________________________</li>
          <li>________________________</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
*/
