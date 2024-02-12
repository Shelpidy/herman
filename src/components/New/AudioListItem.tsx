import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import AudioListItemDialog from "./AudioItemDialog";
import AudioBadge from "./StatusBadge";
import { OpenInFull } from "@mui/icons-material";
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

interface AudioListItemProps {
  audio: Audio2;
  refetch:()=>void;
}

const AudioListItem: React.FC<AudioListItemProps> = ({ audio,refetch }) => {
  const [status, setStatus] = React.useState<
    "draft" | "write" | "translate" | "read" | "publish" | "manage"
  >(audio.status);
  const [likesCount, setLikesCount] = React.useState<number>(
    audio.numberOfLikes as number,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStatusChange, setLoadingStatusChange] =
    useState<boolean>(false);

  const handleStatusChange = async (event: SelectChangeEvent<any>) => {
    let s = event.target.value;
    try {
      console.log({ SelectedStatus: s });
      setLoadingStatusChange(true);
      let audioDoc = doc(firestore, `audios/${audio.id}`);
      let snap = await getDoc(audioDoc);
      let audioData: Audio = JSON.parse(JSON.stringify(snap.data()));
      console.log({ AudioData: audioData });
      await updateDoc(audioDoc, { status: s })

      setStatus(s);
      refetch()
    } catch (err) {
      console.log(err);
      Toast.fire({
        text: "Couldn't update status. Try again",
        icon: "warning",
      });
    } finally {
      setLoadingStatusChange(false);
    }
  };
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      let audioDoc = doc(firestore, `audios/${audio.id}`);
      let snap = await getDoc(audioDoc);
      let audioData: Audio = JSON.parse(JSON.stringify(snap.data()));
      console.log({ AudioData: audioData });
      await deleteDoc(audioDoc);
      setDeleted(true);
      refetch()
    } catch (err) {
      console.log(err);
      Toast.fire({
        text: "Couldn't delete. Try again",
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  };
  if (deleted) {
    return null;
  }
  return (
    <ListItem
      sx={{ marginTop: 2, justifyContent: "space-evenly" }}
      key={audio.id}
    >
      <Box sx={{ marginX: 2 }}>
        <Avatar sx={{ width: 50, height: 50 }} src={"/record2.png"}></Avatar>
      </Box>

      <ListItemText
        primary={audio.title}
        style={{ width: "fit-content" }}
        primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
        secondary={
          audio.author ? `Author: ${audio.author.fullName || ""}` : "No Author"
        }
      />
      <AudioListItemDialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        audio={{ ...audio, status: status }}
        onLikeChange={(count) => setLikesCount(count)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "fit-content",
        }}
      >
        <Typography variant="subtitle1" color="textSecondary">
          {likesCount} Likes
        </Typography>
        <Typography sx={{ marginX: 2 }} variant="caption" color="textSecondary">
          {moment(new Date(audio.createdAt.seconds * 1000)).calendar()}
        </Typography>
      </Box>

      <Box sx={{ marginLeft: 2 }}>
        <ReactAudioPlayer src={audio.url} controls />
      </Box>
      <Box sx={{ marginLeft: 2, display: "flex", alignItems: "center" }}>
        {loadingStatusChange && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <CircularProgress size={15} />
          </div>
        )}
        {!loadingStatusChange && (
          <Select
            disabled={loadingStatusChange}
            value={status}
            size="small"
            onChange={handleStatusChange}
            sx={{ marginRight: 1 }}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="write">Write</MenuItem>
            <MenuItem value="translate">Translate</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="publish">Publish</MenuItem>
            <MenuItem value="manage">Manage</MenuItem>
          </Select>
        )}
        <AudioBadge status={status} />
      </Box>

      <LoadingButton
        loading={loading}
        disabled={loading || loadingStatusChange}
        onClick={handleDelete}
        sx={{ marginLeft: 2 }}
      >
        <DeleteIcon />
      </LoadingButton>
      <IconButton onClick={() => setOpenDialog(true)}>
        <OpenInFull />
      </IconButton>
    </ListItem>
  );
};

export default AudioListItem;
