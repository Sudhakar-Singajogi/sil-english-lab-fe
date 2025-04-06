import React from "react";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  return (
    <div className="relative">
      <button className="bg-white text-black px-4 py-2 rounded">Components of Lab</button>
      <div className="absolute bg-white shadow-md mt-2 rounded z-10">
        <ul className="p-2">
          <li><Link to="/listening">Listening</Link></li>
          <li><Link to="/speaking">Speaking</Link></li>
          <li><Link to="/reading">Reading</Link></li>
          <li><Link to="/writing">Writing</Link></li>
          <li><Link to="/grammar">Grammar</Link></li>
          <li><Link to="/vocabulary">Vocabulary</Link></li>
          <li><Link to="/phonetics">Phonetics</Link></li>
          <li><Link to="/confidence">Confidence Building</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;