import React from 'react';
import EachContentBlock from './EachContentBlock';
import './ContentBlock.css';

const ContentBlock = ({ sections }) => {
    console.log('ContentBlock', sections);
  return (
    <div className="content-block">
      {sections.map((section, idx) => (
        <div key={idx} className="content-section">
          <h3 className="section-title">Section {idx + 1} {section.sectionTitle}</h3>
          <div className="section-items">
            {section.steps.map((step, index) => (
              <EachContentBlock key={index} type={step.type} data={step.data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentBlock;
