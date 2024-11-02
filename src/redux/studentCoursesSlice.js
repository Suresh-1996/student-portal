// src/redux/slices/studentCoursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

export const fetchAllCourses = createAsyncThunk(
  "studentCourses/fetchAllCourses",
  async () => {
    const response = await axios.get("/api/courses");
    return response.data;
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  "studentCourses/fetchEnrolledCourses",
  async () => {
    const response = await axios.get("/api/courses/enrolled");
    return response.data;
  }
);

export const enrollCourse = createAsyncThunk(
  "studentCourses/enrollCourse",
  async (courseId) => {
    const response = await axios.post(`/api/courses/enroll/${courseId}`);
    return response.data;
  }
);

export const unenrollCourse = createAsyncThunk(
  "studentCourses/unenrollCourse",
  async (courseId) => {
    const response = await axios.delete(`/api/courses/unenroll/${courseId}`);
    return response.data;
  }
);

const studentCoursesSlice = createSlice({
  name: "studentCourses",
  initialState: {
    allCourses: [],
    enrolledCourses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.allCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload);
      })
      .addCase(unenrollCourse.fulfilled, (state, action) => {
        state.enrolledCourses = state.enrolledCourses.filter(
          (course) => course._id !== action.meta.arg
        );
      });
  },
});

export default studentCoursesSlice.reducer;
