// src/components/student/StudentAuthForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { studentSignUp, studentSignIn } from "../../redux/studentAuthSlice";
import { Link, useNavigate } from "react-router-dom";

function StudentAuthForm({ isSignUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const action = isSignUp ? studentSignUp(formData) : studentSignIn(data);
    const resultAction = await dispatch(action); // transfer the action to redux for excution
    if (
      studentSignIn.fulfilled.match(resultAction) ||
      studentSignUp.fulfilled.match(resultAction)
    ) {
      navigate("/Student-dashboard"); // Redirect to the dashboard
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {isSignUp ? "Student Registration" : "Student Login"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {isSignUp && (
          <>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Avatar
                src={preview}
                alt="Profile Preview"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Button variant="contained" component="label">
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </Button>
            </Box>
          </>
        )}
        {!isSignUp && (
          <>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isSignUp ? "Register" : "Login"}
        </Button>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
        {isSignUp ? (
          <Link to="/student-login">Already have an account? Sign In</Link>
        ) : (
          <Link to="/student-signup">Don’t have an account? Sign Up</Link>
        )}
      </Typography>
    </Box>
  );
}

export default StudentAuthForm;
