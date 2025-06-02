import { useEffect, useState } from "react";
import { fetchChapterBylevel } from "../../../../service/apiService"; 

const useChapters = (level, allowedChapters) => {
  const [levelChapters, setLevelChapters] = useState({});

  useEffect(() => {
    const fetchAndFilterChapters = async () => {
      if (!level || (levelChapters[level] && levelChapters[level].length > 0)) return;

      const response = await fetchChapterBylevel(level);
      if (!response?.chapters || !Array.isArray(response.chapters)) return;

      const filtered = response.chapters.filter((chapter) =>
        allowedChapters?.some((c) => c.chapterId === chapter.documentId)
      );

      setLevelChapters((prev) => ({
        ...prev,
        [level]: filtered,
      }));
    };

    fetchAndFilterChapters();
  }, [level, allowedChapters]);

  return levelChapters;
};

export default useChapters;
