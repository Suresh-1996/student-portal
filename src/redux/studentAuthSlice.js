// src/redux/slices/studentAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axiosConfig";

// Async actions for student registration and login
export const studentSignUp = createAsyncThunk(
  "studentAuth/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/students/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        return rejectWithValue("Student already exists with this email.");
      }
      if (error.response.status === 500) {
        return rejectWithValue("Sever error");
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

export const studentSignIn = createAsyncThunk(
  "studentAuth/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/students/signin", credentials);
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        return rejectWithValue("Student not found");
      }
      if (error.response.status === 401) {
        return rejectWithValue("Invalid Password");
      }
      if (error.response.status === 500) {
        return rejectWithValue("Sever error");
      }
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

const studentAuthSlice = createSlice({
  name: "studentAuth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentSignUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(studentSignIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(studentSignUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(studentSignIn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(studentSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(studentSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;
