import React, { useState } from "react";

import ChapterHeader from "../../components/BasicsOfEnglish/ChapterHeader";
import ContentBlock from "../../components/ContentBlock";
import ProgressTracker from "../../components/ProgressTracker";
import NavigationFooter from "../../components/NavigationFooter";
import chapter1Content from "../../mock-data/chapter1Content";
import ProgressBar from "../../components/ProgressBar";
import './ChapterContentPage.css'
import Breadcrumb from "../../components/Breadcrumb";

const contentSteps = chapter1Content;

const ChapterContentPage = () => {
  const hash = window.location.hash; // "#/basics/chapter/1"
const parts = hash.split('/');
const chapterId = parts[parts.length - 1]; // "1"

  const breadcrumbPath = [
    { label: 'Home', to: '/' },
    { label: 'Basics of English', to:'/basics' },
    { label: `Chapter-${chapterId}`, },

  ];

  const [currentStep, setCurrentStep] = useState(0); 
  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < contentSteps.length - 1)
      setCurrentStep((prev) => prev + 1);
  };

  const handleComplete = () => {
    alert("🎉 Chapter completed!");
  };

  return (
    <>
    <div className="chapter-content-page">
    <Breadcrumb path={breadcrumbPath} />
      <ChapterHeader
        step={currentStep}
        icon={`${import.meta.env.BASE_URL}assets/icons/hello-handshake.svg`}
        title={contentSteps[currentStep].title}
        description={contentSteps[currentStep].description}
        chapterId={chapterId}
      />
      <div className="chapter-progress">
        <ProgressBar percentage={30} showProgressLabel={true} />
      </div>
      <div className='padding-1rem'> &nbsp;</div>
      {/* <ContentBlock questions={contentSteps[currentStep].steps} /> */}
      <ContentBlock sections={contentSteps[currentStep].sections} />


      <NavigationFooter
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLastStep={currentStep === contentSteps.length - 1}
        onComplete={handleComplete}
      />
      {/* <ProgressTracker current={currentStep + 1} total={contentSteps.length} /> */}
    </div>
    </>
  );
};

export default ChapterContentPage;
