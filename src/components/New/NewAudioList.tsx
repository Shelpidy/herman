import {
  Box,
  CircularProgress,
  List,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AudioListItem from "./AudioListItem"; // Assuming the file is in the same directory

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

const AudioList = () => {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "review" | "publish"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [audios, setAudios] = useState<Audio2[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 5;

  useEffect(() => {
    async function getAudios() {
      try {
        setLoading(true)
        let _audios: Audio2[] = [];
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
      }finally{
        setLoading(false)
      }
    }
    getAudios();
  }, []);

  const filteredList = audios?.filter((audio) => {
    return (
      (statusFilter === "all" || audio.status === statusFilter) &&
      (audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audio.author.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const pageCount = Math.ceil(filteredList.length / itemsPerPage);

  const handleStatusFilterChange = (event: SelectChangeEvent<any>) => {
    setStatusFilter(
      event.target.value as "all" | "draft" | "review" | "publish",
    );
    setPage(1); // Reset page when changing status filter
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset page when changing search query
  };

  const handleChangePage = (event: React.ChangeEvent<any>) => {
    setPage(event.target.value);
  };

  
  if (loading) {
    return (
      <Box
        sx={{
          height: "50vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CircularProgress color="primary" size={25} />
        <Typography variant="caption" sx={{color: "primary.main" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          marginRight: 3,
        }}
      >
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography>Filter by</Typography>
          <Select
            placeholder="Filter by"
            size="small"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="review">Review</MenuItem>
            <MenuItem value="publish">Publish</MenuItem>
          </Select>
        </Box>
      </Box>

      <List>
        {filteredList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((audio, _) => (
            <AudioListItem key={audio.id} audio={audio} />
          ))}
      </List>

      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: 2 }}
      />
    </div>
  );
};

export default AudioList;
