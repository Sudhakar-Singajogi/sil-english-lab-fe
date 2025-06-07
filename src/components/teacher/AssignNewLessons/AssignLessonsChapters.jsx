import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AssignLessonsChapters.css";
import AssignNewLessons from "./AssignNewLessons";
import { LessonChapterDetails } from "../../../context/LessonDetailsContext";
import { formatTimeStateIntoDate } from "../../../utils/helper";
import { Button, ButtonGroup } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import ConfirmDialog from "../../alerts/ConfirmDialog";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Loader from "../../Loader";

const AssignLessonsChapters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    school: "",
    class: "",
    section: "",
  });
  const role = useSelector((state) => state.auth.role);
  const { fullName: userName } = useSelector((state) => state.auth.user);

  const {
    state: { lessonsChapterStats },
    getAssingedChapterLessonsStats,
    deleteAssignedLesson,
  } = LessonChapterDetails();
  const [showConfirm, setShowConfirm] = useState(false);
  const [assignLessonIdToDelete, setAssignLessonIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { chaptersDetails, lessonsDetails, dispatch: lessonDispatcher } = LessonChapterDetails();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const assingedChapterLessonsStats = async () => {
      await getAssingedChapterLessonsStats();
    };
    assingedChapterLessonsStats();
  }, []);

  const delAssignedLesson = (lessonId) => {
    setAssignLessonIdToDelete(lessonId);
    setShowConfirm(true);
    setIsLoading(true);
  };
  const handleConfirmDelete = async () => {
    const resp = await deleteAssignedLesson(assignLessonIdToDelete);
    if (resp) {
      setShowConfirm(false);
      toast.success("Assigned Lesson deleted successfully");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  let pathprefix = "/teacher";

  return (
    <div className="container-fluid assign-lessons-page">
      {/* <h5 className="mb-4">Assign Lessons & Chapters</h5> */}
      <div className="d-flex gap-4 mb-3">
        <h6>
          <img
            src="/assets/icons/chapter-book.svg"
            width="25px"
            height="25px"
          />
          Assigned Chapters{" "}
          <Badge bg="info ">
            {lessonsChapterStats?.resultData?.assignedStats
              ?.totalChaptersAssigned ?? 0}
          </Badge>
        </h6>
        <h6>
          <img src="/assets/icons/lesson-book.svg" width="25px" height="25px" />
          Assigned Lessons{" "}
          <Badge bg="secondary">
            {lessonsChapterStats?.resultData?.assignedStats
              ?.totalLessonAssinged ?? 0}
          </Badge>
        </h6>
      </div>

      {/* Filter Section */}
      <div className="row g-3 align-items-end mb-4">
        {role === "system-admin" && (
          <div className="">
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
        )}
      </div>

      {/* Assigned Info Card */}
      <div className="row mb-2">
        <div className="card shadow-sm recent-assigned-section">
          <div className="card-body recent-assign-lesson-body">
            <div
              className="recent-assign-lesson-body-header"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.5fr",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <h5 className="recently-assigned-title">
                  Recently Assigned Lessons
                </h5>
              </div>
              <div style={{ textAlign: "right", marginRight: "0rem" }}>
                <NavLink
                  to={pathprefix + "/assign-lessons-history"}
                  key={pathprefix + "/assign-lessons-history"}
                  className="btn btn-sm"
                >
                  <i class="bi bi-eye"></i> View More
                </NavLink>

                {/* < className="btn btn-sm">
                  <i class="bi bi-eye"></i> View More
                </Button> */}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-sm recently-assigned-grid">
                <thead className="table-light">
                  <tr>
                    <th>Level</th>
                    <th>Chapter</th>
                    <th>Lesson Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Status</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessonsChapterStats &&
                    lessonsChapterStats?.resultData?.recentlyAssigned &&
                    lessonsChapterStats?.resultData?.recentlyAssigned.map(
                      (lesson, index) => (
                        <>
                          {index < 5 && (
                            <tr
                              key={`recently-assigned-lesson-${lesson?.documentId}`}
                            >
                              <td>{lesson?.level}</td>
                              <td>{lesson?.chapterTitle}</td>
                              <td>{lesson?.lessonTitle}</td>
                              <td>{lesson?.startDate}</td>
                              <td>{lesson?.dueDate}</td>
                              <td className="assigned-lesson-actions">
                                {/* <span className="badge bg-info text-dark">
                                In Progress
                              </span> */}
                                <span>
                                  <i
                                    className="bi bi-trash3 del-assinged-lesson"
                                    onClick={() =>
                                      delAssignedLesson(lesson?.documentId)
                                    }
                                  ></i>
                                </span>
                                <span>
                                  <i
                                    className="bi bi-check-circle"
                                    title="Mark as complete"
                                  ></i>
                                </span>
                              </td>
                            </tr>
                          )}
                        </>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="row mb-2">
        <AssignNewLessons lessonsChapterStats={lessonsChapterStats} />
      </div>

      <ConfirmDialog
        show={showConfirm}
        message="Are you sure to delete this lesson?"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setIsLoading(false);
        }}
      />

      {isLoading && <Loader />}
    </div>
  );
};

export default AssignLessonsChapters;
