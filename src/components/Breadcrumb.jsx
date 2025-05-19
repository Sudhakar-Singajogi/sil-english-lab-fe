// File: src/components/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Breadcrumb.css"; // optional for custom styles

const Breadcrumb = ({ items }) => {
const role = useSelector((state) => state.auth.role);

  return (
    <nav aria-label="breadcrumb" className="mb-1 breadcrumb-nav">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              className={`breadcrumb-item d-flex align-items-center ${
                isLast ? "active" : ""
              }`}
              aria-current={isLast ? "page" : undefined}
            >
              {item.icon && <i className={`me-1 ${item.icon}`}></i>}
              {isLast ? (
                <span>{item.label}</span>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
