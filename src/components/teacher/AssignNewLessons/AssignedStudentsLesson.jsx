import React, { useState } from "react";
import "./AssignedStudentsLesson.css";
import PaginationComponent from "../../PaginationComponent";
import { getTotalPages } from "../../../utils/helper";

const mockStudents = [
  { Student: "Ravi", ID: "STU001", AssignedDate: "08-06-2025", Progress: "Not Started" },
  { Student: "Anya", ID: "STU002", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Priya", ID: "STU003", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Manoj", ID: "STU004", AssignedDate: "07-06-2025", Progress: "In Progress" },
  { Student: "Rakesh", ID: "STU005", AssignedDate: "07-06-2025", Progress: "In Progress" },
  { Student: "Neha", ID: "STU006", AssignedDate: "07-06-2025", Progress: "Not Started" },
  { Student: "Vikram", ID: "STU007", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Sneha", ID: "STU008", AssignedDate: "07-06-2025", Progress: "In Progress" },
  { Student: "Tarun", ID: "STU009", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Asha", ID: "STU010", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Kunal", ID: "STU011", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Divya", ID: "STU012", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Arjun", ID: "STU013", AssignedDate: "08-06-2025", Progress: "Not Started" },
  { Student: "Meena", ID: "STU014", AssignedDate: "07-06-2025", Progress: "Not Started" },
  { Student: "Karthik", ID: "STU015", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Rani", ID: "STU016", AssignedDate: "07-06-2025", Progress: "Not Started" },
  { Student: "Sanjay", ID: "STU017", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Pooja", ID: "STU018", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Rahul", ID: "STU019", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Nisha", ID: "STU020", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Varun", ID: "STU021", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Deepa", ID: "STU022", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Amit", ID: "STU023", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Kiran", ID: "STU024", AssignedDate: "08-06-2025", Progress: "Not Started" },
  { Student: "Gauri", ID: "STU025", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Rohan", ID: "STU026", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Sunita", ID: "STU027", AssignedDate: "08-06-2025", Progress: "Not Started" },
  { Student: "Ishaan", ID: "STU028", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Lavanya", ID: "STU029", AssignedDate: "08-06-2025", Progress: "Completed" },
  { Student: "Dev", ID: "STU030", AssignedDate: "06-06-2025", Progress: "In Progress" },
  { Student: "Harsha", ID: "STU031", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Tanya", ID: "STU032", AssignedDate: "08-06-2025", Progress: "Not Started" },
  { Student: "Naveen", ID: "STU033", AssignedDate: "07-06-2025", Progress: "Completed" },
  { Student: "Jaya", ID: "STU034", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Yash", ID: "STU035", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Kavya", ID: "STU036", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Surya", ID: "STU037", AssignedDate: "06-06-2025", Progress: "Not Started" },
  { Student: "Bina", ID: "STU038", AssignedDate: "06-06-2025", Progress: "Completed" },
  { Student: "Tejas", ID: "STU039", AssignedDate: "06-06-2025", Progress: "In Progress" },
  { Student: "Maya", ID: "STU040", AssignedDate: "07-06-2025", Progress: "Completed" }
];

const AssignedStudentsLesson = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(mockStudents.length / pageSize);

  const paginatedData = mockStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="assigned-lesson-container">
      <h2>Assigned Lesson - Student Progress</h2>
      <div className="student-cards-wrapper">
        {paginatedData.map((student, idx) => (
          <div className="student-card" key={idx}>
            <div><strong>👤 {student.Student}</strong> ({student.ID})</div>
            <div>📅 Assigned: {student.AssignedDate}</div>
            <div>
              📊 Progress:{" "}
              <span className={`status-tag ${student.Progress.toLowerCase().replace(" ", "-")}`}>
                {student.Progress}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex user-pagination">
              <PaginationComponent
                currentPage={1}
                totalPages={getTotalPages(mockStudents.length, pageSize)}
                onPageChange={(page) => {}}
                pageSize={pageSize}
                onPageSizeChange={(size) => {}}
                showPerPageSelector={false}
                showGotoPageSize={false}
              />
            </div>

{/* 
      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ◀ Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div> */}
    </div>
  );
};

export default AssignedStudentsLesson;
