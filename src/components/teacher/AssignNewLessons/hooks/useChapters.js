import { useEffect, useState } from "react";
import { fetchChapterBylevel } from "../../../../service/apiService";

const useChapters = (level, allowedChapters) => {
  const [levelChapters, setLevelChapters] = useState({});
  console.log("allowedChapters is:", allowedChapters);

  useEffect(() => {
    const fetchAndFilterChapters = async () => {
      if (!level || (levelChapters[level] && levelChapters[level].length > 0))
        return;

      const response = await fetchChapterBylevel(level);
      console.log("chapters form response are:", response.chapters);
      if (!response?.chapters || !Array.isArray(response.chapters)) return;

      const filtered = response.chapters.filter((chapter) =>
        allowedChapters?.some((c) => c.id === chapter.id)
      );

      console.log("filtered is:", filtered);
      const structuredChapters = filtered.map((chapter) => {
        const allowed = allowedChapters.find(
          (item) => item.id === chapter.id
        );
        console.log('allowed is ', allowed);

        return {
          chapter,
          lessons: allowed?.lessons || [],
        };
      });

      console.log("structuredChapters are:", structuredChapters);

      setLevelChapters((prev) => ({
        ...prev,
        [level]: structuredChapters,
      }));
    };

    fetchAndFilterChapters();
  }, [level, allowedChapters]);

  return levelChapters;
};

export default useChapters;
