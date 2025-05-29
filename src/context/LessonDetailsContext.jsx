import React, { createContext, useContext, useReducer, useState } from "react";
import { fetchAChapter } from "../service/apiService";


const LessonDetailsContext = createContext();

const initialState = {
  lesson: null,
  chaptersDetails: {},
  lessonsDetails: {},
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

const getLessonDetails = async (lessonId) => {
  // if (lessonsDetails[lessonId]) {
  //   return lessonsDetails[lessonId];
  // } else {
  //   const lessonData = {"lesson": "Testing lesson"}; //await fetchLesson(lessonId);
  //   setLessonsDetails(prev => ({ ...prev, [lessonId]: lessonData }));
  //   return lessonData;
  // }
};

const lessonDetailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LESSON":
      return {
        ...state,
        lesson: action.payload,
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

  return (
    <LessonDetailsContext.Provider
      value={{ state, dispatch, fetchAndSetLesson, getChapterDetails }}
    >
      {children}
    </LessonDetailsContext.Provider>
  );
};

export const LessonChapterDetails = () => useContext(LessonDetailsContext);
