import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  fetchAChapter,
  fetchLessonsByChapter,
  assignedChapLessStats,
  callDeleteAPI
} from "../service/apiService";

const LessonDetailsContext = createContext();

const initialState = {
  lesson: null,
  chaptersDetails: {},
  lessonsDetails: {},
  chapterLessons: null,
  lessonsIds: null,
  lessonsChapterStats: null,
};

const fetchLesson = async (lessonId) => {
  // Simulate a network delay
  await new Promise((res) => setTimeout(res, 300));

  // Static mock lesson
  return {
    id: lessonId,
    number: 3,
    title: "Greetings & Introductions",
    intro: "Learn how to greet others and introduce yourself in English.",
    cefr: "A1",
    duration: "10 mins",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    // You can extend this later with read/speak/vocab/etc. data
  };
};

const lessonDetailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LESSON":
      return {
        ...state,
        lesson: action.payload,
      };
    case "SET_LESSONS_BY_CHAPTER":
      return {
        ...state,
        chaptersDetails: {
          ...state.chaptersDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_CHAPTER_LESSON_IDS":
      return {
        ...state,
        lessonsIds: {
          ...state.lessonsIds,
          [action.payload.chapterId]: action.payload.lessonIds,
        },
      };
    case "SET_CHAPTER_LESSONS":
      return {
        ...state,
        chapterLessons: {
          ...state.chapterLessons,
          [action.payload.chapterId]: action.payload.lessons,
        },
      };
    case "RESET_LESSON_DETAILS":
      return {
        ...state,
        chaptersDetails: {},
        lessonsDetails: {},
        chapterLessons: null,
        lessonsIds: null,
      };
    case "LESSONS_BY_CHAPTER_STATS":
      return {
        ...state,
        lessonsChapterStats: action.payload,
      };

    default:
      return state;
  }
};

export const LessonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lessonDetailsReducer, initialState);
  const fetchAndSetLesson = async (lessonId) => {
    const lessonData = await fetchLesson(lessonId);
    console.log("lessonData is", lessonData);
    dispatch({ type: "SET_LESSON", payload: lessonData });
  };

  const getChapterDetails = async (chapterId) => {
    const existing = state.chaptersDetails[chapterId];
    if (existing) {
      console.log("existing is", existing);
      return existing;
    }

    const chapterData = await fetchAChapter(chapterId);
    console.log("chapterData is", chapterData);
    dispatch({ type: "SET_CHAPTER_DETAILS", payload: chapterData });
    return chapterData;
  };

  const lessonsByChapter = useCallback(
    async (allowedChapters, chapterId) => {
      const resp = await fetchLessonsByChapter(chapterId);

      if (resp.resultData.length > 0) {
        // Step 1: Get allowedLessons for the selected chapterId from Redux
        const allowed = allowedChapters.find((c) => c.chapterId === chapterId);
        const allowedLessonIds =
          allowed?.allowedLessons?.map((l) => l.lessonId) || [];

        // Step 2: Filter lessons from API to include only allowed ones
        const filteredLessons = resp.resultData.filter((lesson) =>
          allowedLessonIds.includes(lesson.documentId)
        );

        if (filteredLessons.length > 0) {
          const ids = filteredLessons.map((lesson) => lesson.documentId);

          dispatch({
            type: "SET_CHAPTER_LESSON_IDS",
            payload: { chapterId, lessonIds: ids },
          });

          dispatch({
            type: "SET_CHAPTER_LESSONS",
            payload: { chapterId, lessons: filteredLessons },
          });
        }

        console.log("Filtered lessons response:", filteredLessons);
      }
    },
    [dispatch]
  );

  const resetChapterLessons = () => dispatch({ type: "RESET_LESSON_DETAILS" });

  const getAssingedChapterLessonsStats = async () => {
    let resp = await assignedChapLessStats();

    if (resp.resultData.length === 0) {
      resp = {
        resultData: {
          recentlyAssigned: [],
          assignedStats: { totalChaptersAssigned: 0, totalLessonAssinged: 0 },
        },
        resultTotal: 0,
        totalRows: 0,
        hasMore: false,
      };
    }

    console.log("stats are:", resp);

    dispatch({ type: "LESSONS_BY_CHAPTER_STATS", payload: resp });
  };

  const getCachedAssingedChapterLessonsStats = () => state.lessonsChapterStats;

  const deleteAssignedLesson  = async(assignLessonId) => {

     const delResp = await callDeleteAPI(`/assignlessons/delete/${assignLessonId}`);
     console.log("delResp is", delResp);

     if(delResp.success){
      getAssingedChapterLessonsStats();
      return true;
     }
     return false;

  }

  const value = useMemo(
    () => ({
      state,
      dispatch,
      fetchAndSetLesson,
      getChapterDetails,
      lessonsByChapter,
      resetChapterLessons,
      getAssingedChapterLessonsStats,
      deleteAssignedLesson,
      getCachedAssingedChapterLessonsStats
    }),
    [state, lessonsByChapter]
  );

  return (
    <LessonDetailsContext.Provider value={value}>
      {children}
    </LessonDetailsContext.Provider>
  );
};

export const LessonChapterDetails = () => useContext(LessonDetailsContext);
