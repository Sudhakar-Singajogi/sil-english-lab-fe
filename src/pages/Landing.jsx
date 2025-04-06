import React from 'react';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to English Lab</h1>
        <p className="mt-2 text-lg">Learn English and sharpen your skills!</p>
      </div>
    </div>
  );
};

export default Landing;
