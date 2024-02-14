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
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { getDocs, query, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { UserAudio } from "../components/UserAudioComponent";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your Firebase config
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const firestore = getFirestore();
const audioCollection = collection(firestore, "audios");
const audioQuery = query(audioCollection);

const StoryPage: React.FC = () => {
  const [audios, setAudios] = useState<Audio[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function getAudios() {
      try {
        let _audios: Audio[] = [];
        const audiosSnapshot = await getDocs(audioQuery);
        audiosSnapshot.forEach((snap) => {
          console.log(`${snap.id} ${JSON.stringify(snap.data())}`);
          const audio = {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAudios = audios
    ? audios.filter((audio) =>
        audio.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : null;

  if (!filteredAudios) {
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
      <Box
        sx={{
          marginY: "4vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontFamily="Poppins-Medium" variant="h5">
          Audio Stories
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setSearchTerm("")} edge="end">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredAudios.map((audio) => {
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
