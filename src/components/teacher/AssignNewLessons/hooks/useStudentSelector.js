// New hook: useStudentSelector.js
import { useState, useCallback } from "react";

const useStudentSelector = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSec, setSelectedSec] = useState("");
  const [students, setStudents] = useState([]); // raw student list
  const [selectedStudents, setSelectedStudents] = useState([]); // selected IDs

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleSectionChange = async (section) => {
    setSelectedSec(section);
    // Fetch students (replace with your actual service call)
    const response = await fetch(`/api/students?section=${section}`);
    const data = await response.json();
    setStudents(data);
  };

  const toggleStudent = useCallback((id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  }, []);

  const reset = () => {
    setSelectedSec("");
    setStudents([]);
    setSelectedStudents([]);
  };

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    selectedSec,
    setSelectedSec: handleSectionChange,
    students,
    selectedStudents,
    toggleStudent,
    reset,
  };
};

export default useStudentSelector;
