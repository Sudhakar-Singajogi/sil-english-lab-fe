import React from "react";
import AutoSuggest from "../../AutoSuggest";
import "./AssignedLessonsHistoryFilter.css";

/**
 * This component renders the floating filter panel
 * that allows filtering assigned lessons by chapter, lesson, class, section, and student.
 * 
 * Props:
 * - filters: Current filter values for all fields.
 * - chapters: All available chapters for selection.
 * - lessons: All available lessons (usually filtered by selected chapter).
 * - handleInputChange: Handles text input changes (class, section, student).
 * - handleChapterSelect: Triggers when a chapter is selected (also filters lessons).
 * - handleFilterChange: Sets the selected value for any filter field.
 * - clearFilters: Resets all filters to default.
 * - applyFilters: Applies the filters and triggers pagination logic.
 */
const AssignedLessonsHistoryFilter = ({
  filters,
  chapters,
  lessons,
  handleInputChange,
  handleChapterSelect,
  clearFilters,
  handleFilterChange,
  applyFilters,
}) => {
  /**
   * Removes duplicate lessons by title while keeping the first match.
   * This ensures unique lesson options in the AutoSuggest component.
   */
  const uniqueLessons = Array.from(
    new Map(lessons.map((l) => [l.lessonTitle, l])).values()
  );

  return (
    <div className="floating-filter-panel">
      {/* Chapter filter with autosuggest and select */}
      <div className="filter-row">
        <AutoSuggest
          label="Chapter"
          placeholder="Enter chapter"
          value={filters.chapter?.val || ""}
          onChange={(val) => handleFilterChange("chapter", val?.val, val?.id)}
          // When chapter is selected, fetch its lessons
          onSelect={(selected) => handleChapterSelect(selected.val, selected.id)}
          options={chapters.map((c) => ({
            label: c.chapterTitle,
            val: c.chapterTitle,
            id: c.chapterId,
          }))}
        />
      </div>

      {/* Lesson filter with autosuggest */}
      <div className="filter-row">
        <AutoSuggest
          label="Lesson"
          value={filters.lesson?.val || ""}
          onChange={(val) => handleFilterChange("lesson", val?.val, val?.id)}
          onSelect={(opt) => handleFilterChange("lesson", opt?.val, opt?.id)}
          options={uniqueLessons.map((l) => ({
            label: l.lessonTitle,
            val: l.lessonTitle,
            id: l.lessonId,
          }))}
        />
      </div>

      {/* Class input text filter */}
      <div className="filter-row">
        <label>Class</label>
        <input
          type="text"
          name="class"
          value={filters.class?.val || ""}
          onChange={handleInputChange}
          placeholder="Enter class"
        />
      </div>

      {/* Section input text filter */}
      <div className="filter-row">
        <label>Section</label>
        <input
          type="text"
          name="section"
          value={filters.section?.val || ""}
          onChange={handleInputChange}
          placeholder="Enter section"
        />
      </div>

      {/* Student input text filter */}
      <div className="filter-row">
        <label>Student</label>
        <input
          type="text"
          name="student"
          value={filters.student?.val || ""}
          onChange={handleInputChange}
          placeholder="Enter student"
        />
      </div>

      {/* Filter buttons */}
      <div className="filter-actions">
        {/* Resets all filters */}
        <button onClick={clearFilters}>Clear</button>
        {/* Applies filters and closes filter panel */}
        <button onClick={applyFilters}>Apply</button>
      </div>
    </div>
  );
};

export default AssignedLessonsHistoryFilter;
