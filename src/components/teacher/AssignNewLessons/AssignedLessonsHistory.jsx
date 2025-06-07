import React, { useState, useEffect, useRef } from "react";
import PaginationComponent from "../../PaginationComponent";
import AdvancedGrid from "../../Grid/Advancedgrid";
import "./AssignedLessonsHistory.css"; // We'll create matching styles
import { Button, Form } from "react-bootstrap";
import { getAssignedLessonsCols } from "../../GridColumns/assignedLessons";
import useIsMobileTabDesktop from "../../hooks/useIsMobileTabDesktop";
import { getTotalPages } from "../../../utils/helper";

const AssignedLessonsHistory = () => {
  const [filters, setFilters] = useState({
    chapter: "",
    lesson: "",
    class: "",
    section: "",
    student: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const whichDevice = useIsMobileTabDesktop(window.innerWidth);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filterPanelRef = useRef(null);

  const [data, setData] = useState([]); // actual assigned history
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    applyFilters();
  }, [filters, data, currentPage, pageSize]);

  useEffect(() => {
    setData(mockData); // replace with real API call

    if (whichDevice === "desktop") {
      setPageSize(10);
    } else if (whichDevice === "tablet") {
      setPageSize(4);
    } else {
      setPageSize(2);
    }

    applyFilters();
  }, [whichDevice]);

  const applyFilters = () => {
    let result = [...data];
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        result = result.filter((item) =>
          item[key].toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    console.log("pageSize is", pageSize);

    const paginated = result.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    setFilteredData(paginated);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // reset to first page on filter
  };

  const clearFilters = () => {
    setFilters({
      chapter: "",
      lesson: "",
      class: "",
      section: "",
      student: "",
    });
    setCurrentPage(1);
  };
  

  return (
    <div className="assigned-history-container">
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr" }}
        className="history-header"
      >
        <div>
          <h2>Assigned Lessons History</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="filter-toggle-wrapper">
            <Button className="btn btn-sm" onClick={toggleFilters}>
              <i className="bi bi-search"></i> Filter
            </Button>

            {/* Floating Filter Panel */}
            {showFilters && (
              <div className="floating-filter-panel" ref={filterPanelRef}>
                <div className="filter-row">
                  <label>Chapter</label>
                  <input
                    type="text"
                    name="chapter"
                    value={filters.chapter}
                    onChange={handleInputChange}
                    placeholder="Enter chapter"
                  />
                </div>
                <div className="filter-row">
                  <label>Lesson</label>
                  <input
                    type="text"
                    name="lesson"
                    value={filters.lesson}
                    onChange={handleInputChange}
                    placeholder="Enter lesson"
                  />
                </div>
                <div className="filter-row">
                  <label>Class</label>
                  <input
                    type="text"
                    name="class"
                    value={filters.class}
                    onChange={handleInputChange}
                    placeholder="Enter class"
                  />
                </div>
                <div className="filter-row">
                  <label>Section</label>
                  <input
                    type="text"
                    name="section"
                    value={filters.section}
                    onChange={handleInputChange}
                    placeholder="Enter section"
                  />
                </div>
                <div className="filter-row">
                  <label>Student</label>
                  <input
                    type="text"
                    name="student"
                    value={filters.student}
                    onChange={handleInputChange}
                    placeholder="Enter student"
                  />
                </div>

                <div className="filter-actions">
                  <button onClick={clearFilters}>Clear</button>
                  <button onClick={applyFilters}>Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toggle Button */}

      {/* Assigned Lesson Cards */}
      <div className="assigned-cards-wrapper">
        {filteredData.length === 0 ? (
          <p>No assigned lessons found.</p>
        ) : (
          filteredData.map((item, idx) => (
            <div className="assigned-card" key={idx}>
              <div className="card-row">
                {/* <strong>📘 Lesson:</strong> {item.lesson} */}
                <strong className="assign-label" title="Lesson">📘 </strong> {item.lesson}
              </div>
              <div className="card-row">
                {/* <strong>📖 Chapter:</strong> {item.chapter} */}
                <strong className="assign-label" title="Chapter">📖 </strong> {item.chapter}
              </div>
              <div className="card-row">
                {/* <strong>🏫 Class/Section:</strong> {item.class} / {item.section} */}
                <strong className="assign-label" title="Class/Section">🏫 </strong> {item.class} / {item.section}
              </div>
              <div className="card-row">
                {/* <strong>👤 Student:</strong> {item.student} */}
                <strong className="assign-label" title="Student">👤 </strong> {item.student}
              </div>
              <div className="card-row">
                <strong className="assign-label" title="Status">🟢 </strong>
                <span className={`status-tag ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="card-row">
                {/* <strong>📅 Assigned:</strong> {item.startDate} to {item.endDate} */}
                <strong className="assign-label" title="Start/End Dates">📅 </strong> {item.startDate} to {item.endDate}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="d-flex user-pagination">
        <PaginationComponent
          currentPage={1}
          totalPages={getTotalPages(mockData.length, pageSize)}
          onPageChange={(page) => {}}
          pageSize={pageSize}
          onPageSizeChange={(size) => {}}
          showPerPageSelector={false}
          showGotoPageSize={false}
        />
      </div>
    </div>
  );
};

// Temporary mock data
const mockData = [
  {
    lesson: "Applying Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Ravi",
    assignedBy: "Kiran",
    status: "Completed",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Arun",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Applying Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Ravi",
    assignedBy: "Kiran",
    status: "Completed",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Arun",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Rushan",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Rushan",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Applying Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Ravi",
    assignedBy: "Kiran",
    status: "Completed",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Arun",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Applying Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Ravi",
    assignedBy: "Kiran",
    status: "Completed",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Arun",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Rushan",
    assignedBy: "Kiran",
    status: "Pending",
  },
  {
    lesson: "Introduction to Psychological Theories",
    chapter: "Chapter 27",
    class: "B2",
    section: "A",
    student: "Rushan",
    assignedBy: "Kiran",
    status: "Pending",
  },
];

export default AssignedLessonsHistory;
