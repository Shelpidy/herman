import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
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
} from "firebase/firestore";
import Swal from "sweetalert2";

import { initializeApp } from "firebase/app";
import { Favorite } from "@mui/icons-material";
import { UserAudio } from "../components/UserAudioComponent";
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

const audioCollection = collection(firestore, "audios");
let audioQuery = query(audioCollection);

const StoryPage: React.FC = () => {
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
        console.error(err);
      }
    }
    getAudios();
  }, []);

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
    <Container maxWidth="lg" style={{ marginTop: "13vh", marginBottom: "5vh" }}>
      <Grid container spacing={2}>
        {audios.map((audio) => {
          if (audio.recorder) {
            return (
              <Grid item key={audio.id} xs={12} sm={6} md={4} lg={3}>
                <UserAudio
                  id={audio.id}
                  title={audio.title}
                  url={audio.url}
                  recorder={audio.recorder}
                  numberOfLikes={audio.numberOfLikes}
                  createdAt={audio.createdAt}
                  userId={audio.userId}
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </Container>
  );
};

export default StoryPage;
