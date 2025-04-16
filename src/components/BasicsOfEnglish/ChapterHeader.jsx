import React from 'react';
import './ChapterHeader.css';

const ChapterHeader = ({ step, icon, title, description, chapterId }) => {
  return (
    <>
    <div className="chapter-header">
      <img src={icon} alt={`${title} icon`} className="chapter-header-icon" />
      <div>
        <span className="chapter-cnt">Chapter {chapterId}</span>
        <h1 className="chapter-header-title">{title}</h1>
      </div>
        <p className="chapter-header-description">{description}</p>
    </div>
    </>
  );
};

export default ChapterHeader;
