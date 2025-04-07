import React from 'react';
import './NavigationFooter.css';

const NavigationFooter = ({ onPrevious, onNext, isLastStep, onComplete }) => {
  return (
    <div className="navigation-footer">
      <button className="nav-btn" onClick={onPrevious}>
        ← Previous
      </button>

      {isLastStep ? (
        <button className="nav-btn primary" onClick={onComplete}>
          ✅ Complete
        </button>
      ) : (
        <button className="nav-btn" onClick={onNext}>
          Next →
        </button>
      )}
    </div>
  );
};

export default NavigationFooter;
