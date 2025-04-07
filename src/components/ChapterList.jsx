import React from "react";
import ProgressBar from "./ProgressBar"; // import it here
import "./ChapterList.css";

const chapters = [
  {
    id: 1,
    title: "Greetings and Introductions",
    icon: `${import.meta.env.BASE_URL}assets/icons/greeting.svg`,
    description: "Learn how to greet and introduce yourself in English.",
    progress: 30,
  },
  {
    id: 2,
    title: "The English Alphabet",
    icon: `${import.meta.env.BASE_URL}assets/icons/greeting.svg`,
    description:
      "Master the letters of the English alphabet and pronunciation.",
      progress: 45,
  },
  {
    id: 3,
    title: "Numbers and Counting",
    icon: `${import.meta.env.BASE_URL}assets/icons/greeting.svg`,
    description:
      "Understand numbers and basic counting in everyday situations.",
      progress: 40,
  },
  {
    id: 4,
    title: "Days of the Week",
    icon: `${import.meta.env.BASE_URL}assets/icons/greeting.svg`,
    description: "Familiarize yourself with weekdays and how to use them.",
    progress: 65,
  },
];

const ChapterList = () => {
  return (
    <div className="chapter-list-container">
      <h2 className="chapter-heading">Upcoming Chapters</h2>
      <ul className="chapter-list">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="chapter-card">
            <div className="chapter-info">
              <div className="chapter-title">
                <div>
                    <div className='progress-bar'>
                    <span className="chapter-number">Chapter {chapter.id}</span>
                    <ProgressBar percentage={chapter.progress} showProgressLabel={true} />
                    </div>
                  

                  <h3 className="chapter-name">
                    <img
                      src={chapter.icon}
                      alt="icon"
                      className="chapter-icon"
                    />
                    <span className='chapter-title-inner'>{chapter.title}</span>
                  </h3>
                  <p className="chapter-description">{chapter.description}</p>
                </div>
              </div>
            </div>
            <button className="chapter-view-button">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
