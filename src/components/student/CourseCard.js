// src/components/CourseCard.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";

function CourseCard({
  title,
  description,
  teacherName,
  teacherProfilePic,
  onAction,
  actionLabel,
}) {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
      <CardContent>
        {/* Teacher's Profile Picture and Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={"http://localhost:8000/" + teacherProfilePic}
            alt={teacherName}
            sx={{ mr: 2 }}
          />
          <Typography variant="subtitle1" component="div">
            {teacherName}
          </Typography>
        </Box>

        {/* Course Title and Description */}
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {/* Action Button (Enroll/Unenroll) */}
        <Button
          variant="contained"
          color="primary"
          onClick={onAction}
          sx={{ mt: 2 }}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
