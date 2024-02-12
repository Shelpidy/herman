"use client";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";

import { Favorite } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import Swal from "sweetalert2";
import ReactAudioPlayer from "react-audio-player";
import AudioBadge from "./StatusBadge";
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

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

interface AudioListItemDialogProps {
  audio: Audio2;
  open: boolean;
  onClose: () => void;
  onLikeChange: (likeCounts: number) => void;
}

const AudioListItemDialog: React.FC<AudioListItemDialogProps> = ({
  audio,
  open,
  onClose,
  onLikeChange,
}) => {
  const { id, title, author, status, numberOfLikes, createdAt } = audio;

  const [likesCount, setLikesCount] = useState<number | string>(numberOfLikes);

  const handleLikeClick = async () => {
    try {
      let audioDoc = doc(firestore, `audios/${id}`);
      let snap = await getDoc(audioDoc);
      let audioData: Audio = JSON.parse(JSON.stringify(snap.data()));
      console.log({ AudioData: audioData });
      let newLikesCount = Number(audioData.numberOfLikes) + 1;
      await updateDoc(audioDoc, { numberOfLikes: newLikesCount });
      setLikesCount(newLikesCount);
      onLikeChange(newLikesCount);
    } catch (err) {
      Toast.fire({
        text: "Couldn't like. Try again",
        icon: "warning",
      });
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ justifyContent: "center" }}>
        <Box>
          <img
            style={{ width: "100%", height: "80%" }}
            alt="Audio Image"
            src={"/record2.png"}
          />
        </Box>
        <Box>
          <Box
            sx={{
              marginLeft: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ReactAudioPlayer
              style={{ width: "100%" }}
              src={audio.url}
              controls
            />
            <Box className="flex flex-col items-center">
              <Typography variant="caption">Status</Typography>
              <AudioBadge status={status} />
            </Box>
          </Box>
          <Box className="mx-4">
            <h2 className="line-clamp-1 text-xl md:text-2xl font-semibold my-3">
              {title}
            </h2>
            <p>
              <strong>Author:</strong> {author.fullName}
            </p>
            <p>
              <strong>Address:</strong> {author.address}
            </p>
            <p>
              <strong>Region:</strong> {author.region}
            </p>
            <p>
              <strong>Phone Number:</strong> {author.phoneNumber}
            </p>
            <p>
              <strong>Gender:</strong> {author.gender}
            </p>
          </Box>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <IconButton onClick={handleLikeClick} aria-label="like">
              <Favorite />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {likesCount} Likes
            </Typography>
            <Typography
              sx={{ marginX: 2 }}
              variant="caption"
              color="textSecondary"
            >
              {moment(new Date(createdAt.seconds * 1000)).calendar()}
            </Typography>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AudioListItemDialog;
