import React from 'react';
import './ChapterOverview.css';

const ChapterOverview = ({ icon, title, description, onStart }) => {
  return (
    <div className="chapter-overview">
      <img src={icon} alt={`${title} icon`} className="overview-icon" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="start-btn" onClick={onStart}>Start Course</button>
    </div>
  );
};

export default ChapterOverview;
