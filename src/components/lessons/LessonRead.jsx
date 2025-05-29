import React, { useState } from "react";
import "./LessonRead.css";
import ModalPopup from "../alerts/ModalPopup";

const LessonRead = () => {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleAnswer = (questionIndex, choice) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  const questions = [
    {
      question: "What is the main theme of the text?",
      choices: [
        "The beauty of nature",
        "The challenges of daily life",
        "A peaceful evening",
        "The importance of reflection",
      ],
    },
    {
      question: "What time of day is it in the text?",
      choices: ["Morning", "Afternoon", "Evening", "Night"],
    },
    {
      question: "What is Sarah doing on the porch?",
      choices: [
        "Reading a book",
        "Drinking tea and watching fireflies",
        "Talking on the phone",
        "Gardening",
      ],
    },
    {
      question: "What does Sarah feel at the end of the day?",
      choices: ["Excitement", "Disappointment", "Contentment", "Anxiety"],
    },
  ];

  const MCQS = () => {
    return (
      <>
        <div className="question-list">
          {questions.map((q, index) => (
            <div className="question-card" key={index}>
              <p className="question">{q.question}</p>
              <div className="choices">
                {q.choices.map((choice, idx) => (
                  <label
                    key={idx}
                    className={`choice ${
                      answers[index] === choice ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={choice}
                      onChange={() => handleAnswer(index, choice)}
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="submit-btn"><i class="bi bi-check-circle"></i> Submit</button>
      </>
    );
  };

  return (
    <div className="lesson-read-container">
      <div className="reading-comprehension-header">
        <div>
          <h2>Reading Comprehension</h2>
        </div>
        <div>
          <div className="record-icon" title="Start Record">
            <i class="bi bi-mic-fill"></i>
          </div>
        </div>
      </div>
      <p className="reading-text">
        Read the following text carefully. Pay attention to your pronunciation
        as you read aloud. This exercise will help improve your English
        pronunciation and comprehension skills.
        <br />
        <br />
        “The sun dipped below the horizon, painting the sky with hues of orange
        and purple. A gentle breeze rustled the leaves in the nearby forest,
        carrying the scent of pine and damp earth. Sarah sat on the porch,
        sipping her tea and watching the fireflies begin their nightly dance. It
        was a peaceful evening, a perfect end to a long day. She thought about
        the day’s events, the challenges overcome, and the small victories
        celebrated. A sense of contentment washed over her as she realized how
        much she had grown and learned. Tomorrow would bring new opportunities,
        new adventures, and she was ready to face them with renewed energy and
        optimism.”
      </p>

      <h3 className="mcq-header">
        Multiple Choice Questions{" "}
        <i className="bi bi-mouse2" onClick={() => setShowModal(() => true)}>
          <span className="small-text">Click here</span>
        </i>{" "}
      </h3>

      <ModalPopup
        show={showModal}
        title="Multiple Choice Questions"
        childComp={<MCQS />}
        onCancel={() => setShowModal(false)}
        showFooter={false}
      />
    </div>
  );
};

export default LessonRead;
