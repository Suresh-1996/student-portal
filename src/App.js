// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StudentAuthForm from "./components/student/StudentAuthForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import StudentDashboard from "./components/student/StudentDashboard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { user } = useSelector((state) => state.studentAuth);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/student-login" />} />
          <Route
            path="/Student-dashboard"
            element={
              user ? <StudentDashboard /> : <Navigate to="/student-login" />
            }
          />
          <Route
            path="/student-login"
            element={<StudentAuthForm isSignUp={false} />} //conditional rendering
          />
          <Route
            path="/student-signup"
            element={<StudentAuthForm isSignUp={true} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
