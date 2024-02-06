import {
  Box,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { FileUploadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2";
import uploadFileToFirebase from "../../utils/utils";
import ReactAudioPlayer from "react-audio-player";
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
declare type Audio2 = {
  id: string;
  title: string;
  url: string;
  iframe: string;
  status: "draft" | "review" | "publish";
  author: {
    fullName: string;
    address: string;
    region: string;
    phoneNumber: string;
    gender: string;
  };
  numberOfLikes: number | string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

const AudioAdminUpload = () => {
  const [formData, setFormData] = useState({
    title: "Untitled",
    url: "",
    iframe: "",
    status: "draft",
    address: "",
    fullName: "",
    region: "",
    gender: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

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

  const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let audioFiles = e.target.files;
    if (audioFiles) {
      let audioUrl = URL.createObjectURL(audioFiles[0]);
      setFormData((prevData: any) => ({
        ...prevData,
        url: audioUrl,
      }));

      console.log({ Audio: audioUrl });
    }
  };

  async function handleFormSubmit(): Promise<void> {
    setLoading(true);
    try {
      let audioCollection = collection(firestore, "audios");
      let response = await fetch(formData.url);
      let blob = await response.blob();
      let audioUrl = await uploadFileToFirebase({
        blob,
        folderName: "Audio",
        userId: String(Date.now()),
      });

      let audioObj = {
        author: {
          fullName: formData.fullName,
          address: formData.address,
          region: formData.region,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
        },
        url: audioUrl,
        title: formData.title,
        iframe: formData.iframe,
        status: "draft",
        numberOfLikes: 0,
        createdAt: new Date(),
      };
      console.log({ audioObj });
      let snapShot = await addDoc(audioCollection, audioObj);
      if (snapShot.path) {
        Toast.fire({
          text: "Added audio successfully",
          icon: "success",
        });
      } else {
        Toast.fire({
          text: "Couldn't add audio.Try again.",
          icon: "warning",
        });
      }
    } catch (error) {
      Toast.fire({
        text: "Couldn't add audio.Try again.",
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  }

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                width: "100%",
              }}
              htmlFor="avatar-input"
            >
              <input
                id="avatar-input"
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleAudioFile}
              />

              <IconButton color="primary" component="span">
                <FileUploadOutlined />
              </IconButton>
              <Typography variant="caption">
                Click here to upload audio
              </Typography>
            </label>
            {formData.url && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 3,
                }}
              >
                <ReactAudioPlayer src={formData.url} controls />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
            <TextField
              size="small"
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              fullWidth
              size="small"
              label="Author Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ marginTop: 3 }}>
            <TextField
              required
              size="small"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e: any) => {
                handleInputChange(e);
              }}
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
          Add audio
        </LoadingButton>
      </Card>
    </Container>
  );
};

export default AudioAdminUpload;
