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
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { doc, getFirestore, updateDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
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
  onRank: (rank: number | string) => void;
}

const AudioListItemDialog: React.FC<AudioListItemDialogProps> = ({
  audio,
  open,
  onClose,
  onRank,
}) => {
  const {
    id,
    audioId,
    publishedAt,
    title,
    author,
    language,
    translateLanguage,
    status,
    rank: _rank,
    createdAt,
  } = audio;

  const [rank, setRank] = useState<number | string>(_rank);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRank = async (event: SelectChangeEvent<any>) => {
    let newRank = event.target.value;
    try {
      setLoading(true);
      let audioDoc = doc(firestore, `audios/${id}`);
      await updateDoc(audioDoc, { rank: newRank });
      setRank(newRank);
      onRank(newRank);
      Toast.fire({
        text: `Story ranked to ${newRank}`,
        icon: "success",
      });
    } catch (err) {
      Toast.fire({
        text: "Couldn't like. Try again",
        icon: "warning",
      });
      console.log(err);
    } finally {
      setLoading(false);
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
              <Typography variant="caption">{audio.type}</Typography>
              <AudioBadge status={status} />
            </Box>
          </Box>
          <Box className="mx-4">
            <h2 className="line-clamp-1 text-xl md:text-2xl font-semibold my-3">
              {title}
            </h2>
            <p>
              <strong>Story ID:</strong> {audioId}
            </p>
            {
              language &&
              <p>
              <strong>Recorded Language:</strong> {language}
            </p>
            }
         
            {translateLanguage && (
              <p>
                <strong>Translated Language:</strong> {translateLanguage}
              </p>
            )}
            <p>
              <strong>Date In:</strong>{" "}
              {moment(new Date(createdAt.seconds * 1000)).calendar()}
            </p>
            {status === "manage" && publishedAt && (
              <p>
                <strong>Date Out:</strong>{" "}
                {moment(new Date(publishedAt?.seconds * 1000)).calendar()}
              </p>
            )}
            <p>
              <strong>Story Teller Name:</strong> {author.fullName}
            </p>
            <p>
              <strong>Story Teller ID:</strong> {author.authorId}
            </p>
            <p>
              <strong>Country:</strong> {author.country}
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
            <Select
              disabled={loading}
              value={status}
              size="small"
              onChange={handleRank}
              sx={{ marginRight: 1 }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
            <Typography variant="body2" color="textSecondary">
              Rank {rank}
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
