import { useEffect, useState } from "react";

const useLessons = (chapter, allowedChapters, lessonsByChapter) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      if (!chapter) return;

      setIsLoading(true);
      await lessonsByChapter(allowedChapters, chapter);
      setIsLoading(false);
    };

    fetchLessons();
  }, [chapter, allowedChapters, lessonsByChapter]);

  return isLoading;
};

export default useLessons;
