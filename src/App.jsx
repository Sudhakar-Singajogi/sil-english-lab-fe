// File: /src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import BasicsOfEnglish from './pages/EnglishBasics/BasicsOfEnglish';
import ChapterContentPage from './pages/EnglishBasics/ChapterContentPage';

const App = () => {
  return (
    <>
    <Navbar isLoggedIn={true} />
    <main>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/basics" element={<BasicsOfEnglish />} />
      <Route path="/basics/chapter/:id" element={<ChapterContentPage />} />


    </Routes>
    </main>
      <Footer /> {/* <-- Add this */}
    </>
  );
};

export default App;
