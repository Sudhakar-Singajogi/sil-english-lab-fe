import React from "react";
import { Link } from "react-router-dom";
import "./ListeningOverview.css";

const levels = [
  {
    id: "a1",
    title: "Level A1",
    description: "Beginner level: Simple listening activities for everyday situations.",
  },
  {
    id: "a2",
    title: "Level A2",
    description: "Elementary level: Improve your understanding of short dialogues.",
  },
  {
    id: "b1",
    title: "Level B1",
    description: "Intermediate: Practice real-life conversations and announcements.",
  },
];

const ListeningOverview = () => {
  return (
    <div className="listening-overview">
      <h1 className="listening-title">🎧 Listening Module</h1>
      <p className="listening-subtitle">
        Practice listening skills with real-life English conversations and activities.
      </p>

      <div className="level-grid">
        {levels.map((level) => (
          <div className="level-card" key={level.id}>
            <h2>{level.title}</h2>
            <p>{level.description}</p>
            <Link to={`/listening/level/${level.id}`} className="start-btn">
              Start Level
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeningOverview;
