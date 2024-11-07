import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { yellow } from "@mui/material/colors";

function CourseCard({
  title,
  description,
  teacherName,
  teacherProfilePic,
  onAction,
  actionLabel,
}) {
  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "3px 3px 3px rgba(255, 255, 255, 0.5)",
        "&:hover": {
          backgroundColor: "rgb(61, 62, 66)",
        },
      }}
    >
      <CardContent>
        {/* Teacher's Profile Picture and Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={"http://localhost:8000/" + teacherProfilePic}
            alt={teacherName}
            sx={{ mr: 2 }}
          />
          <Typography variant="subtitle1" component="div">
            Teacher : {teacherName}
          </Typography>
        </Box>

        {/* Course Title and Description */}
        <Typography variant="h6" component="div" sx={{ color: yellow[200] }}>
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
          sx={{
            mt: 2,
            backgroundColor:
              actionLabel === "Unenroll" ? "primary.darked" : "primary",
            "&:hover": {
              backgroundColor:
                actionLabel === "Unenroll" ? "red" : "primary.dark",
            },
          }}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
