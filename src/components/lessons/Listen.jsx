// File: Listen.jsx
import React from "react";
import "./Listen.css";

const Listen = ({ transcript }) => {
  return (
    <div className="listen-container fade-in">
      <div className="listen-actions mt-3">
        <button className="btn btn-outline-primary" title="Listen">
          <i class="bi bi-headset"></i> <span>Listen</span>
        </button>
        <button className="btn btn-outline-secondary" title="Repeat">
          <i class="bi bi-arrow-repeat"></i> <span>Repeat</span>
        </button>
        <button className="btn btn-outline-info" title="Play role 1">
          <i class="bi bi-person-fill"></i> <span>Play Role 1</span>
        </button>
        <button className="btn btn-outline-info" title="Play role 2">
          <i class="bi bi-person-bounding-box"></i> <span>Play Role 2</span>
        </button>
      </div>
      <div className="listen-media">
        <div className="listen-video">
          {/* Replace with actual video/audio */}
          <video controls width="100%">
            <source src="/assets/audio/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="listen-transcript">
        <h5>Transcript</h5>
        <div className="transcript-content">
          {transcript?.map((line, idx) => <p key={idx}>{line}</p>) || (
            <p>Transcript will appear here.</p>
          )}
        </div>
      </div>

      <div className="mt-2">
        <button className="btn btn-dark btn-lg btn-sm">Go to Exercise</button>
      </div>
    </div>
  );
};

export default Listen;
