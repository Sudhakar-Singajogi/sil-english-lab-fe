import { useEffect, useState } from "react";

const useLessons = (level, chapter, allowedChapters, lessonsByChapter, levelChapters) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      if (!chapter) return;

      setIsLoading(true);
      await lessonsByChapter(level, allowedChapters, chapter, levelChapters);
      setIsLoading(false);
    };

    fetchLessons();
  }, [chapter, allowedChapters, lessonsByChapter]);

  return isLoading;
};

export default useLessons;
