import { useEffect, useState, useMemo } from "react";

const useAssignedMap = (
  chapter,
  chapterLessons,
  lessonsChapterStats,
  startDate,
  dueDate,
  assignedTo,
  selectedClass,
  selectedSection
) => {
  const [assignedLessons, setAssignedLessons] = useState({});

  const recentlyAssigned = useMemo(
    () => lessonsChapterStats?.resultData?.recentlyAssigned || [],
    [lessonsChapterStats]
  );

  console.log("recentlyAssigned", recentlyAssigned);

  useEffect(() => {
    if (!chapter || !chapterLessons?.[chapter]) {
      setAssignedLessons({});
      return;
    }

    const assignedMap = {};
    const chapterLessonList = chapterLessons[chapter];

    recentlyAssigned.forEach((lesson) => {
      const match = chapterLessonList.find(
        (l) => l.documentId === lesson.lessonId
      );
      if (!match) return;

      let valid = true;

      if (assignedTo) {
        // valid = valid && assignedTo.toLowerCase() === lesson.assignTo;
      }

      if (selectedClass) {
        valid = valid && parseInt(selectedClass) === lesson.classId;
      }

      if (selectedSection && lesson?.section) {
        valid = valid && selectedSection === lesson.section;
      } else {
        valid = valid && valid;
      }
      
      if (startDate) {
        const start = new Date(startDate);
        const due = new Date(lesson.dueDate);
        valid = valid && start <= due;
      }

      if (valid) {
        assignedMap[lesson.lessonId] = true;
      }
    });

    setAssignedLessons(assignedMap);
  }, [
    chapter,
    chapterLessons,
    recentlyAssigned,
    startDate,
    assignedTo,
    selectedClass,
    selectedSection,
  ]);

  return assignedLessons;
};

export default useAssignedMap;
