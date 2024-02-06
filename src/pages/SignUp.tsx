import {
  Box,
  Card,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { AddAPhotoOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import uploadFileToFirebase from "../utils/utils";
const firebaseConfig = {
  apiKey: "AIzaSyA9EOaEqf4vO1VUDoxSDAZDjnIkadFUCVE",
  authDomain: "herman-98ed4.firebaseapp.com",
  projectId: "herman-98ed4",
  storageBucket: "herman-98ed4.appspot.com",
  messagingSenderId: "290673052798",
  appId: "1:290673052798:web:ab0598cc200626b3d91c2f",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    firstName: "",
    lastName: "",
    middleName: "",
    region: "",
    profileImage: "",
    gender: "",
    contactNumber: "",
  });

  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [validatePhoneNum, setValidPhoneNum] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailVerification, setEmailVerification] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  // const theme = useTheme();
  const navigate = useNavigate();

  // const { ...dataWithoutRole } = formData;
  // const isSubmitButtonDisabled = Object.values(dataWithoutRole).some(
  //   (value) => value === "" || value === null,
  // );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imageFiles = e.target.files;
    if (imageFiles) {
      let urlImage = URL.createObjectURL(imageFiles[0]);
      setFormData((prevData: any) => ({
        ...prevData,
        profileImage: urlImage,
      }));
      setImage(urlImage);

      console.log({ ProfileImage: urlImage });
    }
  };

  async function handleFormSubmit(): Promise<void> {
    setLoading(true);
    try {
      let userCollection = collection(firestore, "users");
      let response = await fetch(formData.profileImage);
      let blob = await response.blob();
      let profileImage = await uploadFileToFirebase({
        blob,
        folderName: "ProfileImage",
        userId: formData.email,
      });
      const { confirmPassword, ...userData } = formData;
      let userObj = {
        ...userData,
        profileImage: profileImage,
        dateOfBirth: new Date(formData.dateOfBirth),
        role: "user",
      };
      console.log({ userObj });
      let snapShot = await addDoc(userCollection, userObj);
      if (snapShot.path) {
        Toast.fire({
          text: "Signup Successfully",
          icon: "success",
        });
        navigate("/signin");
      } else {
        Toast.fire({
          text: "Signup Failed. Try again",
          icon: "warning",
        });
      }
      setLoading(false);
    } catch (error) {
      Toast.fire({
        text: "Signup Failed.Check your connection and try again",
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  }

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let emailVerification = emailPattern.test(email);
    if (!emailVerification) {
      setEmailVerification("Invalid email address");
    } else {
      setEmailVerification("");
    }
  };

  const validatePassword = (password: string) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength) {
      return "Password should be at least 8 characters long.";
    }

    if (!hasLetters || !hasNumbers) {
      return "Password should contain letters and numbers.";
    }

    return "";
  };

  const validatePhoneNumber = (number: string) => {
    const phoneNumberPattern = /^\+?\d+$/;

    const cleanNumber = number.replace(/\D/g, "");

    let validPhoneNum = phoneNumberPattern.test(cleanNumber);
    if (!validPhoneNum) {
      setValidPhoneNum("Invalid phone number");
    } else {
      setValidPhoneNum("");
    }
  };

  const confirmPasswordChecker = (password: string) => {
    if (password !== formData.password) {
      setConfirmPassword("Password do no match");
    } else {
      setConfirmPassword("");
    }
  };

  const checkPasswordStrength = (password: string) => {
    const validationMsg = validatePassword(password);
    setPasswordStrength(validationMsg);
  };

  return (
    <Container
      sx={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "14vh",
        flexDirection: "row",
        marginBottom: "5vh",
      }}
    >
      <Card sx={{ padding: "25px", maxWidth: "800px", marginBottom: "15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          // mb="10px"
        >
          <Typography m="15px" variant="h6" fontFamily="Poppins-Light">
            Signup
          </Typography>
        </Box>
        <Card
          className="hide-scrollbar"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          <Box>
            {image && (
              <Box
                key={image}
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  marginTop: "5px",
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={image}
                  alt="Profile Image"
                />
              </Box>
            )}
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
                width: "100%",
              }}
              htmlFor="avatar-input"
            >
              <input
                id="avatar-input"
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfileImage}
              />

              <IconButton color="primary" component="span">
                <AddAPhotoOutlined />
              </IconButton>
              <Typography variant="caption">
                Click here to upload profile image
              </Typography>
            </label>
          </Box>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              fullWidth
              size="small"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              size="small"
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e: any) => {
                handleInputChange(e);
                validateEmail(e.target.value);
              }}
            />
            <Box
              sx={{ marginTop: 1 }}
              color={
                emailVerification ? (emailVerification ? "red" : "green") : ""
              }
            >
              {emailVerification ? (
                <ul>
                  <li>{emailVerification}</li>
                </ul>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
            <TextField
              size="small"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e: any) => {
                handleInputChange(e);
                checkPasswordStrength(e.target.value);
              }}
            />
            <Box
              sx={{ marginTop: 1 }}
              color={
                passwordStrength ? (passwordStrength ? "red" : "green") : ""
              }
            >
              {passwordStrength ? (
                <ul>
                  <li>{passwordStrength}</li>
                </ul>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e: any) => {
                handleInputChange(e);
                confirmPasswordChecker(e.target.value);
              }}
            />
            <Box
              sx={{ marginTop: 1 }}
              color={confirmPassword ? (confirmPassword ? "red" : "green") : ""}
            >
              {confirmPassword ? (
                <ul>
                  <li>{confirmPassword}</li>
                </ul>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Phone Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e: any) => {
                handleInputChange(e);
                validatePhoneNumber(e.target.value);
              }}
            />
            <Box
              sx={{ marginTop: 1 }}
              color={
                validatePhoneNum ? (validatePhoneNum ? "red" : "green") : ""
              }
            >
              {validatePhoneNum ? (
                <ul>
                  <li>{validatePhoneNum}</li>
                </ul>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
            <TextField
              required
              fullWidth
              size="small"
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="region-select-label">Select Region</InputLabel>
              <Select
                size="small"
                labelId="region-select-label"
                id="region-select"
                value={formData.region}
                label="Select Region"
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, region: e.target.value }));
                }}
              >
                <MenuItem value="Eastern Region">Eastern Region</MenuItem>
                <MenuItem value="Northern Region">Northern Region</MenuItem>
                <MenuItem value="Southern Region">Southern Region</MenuItem>
                <MenuItem value="Western Area">Western Area</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
            <Typography variant="body1" component="div">
              Gender
            </Typography>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              sx={{ flexDirection: "row" }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <LoadingButton
          sx={{ marginY: 2 }}
          color="primary"
          variant="contained"
          loading={loading}
          size="small"
          disabled={loading}
          onClick={handleFormSubmit}
        >
          Sign Up
        </LoadingButton>

        <Box className="my-5">
          <Typography className="text-center">
            Already have an account ?{" "}
            <Link href="/signin" className="mx-2">
              Signin
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default SignUpPage;
