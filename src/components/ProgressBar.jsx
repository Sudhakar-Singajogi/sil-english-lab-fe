import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ percentage = 0, showProgressLabel=false }) => {
    console.log('percentage is', percentage);
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}/>
      </div>
      {
        showProgressLabel && <span className="progress-bar-label">{percentage}% Completed</span>
      }
      
    </div>
  );
};

export default ProgressBar;
