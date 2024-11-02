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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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

export const { logout } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;
