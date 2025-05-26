import React, { createContext, useContext, useState } from 'react';

const LessonDetailsContext = createContext();

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

export const LessonProvider = ({ children }) => {
  const [lessonCache, setLessonCache] = useState({});

  const getLesson = async (lessonId, fetchFn) => {
    if (lessonCache[lessonId]) {
      return lessonCache[lessonId];
    } else {
      const lessonData = await fetchLesson(lessonId);
      setLessonCache(prev => ({ ...prev, [lessonId]: lessonData }));
      return lessonData;
    }
  };

  return (
    <LessonDetailsContext.Provider value={{ getLesson }}>
      {children}
    </LessonDetailsContext.Provider>
  );
};

export const useLesson = () => useContext(LessonDetailsContext);