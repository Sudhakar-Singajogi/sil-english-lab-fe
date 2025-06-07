import React, { useEffect, useRef, useState } from "react";
import "./StudentAssignedLessons.css";
import { getTotalPages } from "../../../utils/helper";
import useIsMobileTabDesktop from "../../hooks/useIsMobileTabDesktop";
import PaginationComponent from "../../PaginationComponent";

const studentInfo = {
  name: "Ravi Kumar",
  id: "STU001",
  class: "B2",
  section: "A",
};

const assignedLessons = Array.from({ length: 18 }, (_, i) => ({
  lessonTitle: `Lesson ${i + 1}`,
  chapter: `Chapter ${Math.floor(i / 2) + 1}`,
  assignedDate: `2025-06-${(6 + (i % 3)).toString().padStart(2, "0")}`,
  status: ["Completed", "In Progress", "Not Started"][i % 3],
}));

const StudentAssignedLessons = () => {
  const [showFilters, setShowFilters] = useState(false);
  const whichDevice = useIsMobileTabDesktop(window.innerWidth);
  const [data, setData] = useState([]); // actual assigned history
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filterPanelRef = useRef(null);

  const totalPages = Math.ceil(assignedLessons.length / pageSize);

  const paginatedLessons = assignedLessons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [filters, setFilters] = useState({
    chapter: "",
    lesson: "",
    class: "",
    section: "",
    student: "",
  });

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
    <div className="student-lessons-container">
      <h2>Student's Assigned Lessons</h2>

      {/* Student Info Card */}
      <div className="student-info-card">
        <div>
          <strong>👤 Name:</strong> {studentInfo.name}
        </div>
        <div>
          <strong>ID:</strong> {studentInfo.id}
        </div>
        <div>
          <strong>Class/Section:</strong> {studentInfo.class} /{" "}
          {studentInfo.section}
        </div>
      </div>

      <div className="assigned-cards-wrapper">
        {filteredData.length === 0 ? (
          <p>No assigned lessons found.</p>
        ) : (
          filteredData.map((item, idx) => (
            <div className="assigned-card" key={idx}>
              <div className="card-row">
                {/* <strong>📘 Lesson:</strong> {item.lesson} */}
                <strong className="assign-label" title="Lesson">
                  📘{" "}
                </strong>{" "}
                {item.lesson}
              </div>
              <div className="card-row">
                {/* <strong>📖 Chapter:</strong> {item.chapter} */}
                <strong className="assign-label" title="Chapter">
                  📖{" "}
                </strong>{" "}
                {item.chapter}
              </div>

              <div className="card-row">
                <strong className="assign-label" title="Status">
                  🟢{" "}
                </strong>
                <span className={`status-tag ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="card-row">
                {/* <strong>📅 Assigned:</strong> {item.startDate} to {item.endDate} */}
                <strong className="assign-label" title="Start/End Dates">
                  📅{" "}
                </strong>{" "}
                {item.startDate} to {item.endDate}
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

export default StudentAssignedLessons;
