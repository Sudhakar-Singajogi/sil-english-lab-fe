import React, { useState, useEffect, useRef } from "react";
import PaginationComponent from "../../PaginationComponent";
import Loader from "../../Loader";
import useIsMobileTabDesktop from "../../hooks/useIsMobileTabDesktop";
import { LessonChapterDetails } from "../../../context/LessonDetailsContext";
import { getTotalPages } from "../../../utils/helper";
import AssignedLessonsHistoryFilter from "./AssignedLessonsHistoryFilter";
import {
  extractUniqueChapters,
  getLessonsByChapter,
} from "./utils/assignedLessonUtils";
import "./AssignedLessonsHistory.css";
import { Button } from "react-bootstrap";

const AssignedLessonsHistory = () => {
  // Store filter criteria for chapter, lesson, class, section, student
  const [filters, setFilters] = useState({
    chapter: { val: "", id: "" },
    lesson: { val: "", id: "" },
    class: { val: "", id: "" },
    section: { val: "", id: "" },
    student: { val: "", id: "" },
  });

  const [showLoader, setShowLoader] = useState(false); // Show loader during data fetch
  const [showFilters, setShowFilters] = useState(false); // Toggle filter panel visibility
  const [chapters, setChapters] = useState([]); // Store all chapters
  const [data, setData] = useState([]); // Full assigned lessons data (all)
  const [filteredData, setFilteredData] = useState([]); // Filtered lessons after applying filters
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [pageSize, setPageSize] = useState(3); // Page size depending on screen
  const [lessons, setLessons] = useState([]); // Lessons tied to a selected chapter
  const whichDevice = useIsMobileTabDesktop(window.innerWidth); // Detect device for pagination adjustment

  const {
    state: { lessonsChapterStats },
    getCachedAssingedChapterLessonsStats,
    getAssingedChapterLessonsStats,
  } = LessonChapterDetails();

  /**
   * Fetch data from context if not already cached.
   * Triggers loader only when data is not in memory.
   */
  useEffect(() => {
    const prevFetchedLessons = getCachedAssingedChapterLessonsStats();
    if (!prevFetchedLessons) {
      setShowLoader(true);
      const allRecrods = true
      getAssingedChapterLessonsStats(allRecrods).finally(() => setShowLoader(false));
    }
  }, []);

  /**
   * Extract assigned lessons from context on every update.
   * Extract unique chapters and initialize lesson data.
   */
  useEffect(() => {
    const stats = getCachedAssingedChapterLessonsStats();
    const recentlyAssigned = stats?.resultData?.recentlyAssigned || [];
    setData(recentlyAssigned);
    setChapters(extractUniqueChapters(recentlyAssigned));
  }, [lessonsChapterStats]);

  /**
   * Update page size dynamically based on screen size
   */
  useEffect(() => {
    if (whichDevice === "desktop") setPageSize(10);
    else if (whichDevice === "tablet") setPageSize(4);
    else setPageSize(2);
  }, [whichDevice]);

  /**
   * Apply filters and paginate whenever data or filters change
   */
  useEffect(() => {
    applyFilters();
  }, [data, filters, currentPage, pageSize]);

  /**
   * Apply filters to lesson data based on selected filters
   * Then slice based on current page and page size for pagination
   */
  const applyFilters = () => {
    let result = [...data];

    const keyMap = {
      chapter: "chapterTitle",
      lesson: "lessonTitle",
      class: "classId",
      section: "section",
      student: "student", // adjust based on schema
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]?.val) {
        const field = keyMap[key] || key;
        result = result.filter((item) =>
          (item[field] || "")
            .toString()
            .toLowerCase()
            .includes(filters[key].val.toLowerCase())
        );
      }
    });

    const paginated = result.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    setFilteredData(paginated);
  };

  /**
   * Generic filter handler to update state with { val, id }
   * Used for chapter, lesson, class, section, student
   */
  const handleFilterChange = (name, value, id) => {
    setFilters((prev) => ({
      ...prev,
      [name]: { val: value, id: id || "" },
    }));
    setCurrentPage(1);
  };

  /**
   * When a chapter is selected:
   * - update filters
   * - reset the lesson filter
   * - extract lessons belonging to selected chapter
   */
  const handleChapterSelect = (chapterTitle, id) => {
    handleFilterChange("chapter", chapterTitle, id);
    handleFilterChange("lesson", "", ""); // Reset lesson filter

    const recentlyAssigned =
      lessonsChapterStats?.resultData?.recentlyAssigned || [];

    const chapterLessons = getLessonsByChapter(recentlyAssigned, id);
    setData(chapterLessons);
    setLessons(chapterLessons);
    setCurrentPage(1);
  };

  /**
   * Resets all filters to initial blank state
   */
  const clearFilters = () => {
    setFilters({
      chapter: { val: "", id: "" },
      lesson: { val: "", id: "" },
      class: { val: "", id: "" },
      section: { val: "", id: "" },
      student: { val: "", id: "" },
    });
    setCurrentPage(1);
  };

  return (
    <div className="assigned-history-container">
      {showLoader && <Loader />}

      <div className="history-header">
        <h2>Assigned Lessons History</h2>
        <div className="filter-toggle-wrapper">
          <Button
            className="btn btn-sm"
            onClick={() => setShowFilters((p) => !p)}
          >
            <i className="bi bi-search"></i> Filter
          </Button>
        </div>
      </div>

      {showFilters && (
        <AssignedLessonsHistoryFilter
          filters={filters}
          chapters={chapters}
          lessons={lessons}
          handleInputChange={(e, id) => {
            handleFilterChange(e.target.name, e.target.value, id);
          }}
          handleChapterSelect={handleChapterSelect}
          clearFilters={clearFilters}
          applyFilters={() => {
            applyFilters();
            setShowFilters((p) => !p);
          }}
          handleFilterChange={handleFilterChange}
        />
      )}

      <div className="assigned-cards-wrapper">
        {filteredData.length === 0 ? (
          <p>No assigned lessons found.</p>
        ) : (
          filteredData.map((item, idx) => (
            <div className="assigned-card" key={idx}>
              <div className="card-row">
                <strong className="assign-label">📘</strong> {item.lessonTitle}
              </div>
              <div className="card-row">
                <strong className="assign-label">📖</strong> {item.chapterTitle}
              </div>
              <div className="card-row">
                <strong className="assign-label">🏫</strong>{" "}
                {item.assignTo === "class"
                  ? item.classId
                  : item.section
                  ? `${item.classId}/${item.section}`
                  : ""}
              </div>
              <div className="card-row">
                <strong className="assign-label">👤</strong>{" "}
                {item.assignTo === "class" ? "All students" : "Few Students"}
              </div>
              <div className="card-row">
                <strong className="assign-label">📅</strong> {item.startDate} to{" "}
                {item.endDate}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="d-flex user-pagination">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={getTotalPages(data.length, pageSize)}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          showPerPageSelector={false}
          showGotoPageSize={false}
        />
      </div>
    </div>
  );
};

export default AssignedLessonsHistory;
