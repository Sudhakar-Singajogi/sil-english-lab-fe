import React from 'react';
import HomeBannerCarousel from './HomeBannerCarousel';

import { Link } from 'react-router-dom';
import './Home.css';
import AudioPlayer from '../components/AudioPlayer';

const modules = [
  {
    title: "Basics of English",
    description: "Start learning alphabets, greetings, and simple sentences.",
    route: "/basics",
    icon: "📘"
  },
  {
    title: "Listening",
    description: "Practice listening with everyday English conversations.",
    route: "/listening",
    icon: "🎧"
  },
  {
    title: "Speaking",
    description: "Improve your pronunciation and speaking fluency.",
    route: "/speaking",
    icon: "🗣️"
  },
  {
    title: "Reading",
    description: "Enhance comprehension skills with reading exercises.",
    route: "/reading",
    icon: "📖"
  },
  {
    title: "Writing",
    description: "Learn to write correctly and express your thoughts.",
    route: "/writing",
    icon: "✍️"
  },
  {
    title: "Grammar",
    description: "Master English grammar rules and usage.",
    route: "/grammar",
    icon: "📚"
  },
  {
    title: "Vocabulary",
    description: "Expand your word bank and use them in sentences.",
    route: "/vocabulary",
    icon: "🧠"
  },
  {
    title: "Phonetics",
    description: "Understand sound patterns and phonetic symbols.",
    route: "/phonetics",
    icon: "🔤"
  },
  {
    title: "Confidence Building",
    description: "Boost your confidence with guided activities.",
    route: "/confidence",
    icon: "💪"
  },
  {
    title: "Analytical Thinking",
    description: "Sharpen reasoning with puzzles and logic challenges.",
    route: "/analytical-thinking",
    icon: "🧩"
  }
];

const Home = () => {
  return (
    <>
      <HomeBannerCarousel />
      <div className="home-wrapper">
        <div className="home-header">
          <h1 className="home-title">Welcome to English Lab</h1>
          {
            <AudioPlayer />
          }
          <p className="home-subtitle">Explore modules to improve your English and cognitive skills.</p>
          <Link to="/basics">
            <button className="cta-button">Start Learning</button>
          </Link>
        </div>

        <div className="module-grid">
          {modules.map((mod, idx) => (
            <Link to={mod.route} key={idx} className="module-card">
              <div className="module-icon">{mod.icon}</div>
              <div className="module-content">
                <h2 className="module-title">{mod.title}</h2>
                <p className="module-description">{mod.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Home;