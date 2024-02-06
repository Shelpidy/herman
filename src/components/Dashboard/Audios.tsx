import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import {getFirestore } from "firebase/firestore";
import { Add, Close, Search } from "@mui/icons-material";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Swal from "sweetalert2";
import AudioRecordForm from "../AudioRecordForm";

import { initializeApp } from "firebase/app";
import moment from "moment";
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

// interface AdminUserTableProps {
//   users: User[];
// }

const firestore = getFirestore();

// const userDoc = doc(firestore,"users")
// const userCollection = collection(firestore, "users");
const audioCollection = collection(firestore, "audios");
let audioQuery = query(audioCollection);

let Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  showConfirmButton: false,
});

const Audios = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openRecordDialog, setOpenRecordDialog] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>("");
  const [audios, setAudios] = useState<Audio[] | null>(null);

  useEffect(() => {
    async function getAudios() {
      try {
        let _audios: Audio[] = [];
        let audiosSnapshot = await getDocs(audioQuery);
        audiosSnapshot.forEach((snap) => {
          console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
          let audio = {
            id: snap.id,
            ...JSON.parse(JSON.stringify(snap.data())),
          };
          _audios.push(audio);
        });
        setAudios(_audios);
      } catch (err) {
        console.log(err);
      }
    }
    getAudios();
  }, []);

  // const handleAudioClick = (url: string) => {
  //   setCurrentAudio(url);
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAudio("");
  };

  const onAddedAudio = () => {
    setOpenRecordDialog(false);
    Toast.fire({
      text: "Audio Added",
      icon: "success",
    });
    onSnapshot(audioQuery, (snap) => {
      let _audios: Audio[] = [];
      snap.forEach((snap) => {
        console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
        let audio = { id: snap.id, ...JSON.parse(JSON.stringify(snap.data())) };
        _audios.push(audio);
      });
      setAudios(_audios);
    });
  };

  const handleCloseRecordDialog = () => {
    setOpenRecordDialog(false);
  };

  const handleDeleteClick = async (audioId: string) => {
    try {
      console.log(audioId);
    } catch (error) {
      console.error("Error deleting audio:", error);
    }
  };

  if (!audios) {
    return (
      <Box
        sx={{
          height: "95vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CircularProgress color="primary" size={30} />
        <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          width: "80%",
          paddingTop: "10px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenRecordDialog(true)}
        >
          New Audio
        </Button>
      </Box>

      <List>
        {audios.map((audio, index) => (
          <ListItem key={index} sx={{ gap: 3 }}>
            <ListItemText
              primary={audio.title}
              primaryTypographyProps={{ fontFamily: "Poppins-Medium" }}
              secondary={
                audio.recorder
                  ? `Recorded by ${audio.recorder.fullName || ""}`
                  : "No Recorder"
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="textSecondary">
                {audio.numberOfLikes} Likes
              </Typography>
              <Typography
                sx={{ marginX: 2 }}
                variant="caption"
                color="textSecondary"
              >
                {moment(new Date(audio.createdAt.seconds * 1000)).fromNow()}
              </Typography>
            </Box>

            {audio.url && (
              <Box sx={{ marginRight: 10 }}>
                <ReactAudioPlayer src={audio.url} controls />
              </Box>
            )}
            <Button
              disableElevation
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => handleDeleteClick(audio.id)}
            >
              more
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        style={{ padding: "5px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleCloseDialog}>
            <Close color="primary" />
          </IconButton>
        </Box>
        <DialogTitle textAlign="center">Audio Player</DialogTitle>
        {currentAudio && (
          <DialogContent
            style={{
              minWidth: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactAudioPlayer src={currentAudio} controls />
          </DialogContent>
        )}
      </Dialog>

      <Dialog
        open={openRecordDialog}
        onClose={handleCloseRecordDialog}
        style={{ padding: "5px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleCloseRecordDialog}>
            <Close color="primary" />
          </IconButton>
        </Box>
        <DialogTitle textAlign="center">Story Audio Recording</DialogTitle>

        <DialogContent
          style={{
            minWidth: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AudioRecordForm onAddedAudio={onAddedAudio} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default Audios;
