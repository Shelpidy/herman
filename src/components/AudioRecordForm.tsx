import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import {
  collection,
  doc,
  getFirestore,
  getDocs,
  setDoc,
  query,
  onSnapshot,
  where,
  limit,
  addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
import uploadFileToFirebase from "../utils/utils";
import { LoadingButton } from "@mui/lab";
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
const app = initializeApp(firebaseConfig);

interface AdminUserTableProps {
  users: User[];
}

const firestore = getFirestore();

// const userDoc = doc(firestore,"users")
const userCollection = collection(firestore, "users");
const audioCollection = collection(firestore, "audios");
let audioQuery = query(audioCollection);

type AudioRecordFormProps = {
  onAddedAudio: () => void;
};

let userId = "5cE02CfN6wWbtqksPGM5";

const AudioRecordForm = ({ onAddedAudio }: AudioRecordFormProps) => {
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addAudioElement = async (blob: Blob) => {
    try {
      let _audioUrl = await uploadFileToFirebase({
        blob,
        userId,
        folderName: "Audio",
      });
      setAudioData(blob);
      // const url = URL.createObjectURL(blob);
      console.log({ audioUrl: _audioUrl });
      handleSaveRecording(_audioUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveRecording = async (url: string) => {
    try {
      setLoading(true);
      // Add logic to save the audio data and
      let audioObj = {
        title,
        url: url,
        numberOfLikes: 0,
        userId,
        createdAt: new Date(),
        recorder: {
          id: userId,
          fullName: "Mohamed Shelpidy Kamara",
          profileImage: "https://picsum.photos/200/200",
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
