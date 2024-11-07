// src/components/StudentDashboard.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import {
  fetchAllCourses,
  fetchEnrolledCourses,
  enrollCourse,
  unenrollCourse,
} from "../../redux/studentCoursesSlice";
import CourseCard from "./CourseCard";
import { logout } from "../../redux/studentAuthSlice";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCourses, enrolledCourses } = useSelector(
    (state) => state.studentCourses
  );
  const student = useSelector((state) => state.studentAuth.user);
  console.log("student", student);
  // Fetch all courses and enrolled courses when component mounts
  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchEnrolledCourses());
  }, [dispatch, tabIndex]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleEnroll = async (courseId) => {
    await dispatch(enrollCourse(courseId));
    dispatch(fetchAllCourses());
  };

  const handleUnenroll = (courseId) => {
    dispatch(unenrollCourse(courseId));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Profile and Logout */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={"http://localhost:8000/" + student?.profilePicture}
            alt={student?.name}
            sx={{ mr: 2 }}
          />
          <Typography variant="h6">{student?.name}</Typography>
        </Box>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Tabs for All Courses and Enrolled Courses */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="All Courses" />
        <Tab label="Enrolled Courses" />
      </Tabs>

      {/* Course List Based on Selected Tab */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {tabIndex === 0 &&
          allCourses &&
          allCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <CourseCard
                title={course.courseName}
                description={course.description}
                teacherName={course.teacherId?.name}
                teacherProfilePic={course.teacherId?.profilePicture} // Assuming profilePicture URL is stored in teacher data
                onAction={() => handleEnroll(course._id)}
                actionLabel="Enroll"
              />
            </Grid>
          ))}
        {tabIndex === 1 &&
          enrolledCourses &&
          enrolledCourses.map(
            (course) =>
              course && (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <CourseCard
                    title={course.courseName}
                    description={course.description}
                    teacherName={course.teacherId?.name}
                    teacherProfilePic={course.teacherId?.profilePicture}
                    onAction={() => handleUnenroll(course._id)}
                    actionLabel="Unenroll"
                  />
                </Grid>
              )
          )}
      </Grid>
    </Box>
  );
}

export default StudentDashboard;
