// Get unique chapters from recentlyAssigned
export const extractUniqueChapters = (recentlyAssigned = []) => {
  const seen = new Set();
  return recentlyAssigned
    .filter((item) => {
      const key = item.chapterId + item.chapterTitle;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({
      chapterId: item.chapterId,
      chapterTitle: item.chapterTitle,
    }));
};

// Get lessons for a given chapterId
export const getLessonsByChapter = (recentlyAssigned = [], chapterId) => {
  return recentlyAssigned.filter((item) => item.chapterId === chapterId);
};
