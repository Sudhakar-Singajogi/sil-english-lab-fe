// File: /src/App.jsx
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from "./routes";

const App = () => {
  return (
    <>
      {/* <Navbar isLoggedIn={true} /> */}
      <main>
        {/* <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/basics" element={<BasicsOfEnglish />} />
      <Route path="/basics/chapter/:id" element={<ChapterContentPage />} /> 
      

    </Routes> */} 
          <AppRoutes /> 
          <ToastContainer position="top-right" autoClose={3000} />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
