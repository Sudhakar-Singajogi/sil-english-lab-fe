import { useEffect, useState, useMemo } from "react";
import { isLessonAssigned } from "../../../../utils/helper";

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
      const assigned = isLessonAssigned(lesson, {
        chapterLessonList,
        assignedTo,
        selectedClass,
        selectedSection,
        startDate,
        recentlyAssigned,
      });

      assignedMap[lesson.lessonId] = assigned;
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
