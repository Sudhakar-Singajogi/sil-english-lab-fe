import { useRef } from "react";
import axios from "axios";

export const getTotalPages = function (totalResults, perPage) {
  console.log(totalResults, perPage)
  if (perPage <= 0) return 0;
  return Math.ceil(totalResults / perPage);
};

export const useCachedRequest = () => {
  const cache = useRef({});

  const sendRequest = async (url, payload) => {
    const key = `${url}_${JSON.stringify(payload)}`;
    if (cache.current[key]) return cache.current[key];

    const response = await axios.post(url, payload);
    cache.current[key] = response;
    return response;
  };

  return sendRequest;
};

export function isFeatureAllowed({ role, feature, allowedFeatures }) {
  if (role === "system-admin") return true;
  if (!feature || !allowedFeatures || !Array.isArray(allowedFeatures))
    return false;
  return allowedFeatures.includes(feature);
}

export const formatTimeStateIntoDate = (timestamp) => {
  if (!timestamp?._seconds) return "";

  const date = new Date(timestamp._seconds * 1000);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};

export function isLessonAssigned(
  lesson,
  {
    chapterLessonList,
    assignedTo,
    selectedClass,
    selectedSection,
    startDate,
    recentlyAssigned,
  },
  returnStudents = false
) {
  let valid = true;

  const match = chapterLessonList.find((l) => l.documentId === lesson.lessonId);
  if (!match) return returnStudents ? [] : false;

  if (selectedClass) {
    valid = valid && parseInt(selectedClass) === lesson.classId;
  }

  if (selectedSection && lesson?.section) {
    valid = valid && selectedSection === lesson.section;
  }

  if (startDate) {
    const start = new Date(startDate);
    const due = new Date(lesson.dueDate);
    valid = valid && start <= due;
  }

  if (!valid) return false;
  console.log("lesson Info:", lesson);

  if (selectedClass) {
    const classLevelconflicting = recentlyAssigned.filter(
      (l) =>
        l.assignTo === "class" &&
        l.classId === parseInt(selectedClass) &&
        lesson.lessonId === l.lessonId &&
        (!selectedSection || l.section === selectedSection) &&
        new Date(l.startDate) <= new Date(l.dueDate)
    );

    console.log("classLevelconflicting array is:", classLevelconflicting);

    if (classLevelconflicting?.lessonId === lesson.lessonId) {
      return returnStudents ? [] : classLevelconflicting.length === 0;
    }

    const studentLevelconflicting = recentlyAssigned.filter(
      (l) =>
        l.assignTo === "students" &&
        l.classId === parseInt(selectedClass) &&
        lesson.lessonId === l.lessonId &&
        (!selectedSection || l.section === selectedSection) &&
        new Date(l.startDate) <= new Date(l.dueDate)
    );
    let stdConflictStds = [];
    console.log('studentLevelconflicting is', studentLevelconflicting)

    if (Array.isArray(studentLevelconflicting)) {
      stdConflictStds = studentLevelconflicting
      stdConflictStds = [...stdConflictStds]
    } else {
      stdConflictStds = [...studentLevelconflicting]
    }

    console.log('studentLevelconflicting are', stdConflictStds)
    

    return returnStudents ? stdConflictStds : stdConflictStds.length === 0;
  }

  return returnStudents ? [] : true;
}

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
