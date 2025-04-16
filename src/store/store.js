import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./basicSlice"; // update path if needed

const store = configureStore({
  reducer: {
    basics: basicReducer,
  },
});

export default store;
