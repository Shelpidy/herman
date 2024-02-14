import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
// import {getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

import { initializeApp } from "firebase/app";
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

const AudiosList = ({ userId }: { userId: string }) => {
  const [audios, setAudios] = useState<Audio[] | null>(null);

  useEffect(() => {
    async function getAudios() {
      try {
        let audioQuery = query(audioCollection, where("userId", "==", userId));
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
  }, [userId]);

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
      <Typography fontFamily="Poppins-Medium" variant="h4">
        Audo Stories
      </Typography>
      <List style={{ width: "max-content" }}>
        {audios.map((audio, index) => (
          <ListItem sx={{ margin: 5 }} key={index}>
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
                {audio.rank} Likes
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
              <Box sx={{ marginLeft: 2 }}>
                <ReactAudioPlayer src={audio.url} controls />
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AudiosList;
