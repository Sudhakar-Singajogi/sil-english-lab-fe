/*import React from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="progress-tracker">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-label">
        Step {current} of {total}
      </div>
    </div>
  );
};

export default ProgressTracker;

*/

import React from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ current, total }) => {
  return (
    <div className="progress-tracker">
      {[...Array(total)].map((_, idx) => (
        <div
          key={idx}
          className={`tracker-dot ${idx < current ? 'active' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressTracker;
