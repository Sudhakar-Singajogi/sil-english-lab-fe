import React from 'react';
import './ChapterList.css';

const chapters = [
  {
    id: 1,
    title: 'Greetings and Introductions',
    icon: '/assets/icons/greeting.svg',
    description: 'Learn how to greet and introduce yourself in English.',
  },
  {
    id: 2,
    title: 'The English Alphabet',
    icon: '/assets/icons/alphabet.svg',
    description: 'Master the letters of the English alphabet and pronunciation.',
  },
  {
    id: 3,
    title: 'Numbers and Counting',
    icon: '/assets/icons/numbers.svg',
    description: 'Understand numbers and basic counting in everyday situations.',
  },
  {
    id: 4,
    title: 'Days of the Week',
    icon: '/assets/icons/calendar.svg',
    description: 'Familiarize yourself with weekdays and how to use them.',
  }
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
                <img src={chapter.icon} alt="icon" className="chapter-icon" />
                <div>
                  <span className="chapter-number">Chapter {chapter.id}</span>
                  <h3 className="chapter-name">{chapter.title}</h3>
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
