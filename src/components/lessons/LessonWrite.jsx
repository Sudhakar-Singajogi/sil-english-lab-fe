// LessonWrite.jsx
import React, { useState } from "react";
import "./LessonWrite.css";

const LessonWrite = () => {
  const [text, setText] = useState("");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = () => {
    alert("Submitted for evaluation");
    // handle logic to send to backend here
  };

  return (
    <div className="lesson-write-container">
      {/* <h2 className="write-heading">Write</h2> */}

      <div className="writing-task">
        <div className="task-header">
          <h4>Describe your family</h4>
          <span className="level-info">A1 | Chapter 2</span>
        </div>

        <textarea
          className="write-textarea form-control"
          placeholder="Type your response here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />

        <div className="write-footer">
          <div>
            <span className="word-count">Words: {wordCount} / 150</span>
          </div>
          <div className="align-right">
            <button className="bnt btn-sm submit-btn" onClick={handleSubmit}>
              <i class="bi bi-check-circle-fill"></i> Submit
            </button>
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <h4>AI Feedback</h4>
        <ul>
          <li>Grammar suggestions</li>
          <li>Sentence structure</li>
          <li>Vocabulary richness</li>
          <li>Clarity & tone</li>
        </ul>

        <div className="feedback-eval">
          <div className="score-box">82 / 100</div>
          <p>Your response has been recorded and evaluated.</p>
        </div>

        <button className="edit-btn bnt btn-sm submit-btn"><i class="bi bi-pencil-square"></i> Rewrite</button>
      </div>
    </div>
  );
};

export default LessonWrite;
