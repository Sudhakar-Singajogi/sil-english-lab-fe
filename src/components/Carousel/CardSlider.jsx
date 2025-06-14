import React from "react";
import "./CardSlider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useResponsiveChunks } from "./useResponsiveChunks";

const lessons = [
  { title: "Lesson 1", chapter: "Chapter 1" },
  { title: "Lesson 2", chapter: "Chapter 2" },
  { title: "Lesson 3", chapter: "Chapter 3" },
  { title: "Lesson 4", chapter: "Chapter 4" },
  { title: "Lesson 5", chapter: "Chapter 5" },
  { title: "Lesson 6", chapter: "Chapter 6" },
];

// Group array into chunks of size n
const chunkArray = (array, size) => {
  return array.reduce(
    (acc, _, i) => (i % size === 0 ? [...acc, array.slice(i, i + size)] : acc),
    []
  );
};

const CardSlider = () => {
  // const lessonChunks = chunkArray(lessons, 2); // group into slides of 3

  const lessonChunks = useResponsiveChunks(lessons);
  return (
    <div id="lessonCarousel" className="carousel slide" data-bs-ride="false">
      <div className="carousel-inner">
        {lessonChunks.map((group, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="row">
              {group.map((lesson, idx) => (
                // <div className="col-12 col-sm-6 col-md-4" key={idx}>
                //   <div className="card m-2">
                //     <div className="card-body">
                //       <h5 className="card-title">{lesson.title}</h5>
                //       <p className="card-text">{lesson.chapter}</p>
                //       <button className="btn btn-primary">Resume</button>
                //     </div>
                //   </div>
                // </div>
                <div className="lesson-card" key={idx}>
                  <div className="title-row">
                    <h5>{lesson.title}</h5>
                    <span className="badge">A1</span>
                  </div>
                  <p>{lesson.chapter}</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="lesson-footer">
                    <span>In Progress</span>
                    <p>
                      <button className="resume-btn">
                        <i className="bi bi-play-circle"></i>{" "}
                        <span>Resume</span>
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#lessonCarousel"
        data-bs-slide="prev"
      >
        <span className=" carousel-control-prev-icon" aria-hidden="true">
          <img width="25px" src={`/assets/icons/chevron-left-double.svg`} />
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#lessonCarousel"
        data-bs-slide="next"
      >
        <span
          className="carousel-controls carousel-control-next-icon"
          aria-hidden="true"
        >
          <img width="25px" src={`/assets/icons/chevron-right-double.svg`} />
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CardSlider;
