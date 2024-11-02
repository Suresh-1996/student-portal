// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentAuthReducer from "./studentAuthSlice";
import studentCourseReducer from "./studentCoursesSlice";

const store = configureStore({
  reducer: {
    studentAuth: studentAuthReducer, // Add your reducers here
    // other reducers can be added here
    studentCourses: studentCourseReducer,
  },
});

export default store;
