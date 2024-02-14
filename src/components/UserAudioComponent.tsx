import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useNavigate } from "react-router-dom";

import { Favorite, LinkRounded } from "@mui/icons-material";
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
let audioQuery = query(audioCollection);

const AudioSection: React.FC = () => {
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
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
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
                  rank={audio.rank}
                  createdAt={audio.createdAt}
                  userId={audio.userId}
                  status="draft"
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginY: "10px",
        }}
      >
        <Link href="/stories">more...</Link>
      </Box>
    </Container>
  );
};

export default AudioSection;

export const UserAudio: React.FC<Audio> = ({
  id,
  title,
  url,
  recorder,
  rank,
  createdAt,
}) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState<number | string>(rank);

  const handleLikeClick = async () => {
    try {
      let audioDoc = doc(firestore, `audios/${id}`);
      let snap = await getDoc(audioDoc);
      let audioData: Audio = JSON.parse(JSON.stringify(snap.data()));
      console.log({ AudioData: audioData });
      let newLikesCount = Number(audioData.rank) + 1;
      await updateDoc(audioDoc, { rank: newLikesCount });
      setLikesCount(newLikesCount);
    } catch (err) {
      console.log(err);
    }
    // Add logic for liking the audio (incrementing the number of likes, sending to the server, etc.)
    console.log(`Liked audio with ID: ${id}`);
  };

  const handleCardClick = () => {
    // Navigate to the full detail page with user id as route params
    navigate(`/user/${recorder.id}`);
  };

  return (
    <Card style={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="100"
        image={recorder.profileImage}
        alt={recorder.fullName}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "between",
            gap: 1,
          }}
        >
          <Box>
            <Typography
              fontFamily="Poppins-Medium"
              variant="body1"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle2">{recorder.fullName}</Typography>
          </Box>
          <IconButton onClick={handleCardClick}>
            <LinkRounded />
          </IconButton>
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
            {moment(new Date(createdAt.seconds * 1000)).fromNow()}
          </Typography>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <ReactAudioPlayer src={url} controls />
        </div>
      </CardContent>
    </Card>
  );
};
