import React, { useState } from "react";
import "./AssignLessonsChapters.css";
import AssignNewLessons from "./AssignNewLessons";

const AssignLessonsChapters = () => {
  const [filters, setFilters] = useState({
    school: "",
    class: "",
    section: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    // Dispatch redux action here to fetch students & assignments
  };

  return (
    <div className="container-fluid assign-lessons-page">
      <h5 className="mb-4">Assign Lessons & Chapters</h5>

      {/* Filter Section */}
      <div className="row g-3 align-items-end mb-4">
        <div className="col-md-2">
          <label className="form-label">School</label>
          <select
            className="form-select w-100"
            name="school"
            value={filters.school}
            onChange={handleFilterChange}
          >
            <option value="">Select</option>
            <option>BOSH MODEL School</option>
            {/* Add dynamic school list */}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Class</label>
          <select
            className="form-select w-100"
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="">Select</option>
            <option>10</option>
            <option>9</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Section</label>
          <select
            className="form-select w-100"
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="">Select</option>
            <option>10</option>
            <option>9</option>
          </select>
        </div>
      </div>

      {/* Assigned Info Card */}
      <div className="row mb-2">
        <div className="card shadow-sm recent-assigned-section">
          <div>
            <div className="card-body teacher-card">
              <div className="avatar">
                <img
                  src="/assets/icons/teacher-female.svg"
                  className="assign-student-avatar teacher-avatar"
                />
              </div>
                <h5 className="card-title">Aditi Sharma</h5>
              <div className="teacher-info">
                <span className="badge bg-warning text-dark mb-2">
                  Currently Assigned
                </span>
                <p>
                  Total Lessons: <strong>4</strong>
                </p>
                <p>
                  Assigned Chapters: <strong>3</strong>
                </p>
                <p>
                  Assigned By: <strong>Teacher X</strong>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="card-body recent-assign-lesson-body">
              <h6 className="recently-assigned-title">
                Recently Assigned Lessons
              </h6>
              <div className="table-responsive">
                <table className="table table-bordered table-sm recently-assigned-grid">
                  <thead className="table-light">
                    <tr>
                      <th>Lesson Name</th>
                      <th>Chapter</th>
                      <th>Assigned On</th>
                      <th>Status</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Greeting Words</td>
                      <td>Chapter 1</td>
                      <td>12 May</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          In Progress
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn btn-outline-primary btn-sm me-1">
                          Reassign
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Remove
                        </button>
                      </td> */}
                    </tr>
                    <tr>
                      <td>Greeting Words</td>
                      <td>Chapter 1</td>
                      <td>12 May</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          In Progress
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn btn-outline-primary btn-sm me-1">
                          Reassign
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Remove
                        </button>
                      </td> */}
                    </tr>
                    <tr>
                      <td>Greeting Words</td>
                      <td>Chapter 1</td>
                      <td>12 May</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          In Progress
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn btn-outline-primary btn-sm me-1">
                          Reassign
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Remove
                        </button>
                      </td> */}
                    </tr>
                    <tr>
                      <td>Greeting Words</td>
                      <td>Chapter 1</td>
                      <td>12 May</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          In Progress
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn btn-outline-primary btn-sm me-1">
                          Reassign
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Remove
                        </button>
                      </td> */}
                    </tr>
                    <tr>
                      <td>Greeting Words</td>
                      <td>Chapter 1</td>
                      <td>12 May</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          In Progress
                        </span>
                      </td>
                      {/* <td>
                        <button className="btn btn-outline-primary btn-sm me-1">
                          Reassign
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Remove
                        </button>
                      </td> */}
                    </tr>

                    {/* Map more rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <AssignNewLessons />
      </div>
    </div>
  );
};

export default AssignLessonsChapters;
