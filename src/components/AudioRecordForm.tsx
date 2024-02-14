import {
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
// import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/customHooks";
import uploadFileToFirebase from "../utils/utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

const audioCollection = collection(firestore, "audios");

type AudioRecordFormProps = {
  onAddedAudio: () => void;
};

// const Toast = Swal.mixin({
//   toast: true,
//   position: "center",
//   timer: 3000,
//   timerProgressBar: true,
//   showConfirmButton: false,
// });

const AudioRecordForm = ({ onAddedAudio }: AudioRecordFormProps) => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const _currentUser = useCurrentUser();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    setCurrentUser(_currentUser);
    console.log({ CurrentUser: _currentUser });
  }, [_currentUser]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addAudioElement = async (blob: Blob) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      setLoading(true);
      let _audioUrl = await uploadFileToFirebase({
        blob,
        userId: currentUser.id as string,
        folderName: "Audio",
      });

      console.log({ audioUrl: _audioUrl });
      handleSaveRecording(_audioUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecording = async (url: string) => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      // Add logic to save the audio data and
      let audioObj = {
        title,
        url: url,
        rank: 0,
        status: "draft",
        userId: currentUser.id as string,
        createdAt: new Date(),
        recorder: {
          id: currentUser?.id,
          fullName: currentUser.fullName,
          profileImage: currentUser.profileImage,
        },
      };
      let snapShot = await addDoc(audioCollection, audioObj);
      if (snapShot.path) {
        onAddedAudio();
      }
      // Reset the form
      setTitle("");
      setAudioUrl("");
      // Stop the audio recorder
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        size="medium"
        variant="outlined"
        multiline
        value={title}
        onChange={handleTitleChange}
      />

      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
      />

      {audioUrl && (
        <Box sx={{ margin: 3 }}>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            margin: 4,
          }}
        >
          <CircularProgress size={25} />
          <Typography>Saving...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default AudioRecordForm;
