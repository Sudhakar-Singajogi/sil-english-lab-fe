import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ path }) => {
  return (
    <nav className="breadcrumb">
      {path.map((item, idx) => (
        <span key={idx} className="breadcrumb-item">
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {idx < path.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
