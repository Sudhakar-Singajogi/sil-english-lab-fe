import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';

const Carousel = ({ slides = [], interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => resetTimeout();
  }, [currentIndex, slides.length, interval]);

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.image} alt={slide.title} />
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              {slide.buttonText && (
                <button onClick={slide.onClick}>{slide.buttonText}</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
