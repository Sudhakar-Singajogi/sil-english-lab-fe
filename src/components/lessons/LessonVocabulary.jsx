import React from "react";
import "./LessonVocabulary.css";

const vocabularyList = [
  {
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking",
    example: "The lawyer gave an eloquent speech to the jury.",
    quiz: null,
  },
  {
    word: "Persistent",
    definition: "Continuing firmly; relentless",
    example: "He remained persistent despite the setbacks.",
    quiz: null,
  },
  {
    word: "Alacrity",
    definition: "Eagerness or willingness",
    example: "She accepted the invitation with alacrity.",
    quiz: "The __________ man offered help to strangers.",
  },
];

const LessonVocabulary = () => {
  return (
    <div className="vocabulary-container">
      <div className="vocabulary-header">
        <div>
          <h2 className="vocabulary-title">Vocabulary</h2>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">  Quiz mode</label>
        </div>
      </div>
      {vocabularyList.map((item, index) => (
        <div key={index} className="vocab-card">
          <div className="vocab-header">
            <h3 className="word-title">{item.word}</h3>
            <button className="btn btn-primary btn-sm audio-button">
              <i className="bi bi-volume-up"></i>
            </button>
          </div>
          <p className="definition">{item.definition}</p>
          <p className="example">
            <em>{item.example}</em>
          </p>

          <div className="action-buttons">
            <button className="review-btn btn btn-primary" title="Review later">
              <i className="bi bi-arrow-repeat ml-1"></i>
              <span> Review later</span>
            </button>
            <button
              className="btn btn-lesson-success btn-primary "
              title="Mark as mastered"
            >
              <i class="bi bi-check2-circle"></i> <span> Mark as mastered</span>
            </button>
          </div>

          {item.quiz && (
            <div className="quiz-section">
              <span className="quiz-label">Quiz mode</span>
              <p className="quiz-text">{item.quiz}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonVocabulary;
